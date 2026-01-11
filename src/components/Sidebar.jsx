import { useState, useEffect } from "react";
import {  X,
  Home,
  Calendar,
  Quote,
  BookOpen,
  Settings,
  Users,
  FileText,
  MessageSquareQuote,
  Info,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // when switching to desktop, sidebar should stay open
      if (!mobile) {
        // do nothing because Layout controls isOpen
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Home", icon: Home, path: "/home" },
    { name: "About", icon: Info, path: "/about" },
    { name: "Services", icon: Quote, path: "/services" },
    { name: "Programs", icon: BookOpen, path: "/programs" },
    { name: "Events", icon: Calendar, path: "/events" },
    { name: "Blogs", icon: FileText, path: "/blogs" },
    { name: "Teams", icon: Users, path: "/teams" },
    { name: "Testimonials", icon: MessageSquareQuote, path: "/testimonials" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 bg-white shadow-md h-screen transition-all  duration-300 
      ${isMobile ? (isOpen ? "w-64" : "w-0") : "w-64"}
 overflow-hidden`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2
          className={`text-2xl font-bold text-pink-500 ${
  isMobile ? (isOpen ? "opacity-100" : "opacity-0") : "opacity-100"
}`}
        >
          BabyCare
        </h2>

        {isMobile && (
          <button onClick={onClose} className="p-2 rounded hover:bg-pink-100">
            <X size={22} />
          </button>
        )}
      </div>

      {/* Menu */}
      <ul className="space-y-2 mt-6 text-gray-700">
        {menuItems.map(({ name, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <li key={name}>
              <Link
                to={path}
                className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                  isActive
                    ? "bg-pink-100 text-pink-600"
                    : "hover:bg-pink-50"
                }`}
              >
                <Icon className="text-pink-500" size={22} />
                {(isOpen || !isMobile) && <span>{name}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
