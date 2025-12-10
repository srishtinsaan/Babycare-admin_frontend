import { Menu } from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  return (
    <header className="flex h-16 bg-white  items-center fixed top-0 left-0 w-full z-20 shadow px-4 py-3 justify-between">
      <button
        onClick={onMenuClick}
        className="p-2 rounded hover:bg-pink-100 md:hidden"
      >
        <Menu size={22} />
      </button>

    </header>
  );
};


export default Navbar;
