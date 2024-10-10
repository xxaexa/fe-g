import { useSession } from "next-auth/react";
import React from "react";

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const { data: session } = useSession();

  return (
    <nav className="dark-mode fixed top-0 left-0 w-full z-50 px-4 py-3 flex justify-between items-center">
      <div className="flex items-center">
        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button
            className="flex flex-col justify-center items-center w-8 h-8 relative"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <span
              className={`block w-6 h-0.5 bg-white rounded transition-transform duration-300 ease-in-out ${
                isSidebarOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white rounded my-1 transition-opacity duration-300 ease-in-out ${
                isSidebarOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white rounded transition-transform duration-300 ease-in-out ${
                isSidebarOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* User Role Display */}
      <div className="text-white">
        {session ? (
          <span>{`Role: ${session.user.role}`}</span>
        ) : (
          <span>Not logged in</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
