import Link from "next/link";

export default function NavBar() {
    return (
      <div className="w-full h-20 bg-emerald-800 sticky top-0 container mx-auto px-4 flex justify-between items-center">
        <ul className="hidden md:flex gap-x-6 text-white">
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
