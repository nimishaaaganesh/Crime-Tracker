"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = {
  role: "admin" | "officer";
};

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const pathname = usePathname();
  return (
    <div
      className=" bg-black  text-yellow-400 p-4  fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] z-10"
    >
      <ul className="space-y-4 mt-5">
        {role === "admin" && (
          <li>
            <Link href="/officers" className={`hover:text-yellow-500 ${
               pathname === "/officers" ? "text-yellow-200 font-bold text-2xl" : ""
              }`}>
              Manage Officers
            </Link>
          </li>
        )}
        <li>
          <Link href="/cases" className={`hover:text-yellow-500 ${
               pathname === "/cases" ? "text-yellow-200 font-bold text-2xl" : ""
              }`}>
            Manage Cases
          </Link>
        </li>
        <li>
          <Link href="/criminal" className={`hover:text-yellow-500 ${
               pathname === "/criminal" ? "text-yellow-200 font-bold text-2xl" : ""
              }`}>
            Manage Criminals
          </Link>
        </li>
        <li>
          <Link href="/arrest" className={`hover:text-yellow-500 ${
               pathname === "/arrest" ? "text-yellow-200 font-bold text-2xl" : ""
              }`}>
            Manage Arrests
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
