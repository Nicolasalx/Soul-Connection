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
      <ul className="ml-4 md:ml-8 mt-24 space-y-10 text-3xl md:text-2xl lg:text-3xl">
        <li>
          <Link href="/home">
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link href="/coaches">
            <p>Coaches</p>
          </Link>
        </li>
        <li>
          <Link href="/customers">
            <p>Customers</p>
          </Link>
        </li>
        <li>
          <Link href="/statistics">
            <p>Statistics</p>
          </Link>
        </li>
        <li>
          <Link href="/tips">
            <p>Tips</p>
          </Link>
        </li>
        <li>
          <Link href="/events">
            <p>Events</p>
          </Link>
        </li>
        <li>
          <Link href="/astro-compatibility">
            <p>Astrology</p>
          </Link>
        </li>
        <li>
          <Link href="/clothing">
            <p>Clothing</p>
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
          <Button className="font-bold" color="primary" onClick={handleLogout}>
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
      <Button className="fixed top-0 left-0 z-50 shadow-lg text-3xl m-4 rounded-full md:disabled md:hidden" onClick={toggleSidebar}>
        {isSidebarOpen ? 'X' : 'Menu'}
      </Button>
      <div className={`fixed left-0 h-full w-[40%] md:w-[20%] z-40 bg-black/80 text-white backdrop-blur-sm border-r-8 border-pink-500 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:transform-none md:-translate-x-full`}>
        { SideBarItems(userConnected, handleLogout) }
      </div>
    </div>
  );
}
