import Image from "next/image";
import Link from "next/link";

export default function MyCustomers() {
  return (
    <>
      <div className="w-full h-20 bg-emerald-800 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/accountManagement">
                  <p>Account Management</p>
                </Link>
              </li>
              <li>
                <Link href="/myCustomers">
                  <p>All of my customers</p>
                </Link>
              </li>
              <li>
                <Link href="/clientProfile">
                  <p>Client Profile</p>
                </Link>
              </li>

              <li>
                <Link href="/statistics">
                  <p>Statistics</p>
                </Link>
              </li>

              <li>
                <Link href="/advices">
                  <p>Advices</p>
                </Link>
              </li>

              <li>
                <Link href="/events">
                  <p>Events</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
