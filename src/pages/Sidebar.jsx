import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  Menu,
  LayoutDashboard,
  X,
  Home,
  Calendar,
  BookOpen,
  Settings,
  Users,
  FileText,
  Info,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Home", icon: Home, path: "/home" },
    { name: "About", icon: Info, path: "/about" },
    { name: "Programs", icon: BookOpen, path: "/programs" },
    { name: "Events", icon: Calendar, path: "/events" },
    { name: "Blogs", icon: FileText, path: "/blogs" },
    { name: "Team", icon: Users, path: "/team" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <aside
  className={`fixed top-0 left-0 z-40 bg-white shadow-md h-screen transition-all duration-300
  ${isOpen ? "w-64" : isMobile ? "w-0" : "w-20"} overflow-hidden`}
>
        <div className="flex items-center justify-between p-4 border-b">
          <h2
            className={`text-2xl font-bold text-pink-500 transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 md:hidden"
            }`}
          >
            BabyCare
          </h2>

          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-2  rounded hover:bg-pink-100"
            >
              <X size={22} />
            </button>
          )}
        </div>

        <ul className="space-y-2 mt-6 text-gray-700">
          {menuItems.map(({ name, icon: Icon, path }) => {
            const isActive = location.pathname === path;
            return (
              <li key={name}>
                <Link
                  to={path}
                  onClick={() => isMobile && toggleSidebar()}
                  className={`flex items-center gap-3 p-3 cursor-pointer rounded-md transition-colors
                    ${isActive ? "bg-pink-100 text-pink-600 font-semibold" : "hover:bg-pink-50"}
                  `}
                >
                  <Icon className="text-pink-500" size={22} />
                  {isOpen && <span>{name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1  flex flex-col">
        {/* Top Bar */}
        <header className="flex items-center fixed w-full justify-between bg-white  shadow px-4 py-3">
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded hover:bg-pink-100"
            >
              <Menu size={22} />
            </button>
          )}
          <h1 className="text-xl font-semibold  text-gray-800">Admin Panel</h1>
        </header>

        {/* Your Page Content will load here */}
      <main className="flex-1 bg-gradient-to-b from-white to-pink-200 p-6">          
        {/* Page content will come from your <Routes> in App.jsx */}
        <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
