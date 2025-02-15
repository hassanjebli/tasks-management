import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function AuthenticatedLayout({ children }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const auth = usePage().props.auth;

  useEffect(() => {
    const handleClickOutside = (event) => {

      if (!event.target.closest("#profile-dropdown")) {
        setIsDropdownOpen(false);
      }

      if (
        !event.target.closest("#mobile-menu") &&
        !event.target.closest("#mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-emerald-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-sm z-40 flex items-center justify-between px-4 sm:px-8 border-b border-emerald-100">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-emerald-50"
          >
            <svg
              className="w-6 h-6 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Logo */}
          <span className="text-2xl font-bold text-emerald-600">TaskFlow</span>
        </div>

        {/* Profile Dropdown */}
        <div className="relative" id="profile-dropdown">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 group"
          >
            {/* Avatar with Initial and Name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                {auth?.user?.name?.[0]?.toUpperCase() ||
                  auth?.user?.email?.[0]?.toUpperCase() ||
                  "U"}
              </div>
              <span className="hidden md:inline text-emerald-700 font-medium">
                {auth?.user?.name || auth?.user?.email || "User"}
              </span>
            </div>
            <svg
              className={`w-5 h-5 text-emerald-600 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-emerald-50 z-50">
              <div className="px-4 py-2 border-b border-emerald-100">
                <p className="font-medium text-emerald-900 truncate">
                  {auth?.user?.name || "User"}
                </p>
                <p className="text-sm text-emerald-600 truncate">
                  {auth?.user?.email}
                </p>
              </div>
              <Link
                href={route("profile.edit")}
                className="block px-4 py-3 text-emerald-700 hover:bg-emerald-50 transition-colors"
              >
                Edit Profile
              </Link>
              <Link
                href={route("logout")}
                method="post"
                className="w-full text-left block px-4 py-3 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
              >
                Log Out
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Responsive Sidebar */}
      <aside
        id="mobile-menu"
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-emerald-100 z-50 py-6 px-4 transform transition-transform duration-300 ease-in-out shadow-xl ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <nav className="space-y-1">
          <Link
            href={route("dashboard")}
            active={route().current("dashboard")}
            className={`group flex items-center px-4 py-3 rounded-xl transition-all ${
              route().current("dashboard")
                ? "bg-emerald-50 text-emerald-700"
                : "text-emerald-400 hover:bg-emerald-50 hover:text-emerald-600"
            }`}
          >
            <svg
              className={`w-5 h-5 mr-3 ${
                route().current("dashboard")
                  ? "text-emerald-600"
                  : "text-emerald-400 group-hover:text-emerald-600"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </Link>
          <Link
            href={route("projects.index")}
            active={route().current("projects.index")}
            className={`group flex items-center px-4 py-3 rounded-xl transition-all ${
              route().current("projects.index")
                ? "bg-emerald-50 text-emerald-700"
                : "text-emerald-400 hover:bg-emerald-50 hover:text-emerald-600"
            }`}
          >
            <svg
              className={`w-5 h-5 mr-3 ${
                route().current("projects.index")
                  ? "text-emerald-600"
                  : "text-emerald-400 group-hover:text-emerald-600"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Projects
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="pt-16 min-h-screen p-8 lg:ml-64 transition-all duration-300">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm p-6 border border-emerald-50 mt-4">
          {children}
        </div>
      </main>
    </div>
  );
}
