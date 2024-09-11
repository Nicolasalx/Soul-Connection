'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Modal, ModalBody, ModalContent, ModalFooter } from "@nextui-org/react";
import { usePathname } from 'next/navigation';
import If from "./If";
import { isManager } from "@/app/lib/user";

const SideBarItems = (handleLogout: () => Promise<void>, openDBPopup: () => void) => {
  const [hasRights, setHasRights] = useState(false);

  useEffect(() => {
    isManager().then(val => setHasRights(val));
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
          <Link href="/employee/all-encounters">
            <p>All Encounters</p>
          </Link>
        </li>
        <li>
          <Link href="/employee/coach-advices">
            <p>Coach Advices</p>
          </Link>
        </li>
        <li>
          <Link href="/employee/customer-advices">
            <p>Customer Advices</p>
          </Link>
        </li>
        <li>
          <Link href="/employee/coach-notes">
            <p>Coach Notes</p>
          </Link>
        </li>
        <li>
          <Link href="/employee/customer-notes">
            <p>Customer Notes</p>
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
}

export default function NavBar() {
  const pathname = usePathname();
  const [isDBPopupOpen, setIsDBPopupOpen] = useState(false);

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

  if (pathname === '/login') {
    return null;
  }

  return (
    <div>
      <div className="fixed w-full h-24 bg-white text-black flex items-center justify-between px-6 border-b border-color">
        { SideBarItems(handleLogout, openDBPopup) }
      </div>
    </div>
  );
}
