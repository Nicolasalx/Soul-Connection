"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import If from "./If";
import { isCustomer, isManager } from "@/app/lib/user";

const SideBarCustomer = (
  handleLogout: () => Promise<void>,
  openDBPopup: () => void
) => {
  const [hasRights, setHasRights] = useState(false);

  useEffect(() => {
    isManager().then((val) => setHasRights(val));
  }, []);

  return (
    <div className="w-full h-24 bg-white px-4 flex items-center border-b border-color">
      <ul className="flex flex-grow gap-x-6 text-black text-l items-center justify-center">
        <li>
          <Link href="/customer/home">
            <p>Dashboard</p>
          </Link>
        </li>
        <li>
          <Link href="/customer/chat">
            <p>Chat</p>
          </Link>
        </li>
        <li>
          <Link href="/customer/advices">
            <p>Advices</p>
          </Link>
        </li>
        <li>
          <Link href="/customer/notes">
            <p>Notes</p>
          </Link>
        </li>
        <li>
          <Link href="/customer/encounters">
            <p>Encounters</p>
          </Link>
        </li>
      </ul>
      <div className="flex gap-4">
        <Button className="font-bold" color="primary" onClick={handleLogout}>
          Log Out
        </Button>
        <If condition={hasRights}>
          <Button className="font-bold" color="primary" onClick={openDBPopup}>
            DataBase
          </Button>
        </If>
      </div>
    </div>
  );
};

const SideBarEmployee = (
  handleLogout: () => Promise<void>,
  openDBPopup: () => void
) => {
  const [hasRights, setHasRights] = useState(false);

  useEffect(() => {
    isManager().then((val) => setHasRights(val));
  }, []);

  return (
    <div className="w-full h-24 bg-white px-4 flex items-center border-b border-color">
      <ul className="flex flex-grow gap-x-6 text-black text-l items-center justify-center">
        <li>
          <Link href="/employee/home">
            <p>Dashboard</p>
          </Link>
        </li>
        <If condition={hasRights}>
          <li>
            <Link href="/employee/coaches">
              <p>Coaches</p>
            </Link>
          </li>
        </If>
        <li>
          <Link href="/employee/customers">
            <p>Customers</p>
          </Link>
        </li>
        <li>
          <Link href="/employee/customers-list">
            <p>Customers List</p>
          </Link>
        </li>
        <If condition={hasRights}>
          <li>
            <Link href="/employee/statistics">
              <p>Statistics</p>
            </Link>
          </li>
        </If>
        <li>
          <Link href="/employee/tips">
            <p>Tips</p>
          </Link>
        </li>
        <li>
          <Link href="/employee/events">
            <p>Events</p>
          </Link>
        </li>
        <li>
          <Link href="/employee/astro-compatibility">
            <p>Astrology</p>
          </Link>
        </li>
        <li>
          <Link href="/employee/clothing">
            <p>Clothing</p>
          </Link>
        </li>
        <li>
          <Link href="/employee/chat">
            <p>Chat</p>
          </Link>
        </li>
        <li>
          <Link href="/employee/advices">
            <p>Advices</p>
          </Link>
        </li>
        <li>
          <Link href="/employee/notes">
            <p>Notes</p>
          </Link>
        </li>
      </ul>
      <div className="flex gap-4">
        <Button className="font-bold" color="primary" onClick={handleLogout}>
          Log Out
        </Button>
        <If condition={hasRights}>
          <Button className="font-bold" color="primary" onClick={openDBPopup}>
            DataBase
          </Button>
        </If>
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
    <div>
      <div className="fixed w-full h-24 bg-white text-black flex items-center justify-between px-6 border-b border-color">
        {isCustomerType ? (
          <>{SideBarCustomer(handleLogout, openDBPopup)}</>
        ) : (
          <>{SideBarEmployee(handleLogout, openDBPopup)}</>
        )}
      </div>
    </div>
  );
}
