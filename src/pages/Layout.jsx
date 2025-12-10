import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom";
import { useState } from "react";


export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex flex-col w-screen">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        <main className=" lg:ml-64 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
