import { useEffect, useState } from "react";
import Dashboard from "../layout/Dashboard";
import { albumsAPI } from "../services/apiService";
import toast from "react-hot-toast";
import { ImImage } from "react-icons/im";
import { BiTrash } from "react-icons/bi";
import { FiFolder, FiTool } from "react-icons/fi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdOutlineTextsms } from "react-icons/md";

const ListAlbums = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const response = await albumsAPI.list();
      setData(response.data.albums);
    } catch (e) {
      toast.error("Error fetching albums");
    } finally {
      setLoading(false);
    }
  };

  const deleteAlbum = async (id) => {
    setLoading(true);

    try {
      const response = await albumsAPI.remove(id);

      if (response.status === 204) {
        toast.success("Album deleted!");
        await fetchAlbums();
      } else {
        toast.error("Failed to delete album");
      }
    } catch (e) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <Dashboard activeMenu="All Albums">
      {loading && (
        <div className="grid place-items-center min-h-[80vh]">
          <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Albums Library
          </h1>
          <p className="text-gray-600">Manage your albums</p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Table header */}
          <div className="bg-blue-600 px-6 py-4">
            <div className="grid grid-cols-9 gap-4 items-center text-white font-semibold sm:grid-cols-12">
              <div className="col-span-2 flex items-center gap-2">
                <ImImage className="hidden sm:inline w-4 h-4" />
                <span>Cover</span>
              </div>

              <div className="col-span-3 flex items-center gap-2">
                <FiFolder className="hidden sm:inline w-4 h-4" />
                <span>Name</span>
              </div>
              <div className="hidden sm:flex items-center col-span-3 gap-2">
                <MdOutlineTextsms className="hidden sm:inline w-4 h-4" />
                <span>Description</span>
              </div>

              <div className="col-span-2 flex items-center gap-2">
                <IoColorPaletteOutline className="hidden sm:inline w-4 h-4" />
                <span>Theme</span>
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
                <p className="text-gray-500 text-lg">No albums found.</p>
                <p className="text-gray-400 text-sm">
                  Add an album to get started.
                </p>
              </div>
            ) : (
              data.map((album, i) => (
                <div
                  key={i}
                  className="grid grid-cols-9 gap-4 items-center px-6 py-4 transition-colors duration-200 hover:bg-gray-50 sm:grid-cols-12"
                >
                  {/* Album image */}
                  <div className="col-span-2">
                    <div className="w-12 h-12 rounded-lg shadow-md transition-shadow duration-200 overflow-hidden hover:shadow-lg">
                      <img
                        src={album?.imageUrl}
                        alt={album?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Album name */}
                  <div className="col-span-3">
                    <p className="font-medium text-gray-900 truncate">
                      {album?.name}
                    </p>
                  </div>

                  {/* Album description */}
                  <div className="hidden sm:inline-block col-span-3">
                    <p className="text-gray-600 truncate">
                      {album?.description || "No description"}
                    </p>
                  </div>

                  {/* Album color */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <div
                        style={{ backgroundColor: album?.bgColor }}
                        title={`Theme color: ${album?.bgColor}`}
                        className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm "
                      ></div>
                      <span className="hidden sm:inline-block text-sm text-gray-500 font-mono">
                        {album?.bgColor}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex justify-center">
                    <button
                      title="Delete album"
                      className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-red-50 text-red-600 transition-colors duration-200 group cursor-pointer hover:bg-red-100 hover:text-red-700"
                    >
                      <BiTrash
                        className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
                        onClick={() => deleteAlbum(album?._id)}
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
              <span>Total Albums:</span>
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

export default ListAlbums;
