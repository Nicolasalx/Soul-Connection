import Link from "next/link";

export default function NavBar() {
    return (
      <div className="w-full h-24 bg-white sticky top-0 px-4 flex justify-between items-center">
        <ul className="hidden md:flex gap-x-6 text-black items-center">
        <li className="flex items-center pr-6 border-r-2 border-gray-300">
            <Link href="/home-page">
              <p>HOME+SOUL-CONNECTION-LOGO</p>
            </Link>
          </li>
          <li>
            <Link href="/account-management">
              <p>Account Management</p>
            </Link>
          </li>
          <li>
            <Link href="/my-customers">
              <p>All of my customers</p>
            </Link>
          </li>
          <li>
            <Link href="/client-profile">
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
    );
}
