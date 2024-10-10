"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <SessionProvider>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/*  Content */}
        <div className="flex-1 h-screen overflow-y-auto bg-white text-black dark:bg-gray-800 dark:text-white transition-colors duration-300 flex flex-col">
          <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <div className="flex-grow">{children}</div>
        </div>
      </div>
    </SessionProvider>
  );
}
