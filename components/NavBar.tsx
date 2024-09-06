'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { usePathname } from 'next/navigation';
import If from "./If";
import { isConnected } from "@/app/lib/connection";

const SideBarItems = (userConnected: boolean, handleLogout: () => Promise<void>) => {
  return (
    <>
      <ul className="ml-10 mt-24 space-y-10"> 
        <li>
          <Link href="/home">
            <p className="px-4 text-2xl" style={{ fontSize: "2rem" }}>Home</p>
          </Link>
        </li>
        <li>
          <Link href="/coaches">
            <p className="px-4 text-2xl" style={{ fontSize: "2rem" }}>Coaches</p>
          </Link>
        </li>
        <li>
          <Link href="/customers">
            <p className="px-4 text-2xl" style={{ fontSize: "2rem" }}>Customers</p>
          </Link>
        </li>
        <li>
          <Link href="/statistics">
            <p className="px-4 text-2xl" style={{ fontSize: "2rem" }}>Statistics</p>
          </Link>
        </li>
        <li>
          <Link href="/tips">
            <p className="px-4 text-2xl" style={{ fontSize: "2rem" }}>Tips</p>
          </Link>
        </li>
        <li>
          <Link href="/events">
            <p className="px-4 text-2xl" style={{ fontSize: "2rem" }}>Events</p>
          </Link>
        </li>
        <li>
          <Link href="/astro-compatibility">
            <p className="px-4 text-2xl" style={{ fontSize: "2rem" }}>Astrology</p>
          </Link>
        </li>
        <li>
          <Link href="/clothing">
            <p className="px-4 text-2xl" style={{ fontSize: "2rem" }}>Clothing</p>
          </Link>
        </li>
      </ul>
      <If condition={userConnected}>
        <div className="absolute bottom-4 w-full flex justify-center">
          <Button color="primary" onClick={handleLogout}>
            Log Out
          </Button>
        </div>  
      </If>
    </>
  );
}

export default function NavBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userConnected, setUserConnected] = useState(false);
  const pathname = usePathname();
  const mobileSidebarClass = `transform ${
    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
    } transition-transform duration-300 ease-in-out z-50`

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
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen)
    }

  useEffect(() => {
    isConnected().then((status) => {
      setUserConnected(status);
    });
  }, []);


  if (pathname === '/login') {
    return null;
  }

  return (
    <div>
      <div className="fixed left-0 h-full w-[40%] md:w-[20%] bg-black text-white border-r-8 border-pink-500 z-50">
        <div className="cursor-pointer md:cursor-auto" onClick={toggleSidebar}>
        { SideBarItems(userConnected, handleLogout) }
      </div>
      </div>
    </div>
  );
}


//-------------------------------------------------
