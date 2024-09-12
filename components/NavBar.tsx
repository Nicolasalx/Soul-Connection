'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, CircularProgress } from "@nextui-org/react";
import ReactCountryFlag from "react-country-flag"
import { usePathname } from 'next/navigation';
import { getProfilePicture, isCustomer, isManager } from "@/app/lib/user";
import { verifyToken } from "@/app/lib/dal";
import Customers from "@/app/back/models/customers";
import Employees from "@/app/back/models/employees";

const customerPages = [{url: 'home', name: 'Dashboard'}, {url: 'chat', name: 'Chat'}, {url: 'advices', name: 'Advices'}, {url: 'notes', name: 'Notes'}, {url: 'encounters', name: 'Encounters'}]
const employeePages = [{url: 'home', name: 'Dashboard'}, {url: 'coaches', name: 'Coaches'}, {url: 'customers', name: 'Customers'}, {url: 'statistics', name: 'Statistics'}, {url: 'tips', name: 'Tips'}, {url: 'events', name: 'Events'}, {url: 'astro-compatibility', name: 'Astrology'}, {url: 'clothing', name: 'Clothing'}, {url: 'advices', name: 'Advices'}, {url: 'notes', name: 'Notes'}, {url: 'coaches-list', name: 'Coaches List'}]
const employeeReservedPages = ['statistics', 'coaches']

type UserInfos = {
  name: string;
  email: string;
  role: string;
}

const BarItems = (handleLogout: () => Promise<void>, pages: { url: string, name: string }[], reservedPages: string[]) => {
  const [hasRights, setHasRights] = useState(false);
  const [userInfos, setUserInfos] = useState<UserInfos | null>(null)
  const [imageUrl, setImageUrl] = useState('')
  const pathname = usePathname();

  useEffect(() => {
    isManager().then(val => setHasRights(val));
    verifyToken().then(payload => {
      if (payload) {
        const infos = payload.role === 'customer' ? payload.infos as Customers : payload.infos as Employees
        setUserInfos({name: infos.name + ' ' + infos.surname, email: infos.email, role: payload.role as string})
      }
    })
    getProfilePicture().then(res => {
      if (res) {
        setImageUrl(res.image)
      }
    })
  }, []);

  return (
    <div className="w-full h-24 bg-white px-4 flex flex-row gap-6 items-center justify-between border-b border-color outfit-font">
      <h1 className="bg-transparent">Soul Connection</h1>
      <ul className="flex flex-row gap-x-6 items-center m-auto overflow-x-scroll h-20">
        {pages.map(page => {
          if ((reservedPages.includes(page.url) && hasRights) ||
              !reservedPages.includes(page.url)) {
            return (
              <li className={pathname.includes(page.url) ? "border-b-2 border-[#005bc1] text-[#005bc1]" : ""}>
                <Link href={`/${userInfos?.role}/${page.url}`}>
                  <p>{page.name}</p>
                </Link>
              </li>
            )
          }
        })}
      </ul>
      <div className="flex justify-end cursor-pointer space-x-3 items-center">
        <Link href={`/${userInfos?.role}/chat`}>
          <FontAwesomeIcon
            icon={faMessage}
            style={{color: "#5c8db2"}}
            size="2x"
          />
        </Link>
        <ReactCountryFlag
          countryCode="US"
          style={{
            fontSize: '1.9em',
            lineHeight: '0.8em',
            borderRadius: '9999px',
          }}
          aria-label="English United States" />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar showFallback src={imageUrl} fallback={<CircularProgress />}/>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as {userInfos?.name}</p>
              <p className="font-semibold">({userInfos?.email})</p>
            </DropdownItem>
<<<<<<< HEAD
=======
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
    <div className="w-full h-24 bg-white px-4 flex gap-6 items-center border-b border-color outfit-font">
      Soul Connection
      <ul className="flex flex-grow gap-x-6 text-black text-l items-center  overflow-x-auto h-20">
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
        <li className={pathname === "/employee/customers-list" ? "border-b-2 border-blue-500" : ""}>
          <Link href="/employee/coaches-list">
            <p>Coaches List</p>
          </Link>
        </li>
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
      <div className="flex justify-end cursor-pointer space-x-3">
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
>>>>>>> f51fa0ffe5e475a6a58726af381b7b804df1fda1
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
    <div className="fixed top-0 z-50 w-full h-24 bg-white text-black flex items-center justify-between px-6 border-b border-color">
      {BarItems(handleLogout, isCustomerType ? customerPages : employeePages, isCustomerType ? [] : employeeReservedPages)}
    </div>
  );
}