"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  CircularProgress,
} from "@nextui-org/react";
import ReactCountryFlag from "react-country-flag";
import { usePathname } from "next/navigation";
import { getProfilePicture, isCustomer, isManager } from "@/app/lib/user";
import { verifyToken } from "@/app/lib/dal";
import Customers from "@/app/back/models/customers";
import Employees from "@/app/back/models/employees";

const customerPages = [
  { url: "home", name: "Dashboard" },
  { url: "chat", name: "Chat" },
  { url: "advices", name: "Advices" },
  { url: "notes", name: "Notes" },
  { url: "encounters", name: "Encounters" },
];
const employeePages = [
  { url: "home", name: "Dashboard" },
  { url: "coaches", name: "Coaches" },
  { url: "customers", name: "Customers" },
  { url: "statistics", name: "Statistics" },
  { url: "tips", name: "Tips" },
  { url: "events", name: "Events" },
  { url: "astro-compatibility", name: "Astrology" },
  { url: "clothing", name: "Clothing" },
  { url: "advices", name: "Advices" },
  { url: "notes", name: "Notes" },
  { url: "coaches-list", name: "Coaches List" },
];
const employeeReservedPages = ["statistics", "coaches"];

type UserInfos = {
  name: string;
  email: string;
  role: string;
};

const BarItems = (
  handleLogout: () => Promise<void>,
  pages: { url: string; name: string }[],
  reservedPages: string[]
) => {
  const [hasRights, setHasRights] = useState(false);
  const [userInfos, setUserInfos] = useState<UserInfos | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    isManager().then((val) => setHasRights(val));
    verifyToken().then((payload) => {
      if (payload) {
        const infos =
          payload.role === "customer"
            ? (payload.infos as Customers)
            : (payload.infos as Employees);
        setUserInfos({
          name: infos.name + " " + infos.surname,
          email: infos.email,
          role: payload.role as string,
        });
      }
    });
    getProfilePicture().then((res) => {
      if (res) {
        setImageUrl(res.image);
      }
    });
  }, []);

  return (
    <div className="w-full h-24 bg-white px-4 flex flex-row gap-6 items-center justify-between border-b border-color outfit-font">
      <h1 className="bg-transparent">Soul Connection</h1>
      <ul className="flex flex-row gap-x-6 items-center m-auto overflow-x-scroll h-20">
        {pages.map((page) => {
          if (
            (reservedPages.includes(page.url) && hasRights) ||
            !reservedPages.includes(page.url)
          ) {
            return (
              <li
                key={page.url}
                aria-label={page.name}
                className={
                  ('/' + userInfos?.role + '/' + page.url) === pathname
                    ? "border-b-2 border-[#005bc1] text-[#005bc1]"
                    : ""
                }
              >
                <Link href={`/${userInfos?.role}/${page.url}`}>
                  <p className='text-center'>{page.name}</p>
                </Link>
              </li>
            );
          }
        })}
      </ul>
      <div className="flex justify-end cursor-pointer space-x-3 items-center">
        <Link href={`/${userInfos?.role}/chat`}>
          <FontAwesomeIcon
            icon={faMessage}
            style={{ color: "#5c8db2" }}
            size="2x"
          />
        </Link>
        <ReactCountryFlag
          countryCode="US"
          style={{
            fontSize: "1.9em",
            lineHeight: "0.8em",
            borderRadius: "9999px",
          }}
          aria-label="English United States"
        />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              showFallback
              src={imageUrl}
              fallback={<CircularProgress aria-label="Loading..." />}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as {userInfos?.name}</p>
              <p className="font-semibold">({userInfos?.email})</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default function NavBar() {
  const pathname = usePathname();
  const [isDBPopupOpen, setIsDBPopupOpen] = useState(false);
  const [isCustomerType, setCustomerType] = useState(false);

  const openDBPopup = () => {
    setIsDBPopupOpen(true);
  };

  const closeDBPopup = () => {
    setIsDBPopupOpen(false);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/employees/logout", { method: "POST" });
      if (res.status === 307) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const checkUserType = async () => {
      const userType = await isCustomer();
      setCustomerType(userType);
    };
    checkUserType();
  }, []);

  if (pathname === "/login") {
    return null;
  }

  return (
    <div className="fixed top-0 z-50 w-full h-24 bg-white text-black flex items-center justify-between px-6 border-b border-color">
      {BarItems(
        handleLogout,
        isCustomerType ? customerPages : employeePages,
        isCustomerType ? [] : employeeReservedPages
      )}
    </div>
  );
}
