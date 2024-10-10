import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const isActiveLink = (path) => {
    const isActive = pathname.startsWith(path);

    return isActive;
  };

  return (
    <div
      className={`fixed top-0 left-0 w-64 z-50 transform h-screen dark-mode ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:block`}
    >
      <div className="p-4 flex flex-col h-full">
        <button onClick={toggleSidebar} className="md:hidden">
          Toggle Sidebar
        </button>
        <Link
          href="/"
          className="flex items-center justify-center md:justify-start gap-2 py-3"
        >
          <span className="hidden md:block font-bold px-2">&nbsp;</span>
        </Link>
        <ul className="flex flex-col space-y-2">
          <li
            className={`p-2 rounded ${
              isActiveLink("/dashboard/users")
                ? "bg-sidebar-active bg-white dark:bg-gray-800"
                : "hover:bg-white hover:dark:bg-gray-800"
            }`}
          >
            <Link href="/dashboard/users">Users</Link>
          </li>
          <li
            className={`p-2 rounded ${
              isActiveLink("/dashboard/articles")
                ? "bg-sidebar-active bg-white dark:bg-gray-800"
                : "hover:bg-white hover:dark:bg-gray-800"
            }`}
          >
            <Link href="/dashboard/articles">Articles</Link>
          </li>
        </ul>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300 mb-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
