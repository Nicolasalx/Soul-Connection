'use client'
import React, { useState } from "react";
import Link from "next/link";
import {Button} from "@nextui-org/react";

export default function NavBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-full h-24 bg-white sticky top-0 px-4 flex justify-between items-center">
      <div className="cursor-pointer" onClick={toggleSidebar}>
        <p>HOME+SC-LOGO</p>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          className="p-4 text-white focus:outline-none"
          onClick={toggleSidebar}
        >
          x Close
        </button>
        <ul className="mt-10 space-y-6">
          <li>
            <Link href="/home-page">
              <p className="pl-4">My Profile</p>
            </Link>
          </li>
          <li>
            <Link href="/account-management">
              <p className="pl-4">Home</p>
            </Link>
          </li>
          <li>
            <Link href="/my-customers">
              <p className="pl-4">Coaches</p>
            </Link>
          </li>
          <li>
            <Link href="/client-profile">
              <p className="pl-4">Customers</p>
            </Link>
          </li>
          <li>
            <Link href="/statistics">
              <p className="pl-4">Statistics</p>
            </Link>
          </li>
          <li>
            <Link href="/advices">
            <p className="pl-4">Events</p>
            </Link>
          </li>
        </ul>
        {/* <div className="absolute bottom-4 w-full flex justify-center">
          <Button color="primary"> { onClick={logout} }
            Log Out
          </Button>
        </div> */}
      </div>
    </div>
  );
}
