import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { FiHome, FiLogOut, FiUser } from "react-icons/fi";
import { useSearch } from "../context/SearchContext";
import { MdOutlineClear } from "react-icons/md";

const Navbar = () => {
  const { user, logout } = useAuth();

  const { searchQuery, setSearchQuery, setIsSearchActive, clearSearch } =
    useSearch();

  const handleSearchClick = () => {
    setIsSearchActive(true);
    navigate("/search");
  };

  const handleClearSearch = () => {
    clearSearch();
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav>
      <div className="w-full flex flex-col justify-between items-center font-semibold">
        {/* Nav buttons */}
        <div className="w-full flex justify-between items-center mb-2">
          {/* Home/Back/Forward buttons */}
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 flex justidy-center items-center bg-black p-2 rounded-2xl cursor-pointer hover:bg-green-700 transition-colors lg:hidden"
              onClick={() => {
                navigate("/");
                clearSearch();
              }}
            >
              <FiHome className="w-4 h-4 text-white" />
            </div>
            <div
              className="w-8 h-8 flex justidy-center items-center bg-black p-2 rounded-2xl cursor-pointer hover:bg-green-700 transition-colors"
              onClick={() => navigate(-1)}
            >
              <FaChevronLeft className="w-4 h-4 text-white" />
            </div>
            <div
              className="w-8 h-8 flex justidy-center items-center bg-black p-2 rounded-2xl cursor-pointer  hover:bg-green-700 transition-colors"
              onClick={() => navigate(1)}
            >
              <FaChevronRight className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* User button */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-700 px-3 py-1 rounded-2xl">
              <FiUser className="w-4 h-4 text-white" />
              <span className="hidden sm:inline text-white text-sm">
                {user?.email.split("@")[0]}
              </span>
            </div>
            {/* Logout button */}
            <button
              className="flex items-center gap-1 bg-red-700 py-1 px-3 rounded-2xl text-[15px] cursor-pointer transition-colors hover:bg-red-800"
              onClick={handleLogout}
              title="Logout"
            >
              <FiLogOut className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>

        {/* Searchbar */}
        <div className="relative flex w-full justify-center items-center gap-2 lg:hidden">
          <FaSearch className="absolute left-2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 pl-8 bg-[#2a2a2a] text-white placeholder-gray-400 px-3 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            onFocus={handleSearchClick}
          />
          <button className="cursor-pointer" onClick={handleClearSearch}>
            <MdOutlineClear className="w-6 h-6 text-gray-400 hover:text-green-700" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
