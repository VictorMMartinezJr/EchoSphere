import { useEffect, useState } from "react";
import Dashboard from "../layout/Dashboard";
import { songsAPI } from "../services/apiService";
import { FiFolder, FiTool } from "react-icons/fi";
import { ImImage } from "react-icons/im";
import { FaRegClock } from "react-icons/fa";
import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";
import { LuMusic4 } from "react-icons/lu";

const ListSongs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSongs = async () => {
    setLoading(true);
    try {
      const response = await songsAPI.list();
      setData(response.data.songs);
    } catch (e) {
      toast.error("Error fetching songs");
    } finally {
      setLoading(false);
    }
  };

  const deleteSong = async (id) => {
    setLoading(true);

    try {
      const response = await songsAPI.remove(id);

      if (response.status === 204) {
        toast.success("Song deleted!");
        await fetchSongs();
      } else {
        toast.error("Failed to delete song");
      }
    } catch (e) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);
  return (
    <Dashboard activeMenu="All Songs">
      {loading && (
        <div className="grid place-items-center min-h-[80vh]">
          <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Main content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Songs Library
          </h1>
          <p className="text-gray-600">Manage your songs collection</p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Table header */}
          <div className="bg-blue-600 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 items-center text-white font-semibold">
              <div className="col-span-2 flex items-center gap-2">
                <ImImage className="hidden sm:inline w-4 h-4" />
                <span>Cover</span>
              </div>

              <div className="col-span-3 flex items-center gap-2">
                <LuMusic4 className="hidden sm:inline w-4 h-4" />
                <span>Name</span>
              </div>
              <div className="col-span-3 flex items-center gap-2">
                <FiFolder className="hidden sm:inline w-4 h-4" />
                <span>Album</span>
              </div>

              <div className="col-span-2 flex items-center gap-2">
                <FaRegClock className="hidden sm:inline w-4 h-4" />
                <span>Duration</span>
              </div>

              <div className="col-span-2 text-center">
                <FiTool className="hidden sm:inline w-4 h-4" /> Actions
              </div>
            </div>
          </div>

          {/* Table body */}
          <div className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <ImImage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No songs found.</p>
                <p className="text-gray-400 text-sm">
                  Add a song to get started.
                </p>
              </div>
            ) : (
              data.map((song, i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 gap-4 items-center px-6 py-4 transition-colors duration-200 hover:bg-gray-50 "
                >
                  {/* Song image */}
                  <div className="col-span-2">
                    <div className="w-12 h-12 rounded-lg shadow-md transition-shadow duration-200 overflow-hidden hover:shadow-lg">
                      <img
                        src={song?.image}
                        alt={song?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Song name */}
                  <div className="col-span-3">
                    <p className="font-medium text-gray-900 truncate">
                      {song?.name}
                    </p>
                  </div>

                  {/* Song album */}
                  <div className="col-span-3">
                    <p className="text-gray-600 truncate">
                      {song?.albumName || "Single Release"}
                    </p>
                  </div>

                  {/* Song duration */}
                  <div className="col-span-2">
                    <div className="flex justify-center items-center gap-2">
                      <span className="text-sm text-gray-500 font-mono">
                        {song?.duration}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex justify-center">
                    <button
                      title="Delete song"
                      className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-red-50 text-red-600 transition-colors duration-200 group cursor-pointer hover:bg-red-100 hover:text-red-700"
                    >
                      <BiTrash
                        className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
                        onClick={() => deleteSong(song._id)}
                      />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        {data?.length > 0 && (
          <div className="mt-6 bg-gray-50 rounded-lg px- py-4">
            <div className="flex justify-between items-center text-sm text-gray-600 px-2">
              <span>Total Songs:</span>
              <span className="font-semibold text-gray-900">
                {""} {data?.length}
              </span>
            </div>
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default ListSongs;
