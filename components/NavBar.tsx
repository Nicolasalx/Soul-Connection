'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Modal, ModalBody, ModalContent, ModalFooter } from "@nextui-org/react";
import { usePathname } from 'next/navigation';
import If from "./If";
import { isConnected } from "@/app/lib/connection";
import { isManager } from "@/app/lib/user";
import { delete_db_customers, update_db_customers } from "@/app/lib/update_db_data/update_db_customers";
import { delete_db_employees, update_db_employees } from "@/app/lib/update_db_data/update_db_employees";
import { delete_db_encounters, update_db_encounters } from "@/app/lib/update_db_data/update_db_encounters";
import { delete_db_events, update_db_events } from "@/app/lib/update_db_data/update_db_events";
import { delete_db_payments, update_db_payments } from "@/app/lib/update_db_data/update_db_payments";
import { delete_db_tips, update_db_tips } from "@/app/lib/update_db_data/update_db_tips";
import { delete_db_clothes_image, update_db_clothes_image } from "@/app/lib/update_db_data/update_db_clothes_image";
import { delete_db_customers_image, update_db_customers_image } from "@/app/lib/update_db_data/update_db_customers_image";

const SideBarItems = (handleLogout: () => Promise<void>, openDBPopup: () => void) => {
  const [hasRights, setHasRights] = useState(false)

  useEffect(() => {
    isManager().then(val => setHasRights(val))
  }, [])

  return (
    <>
      <ul className="ml-4 md:ml-8 mt-24 space-y-10 text-3xl md:text-xl lg:text-3xl">
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
        <If condition={hasRights}>
          <li>
            <Link href="/statistics">
              <p>Statistics</p>
            </Link>
          </li>
        </If>
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
      </ul>
      <div className="absolute left-[25%] bottom-4 w-[50%] flex flex-col justify-center gap-4 lg:left-0 lg:w-full lg:flex lg:flex-row lg:justify-center">
        <Button className="font-bold" color="primary" onClick={handleLogout}>
          Log Out
        </Button>
        <If condition={hasRights}>
          <Button className="font-bold" color="primary" onClick={openDBPopup}>
            DataBase
          </Button>
        </If>
      </div>
    </>
  );
}

const DatabaseModal = (isDBPopupOpen: boolean, closeDBPopup: () => void) => {
  return (
    <Modal isOpen={isDBPopupOpen} onClose={closeDBPopup}>
      <ModalContent>
        <ModalBody>
          <p>Select an action:</p>
          <div className="flex justify-between items-center mb-1">
            <Button className="m-2" color="default" onClick={() => update_db_customers()}>Update customers DB</Button>
            <Button className="m-2" color="danger" onClick={() => delete_db_customers()}>Delete customers DB</Button>
          </div>
          <div className="flex justify-between items-center mb-1">
            <Button className="m-2" color="default" onClick={() => update_db_employees()}>Update employees DB</Button>
            <Button className="m-2" color="danger" onClick={() => delete_db_employees()}>Delete employees DB</Button>
          </div>
          <div className="flex justify-between items-center mb-1">
            <Button className="m-2" color="default" onClick={() => update_db_encounters()}>Update encounters DB</Button>
            <Button className="m-2" color="danger" onClick={() => delete_db_encounters()}>Delete dbencounters</Button>
          </div>
          <div className="flex justify-between items-center mb-1">
            <Button className="m-2" color="default" onClick={() => update_db_events()}>Update events DB</Button>
            <Button className="m-2" color="danger" onClick={() => delete_db_events()}>Delete events DB</Button>
          </div>
          <div className="flex justify-between items-center mb-1">
            <Button className="m-2" color="default" onClick={() => update_db_payments()}>Update payments DB</Button>
            <Button className="m-2" color="danger" onClick={() => delete_db_payments()}>Delete payments DB</Button>
          </div>
          <div className="flex justify-between items-center mb-1">
            <Button className="m-2" color="default" onClick={() => update_db_tips()}>Update tips DB</Button>
            <Button className="m-2" color="danger" onClick={() => delete_db_tips()}>Delete tips DB</Button>
          </div>
          <div className="flex justify-between items-center mb-1">
            <Button className="m-2" color="default" onClick={() => update_db_clothes_image()}>Update Clothes Image DB</Button>
            <Button className="m-2" color="danger" onClick={() => delete_db_clothes_image()}>Delete Clothes Image DB</Button>
          </div>
          <div className="flex justify-between items-center mb-1">
            <Button className="m-2" color="default" onClick={() => update_db_customers_image()}>Update Customers Image DB</Button>
            <Button className="m-2" color="danger" onClick={() => delete_db_customers_image()}>Delete Customers Image DB</Button>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={closeDBPopup}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default function NavBar()
{
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  if (pathname === '/login') {
    return null;
  }

  return (
    <div>
      <Button className="bg-black text-white fixed top-0 left-0 z-50 shadow-lg text-3xl m-4 rounded-full md:disabled md:hidden" onClick={toggleSidebar}>
        {isSidebarOpen ? 'X' : 'Menu'}
      </Button>
      <div className={`fixed left-0 h-full w-[40%] md:w-[20%] z-40 bg-black/80 text-white backdrop-blur-sm border-r-8 border-pink-500 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:transform-none md:-translate-x-full`}>
        { SideBarItems(handleLogout, openDBPopup) }
      </div>
      { DatabaseModal(isDBPopupOpen, closeDBPopup) }
    </div>
  );
}
