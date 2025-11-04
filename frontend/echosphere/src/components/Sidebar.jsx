import { useState } from "react";
import { FaArrowRight, FaPlus, FaSearch } from "react-icons/fa";
import { IoLibraryOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { FiHome } from "react-icons/fi";
import { MdOutlineClear } from "react-icons/md";

const Sidebar = () => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const { searchQuery, setSearchQuery, setIsSearchActive, clearSearch } =
    useSearch();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setShowSearchInput(true);
    setIsSearchActive(true);
    navigate("/search");
  };

  const handleClearSearch = () => {
    setShowSearchInput(false);
    clearSearch();
  };

  return (
    <div className="hidden lg:flex flex-col w-[25%] h-full p-2 gap-2 text-white">
      <div className="bg-[#121212] h-[15%] flex flex-col justify-around rounded px-4">
        <div
          className="flex items-center gap-3 cursor-pointer hover:text-green-400 transition-colors"
          onClick={() => {
            navigate("/");
            clearSearch();
          }}
        >
          <FiHome className="w-4 h-4" />
          <p className="font-bold">Home</p>
        </div>

        {/* Searchbar */}
        <div className="py-2">
          {!showSearchInput ? (
            <div
              className="flex items-center gap-3 cursor-pointer hover:text-green-500 transition-colors"
              onClick={handleSearchClick}
            >
              <FaSearch className="w-4 h-4" />
              <p className="font-bold">Search</p>
            </div>
          ) : (
            <div className="relative flex justify-center items-center gap-2">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-[#2a2a2a] text-white placeholder-gray-400 px-3 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                autoFocus
              />
              <button className="cursor-pointer " onClick={handleClearSearch}>
                <MdOutlineClear className="w-6 h-6 text-gray-400 hover:text-green-700" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Library */}
      <div className="bg-[#121212 h-[85%] rounded">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            <IoLibraryOutline className="w-4 h-4" />
            <p className="font-semibold">Your Library</p>
          </div>

          <div className="flex items-center gap-3 cursor-pointer">
            <FaArrowRight className="w-4 h-4 hover:text-green-700 transition-colors" />
            <FaPlus className="w-4 h-4 hover:text-green-700 transition-colors" />
          </div>
        </div>

        <div className="flex flex-col justify-start items-start p-4 bg-[#242424] m-2 rounded font-semibold gap-1 pl-4">
          <h1>Create your first playlist</h1>
          <p className="font-light">It's easy we will help you</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 cursor-pointer">
            Create Playlist
          </button>
        </div>

        <div className="flex flex-col justify-start items-start bg-[#242424] m-2 rounded font-semibold p-4 mt-4">
          <h1>Let's find some podcasts to follow</h1>
          <p className="font-light">We will keep you updated on new episodes</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 cursor-pointer">
            Browse Podcasts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
