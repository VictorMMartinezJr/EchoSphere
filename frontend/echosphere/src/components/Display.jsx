import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import Search from "./Search";
import Navbar from "./Navbar";
import { useContext, useEffect, useRef } from "react";
import { PlayerContext } from "../context/PlayerContext";

const Display = () => {
  const { albumsData } = useContext(PlayerContext);

  const displayRef = useRef();
  const location = useLocation();
  const isAlbumPage = location.pathname.includes("album");
  const albumId = isAlbumPage ? location.pathname.split("/").pop() : "";

  const backgroundColor = isAlbumPage
    ? albumsData.find((a) => a._id === albumId)?.bgColor
    : "#121212";

  useEffect(() => {
    if (isAlbumPage) {
      displayRef.current.style.background = `linear-gradient(${backgroundColor}, #121212)`;
    } else {
      displayRef.current.style.background = "#121212";
    }
  }, [isAlbumPage, backgroundColor]);
  return (
    <div
      ref={displayRef}
      className="flex flex-col w-[100%] m-2 bg-[#121212] text-white lg:w-[75%] lg:ml-0 "
    >
      {/* Navbar */}
      <div className="sticky top-0 z-10 bg-[#121212]/95 backdrop-blur-sm border-b border-gray-800/50 px-6 pt-4 pb-2">
        <Navbar />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 px-6 pb-4 overflow-auto">
        <Routes>
          <Route path="/" element={<DisplayHome />} />
          <Route
            path="/album/:id"
            element={
              <DisplayAlbum album={albumsData.find((a) => a._id === albumId)} />
            }
          />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </div>
  );
};

export default Display;
