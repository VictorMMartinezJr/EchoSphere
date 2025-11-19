import { FaSearch } from "react-icons/fa";
import { useSearch } from "../context/SearchContext";
import SongItem from "./SongItem";
import AlbumItem from "./AlbumItem";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const Search = () => {
  const { searchResults, isSearchActive } = useSearch();
  const { track, setTrack, setPlayStatus, playSong } =
    useContext(PlayerContext);
  const { songs, albums } = searchResults;
  const totalResults = songs.length + albums.length;

  if (!isSearchActive) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] text-center">
        <FaSearch className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Search for music</h2>
        <p className="text-gray-400">Find your favorite songs and albums</p>
      </div>
    );
  }

  if (totalResults === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] text-center">
        <FaSearch className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">No results found</h2>
        <p className="text-gray-400">Try searching for something else</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search results header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Search Results</h1>
        <p>
          {totalResults > 1
            ? totalResults + " results"
            : totalResults === 0
            ? "No results found"
            : totalResults + " result"}
        </p>
      </div>

      {/* Songs */}
      {songs?.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-bold text-white">
              Songs ({songs.length})
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {songs?.map((song, i) => (
              <div
                onClick={() => {
                  if (track != song) {
                    setTrack(song);
                  } else {
                    playSong();
                  }
                  setPlayStatus(true);
                }}
              >
                <SongItem
                  key={i}
                  id={song._id}
                  name={song.name}
                  image={song.image}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Albums */}
      {albums?.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-bold text-white">
              Albums ({albums.length})
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {albums?.map((album, i) => (
              <AlbumItem
                key={i}
                id={album._id}
                name={album.name}
                desc={albums.description}
                image={album.imageUrl}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
