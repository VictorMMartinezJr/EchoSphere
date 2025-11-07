import { use, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { MdMenu, MdOutlineClear } from "react-icons/md";
import { assets } from "../assets/assets";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "./Sidebar";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };
  return (
    <nav className="flex justify-between items-center gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sticky top-0 z-30 sm:px-7">
      {/* Left side menu and title */}
      <div className="flex items-center gap-5">
        <button
          className="block text-black hover:bg-gray-100 p-1 rounded transition-colors lg:hidden"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <MdOutlineClear className="text-2xl" />
          ) : (
            <MdMenu className="text-2xl" />
          )}
        </button>

        <div className="flex items-center gap-2">
          <img src={assets.logo} className="h-12 w-12" />
          <span className="text-2xl font-bold text-black">EchoSphere</span>
        </div>
      </div>

      {/* Right side - Admin info and logout */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
          <FiUser className="w-4 h-4 text-blue-700" />
          <span className="hidden sm:inline text-gray-700 text-sm font-medium">
            {user?.email}
          </span>
          <span className="hidden sm:inline text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            {user?.role}
          </span>
        </div>
        {/* Logout button */}
        <button
          className="flex items-center gap-1 bg-red-50 text-red-700 px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-red-100"
          onClick={handleLogout}
          title="Logout"
        >
          <FiLogOut className="w-4 h-4" />
          <span className="hidden md:inline font-medium">Log out</span>
        </button>
      </div>

      {/* Mobile side menu */}
      {openSideMenu && (
        <div className="fixed top-[73px] left-0 right-0 bg-white border-b border-gray-200 z-20 lg:hidden">
          <Sidebar activeMenu={activeMenu} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
