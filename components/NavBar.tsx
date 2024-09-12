'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faMessage } from '@fortawesome/free-solid-svg-icons'
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";
import ReactCountryFlag from "react-country-flag"
import { usePathname } from 'next/navigation';
import If from "./If";
import { isCustomer, isManager } from "@/app/lib/user";

const SideBarCustomer = (handleLogout: () => Promise<void>, openDBPopup: () => void) => {
  const [hasRights, setHasRights] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    isManager().then(val => setHasRights(val));
  }, []);

  return (
    <div className="w-full h-24 bg-white px-4 flex items-center border-b border-color global-outfit">
      Soul Connection
      <ul className="flex flex-grow gap-x-6 text-black text-l items-center justify-center global-outfit">
        <li className={pathname === "/customer/home" ? "border-b-2 border-blue-500" : ""}>
          <Link href="/customer/home">
            <p>Home</p>
          </Link>
        </li>
        <li className={pathname === "/customer/chat" ? "border-b-2 border-blue-500" : ""}>
          <Link href="/customer/chat">
            <p>Chat</p>
          </Link>
        </li>
        <li className={pathname === "/customer/advices" ? "border-b-2 border-blue-500" : ""}>
          <Link href="/customer/advices">
            <p>Advices</p>
          </Link>
        </li>
        <li className={pathname === "/customer/notes" ? "border-b-2 border-blue-500" : ""}>
          <Link href="/customer/notes">
            <p>Notes</p>
          </Link>
        </li>
        <li className={pathname === "/customer/encounters" ? "border-b-2 border-blue-500" : ""}>
          <Link href="/customer/encounters">
            <p>Encounters</p>
          </Link>
        </li>
      </ul>
      <div className="flex justify-end space-x-3">
        <Link href="/employee/chat">
          <FontAwesomeIcon 
            icon={faMessage}
            style={{color: "#5c8db2"}}
            size="2x"
          />
        </Link>
        <ReactCountryFlag 
          className="emojiFlag"
          countryCode="FR"
          style={{
            fontSize: '1.9em',
            lineHeight: '0.8em',
          }}
          aria-label="France" />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <FontAwesomeIcon 
              icon={faCircleUser}
              style={{color: "#5c8db2"}}
              size="2x"
             />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>  {/*replace with customer user name here */}
              <p className="font-semibold">zoey@example.com</p> {/*replace with customer user email here */}
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={ handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

const SideBarEmployee = (handleLogout: () => Promise<void>, openDBPopup: () => void) => {
  const [hasRights, setHasRights] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    isManager().then(val => setHasRights(val));
  }, []);

  return (
    <div className="w-full h-24 bg-white px-4 flex items-center border-b border-color outfit-font">
      Soul Connection
      <ul className="flex flex-grow gap-x-6 text-black text-l items-center justify-center">
        <li className={pathname === "/employee/home" ? "border-b-2 border-blue-500" : ""}>
          <Link href="/employee/home">
            <p>Dashboard</p>
          </Link>
        </li>
        {hasRights && (
          <li className={pathname === "/employee/coaches" ? "border-b-2 border-blue-500" : ""}>
            <Link href="/employee/coaches">
              <p>Coaches</p>
            </Link>
          </li>
        )}
        <li className={pathname === "/employee/customers" ? "border-b-2 border-blue-500" : ""}>
          <Link href="/employee/customers">
            <p>Customers</p>
          </Link>
        </li>
        {hasRights && (
          <li className={pathname === "/employee/statistics" ? "border-b-2 border-blue-500" : ""}>
            <Link href="/employee/statistics">
              <p>Statistics</p>
            </Link>
          </li>
        )}
        <li className={pathname === "/employee/tips" ? "border-b-2 border-blue-500" : ""}>
          <Link href="/employee/tips">
            <p>Tips</p>
          </Link>
        </li>
        <li className={pathname === "/customer/home" ? "border-b-2 border-blue-500" : ""}>
          <Link href="/employee/events">
            <p>Events</p>
          </Link>
        </li>
        <li className={pathname === "/customer/home" ? "border-b-2 border-blue-500" : ""}>
          <Link href="/employee/astro-compatibility">
            <p>Astrology</p>
          </Link>
        </li>
        <li className={pathname === "/employee/clothing" ? "border-b-2 border-blue-500" : ""}>
          <Link href="/employee/clothing">
            <p>Clothing</p>
          </Link>
        </li>
        <li className={pathname === "/employee/advices" ? "border-b-2 border-blue-500" : ""}>
          <Link href="/employee/advices">
            <p>Advices</p>
          </Link>
        </li>
        <li className={pathname === "/employee/notes" ? "border-b-2 border-blue-500" : ""}>
          <Link href="/employee/notes">
            <p>Notes</p>
          </Link>
        </li>
      </ul>
      <div className="flex justify-end space-x-3">
        <Link href="/employee/chat">
          <FontAwesomeIcon 
            icon={faMessage}
            style={{color: "#5c8db2"}}
            size="2x"
          />
        </Link>
        <ReactCountryFlag 
          className="emojiFlag"
          countryCode="FR"
          style={{
            fontSize: '1.9em',
            lineHeight: '0.8em',
          }}
          aria-label="France" />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <FontAwesomeIcon 
              icon={faCircleUser}
              style={{color: "#5c8db2"}}
              size="2x"
             />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>  {/*replace with employee user name here */}
              <p className="font-semibold">zoey@example.com</p> {/*replace with employee user email here */}
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={ handleLogout }>
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

  const handleLogout = async() => {
    try {
      const res = await fetch('/api/employees/logout', { method: 'POST' });
      if (res.status === 307) {
        window.location.reload();
      }
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const checkUserType = async () =>{
      const userType = await isCustomer();
      setCustomerType(userType);
    }
    checkUserType();
  }, []);

  if (pathname === '/login') {
    return null;
  }

  return (
    <div>
      <div className="fixed w-full h-24 bg-white text-black flex items-center justify-between px-6 border-b border-color">
        {isCustomerType ? (
          <>
            { SideBarCustomer(handleLogout, openDBPopup) }
          </>
          ) : (
          <>
            { SideBarEmployee(handleLogout, openDBPopup) }
          </>
        )}
      </div>
    </div>
  );
}
