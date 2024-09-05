'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import If from "./If";
import { isConnected } from "@/app/lib/connection";

const SideBarItems = (userConnected: boolean, handleLogout: () => Promise<void>, classOption?: string) => {
  return (
    <>
      <ul className="mt-10 space-y-6">
        <li>
          <Link href="/home">
            <p className="pl-4">Home</p>
          </Link>
        </li>
        <li>
          <Link href="/coaches">
            <p className="pl-4">Coaches</p>
          </Link>
        </li>
        <li>
          <Link href="/customers">
            <p className="pl-4">Customers</p>
          </Link>
        </li>
        <li>
          <Link href="/statistics">
            <p className="pl-4">Statistics</p>
          </Link>
        </li>
        <li>
          <Link href="/tips">
            <p className="pl-4">Tips</p>
          </Link>
        </li>
        <li>
          <Link href="/events">
            <p className="pl-4">Events</p>
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
  )
}

export default function NavBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userConnected, setUserConnected] = useState(false);
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

  return (
    <div>
      <div className="w-full h-24 fixed top-0 left-0 px-4 bg-white flex justify-between items-center z-50">
        <div className="cursor-pointer md:cursor-auto" onClick={toggleSidebar}>
          <p>HOME+SC-LOGO</p>
        </div>
      </div>
      <Button className="p-4 text-white focus:outline-none md:hidden" onClick={toggleSidebar}>
        x Close
      </Button>
      <div className={`fixed top-24 left-0 h-[calc(100%-6rem)] w-64 bg-gray-800 text-white transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50 md:transform-none md:-translate-x-full`}>
        { SideBarItems(userConnected, handleLogout) }
      </div>
    </div>
  );
}
