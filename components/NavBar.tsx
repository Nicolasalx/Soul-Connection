'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import If from "./If";
import { isConnected } from "@/app/lib/connection";

export default function NavBar() {
  const [userConnected, setUserConnected] = useState(false);

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
    isConnected().then((status) => {
      setUserConnected(status);
    });
  }, []);

  return (
    <div>
      <div className="w-full h-24 fixed top-0 left-0 px-4 bg-white flex justify-between items-center z-50">
        <div className="cursor-pointer">
          <p>HOME+SC-LOGO</p>
        </div>
      </div>

      <div className="fixed top-24 left-0 h-[calc(100%-6rem)] w-64 bg-gray-800 text-white z-50 sm:fixed top-24 left-0 h-[calc(100%-6rem)] sm:w-64 w-32 bg-gray-800 text-white z-50">
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
      </div>
    </div>
  );
}
