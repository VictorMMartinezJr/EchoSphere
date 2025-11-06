import { useEffect, useState } from "react";
import Dashboard from "../layout/Dashboard";
import toast, { CheckmarkIcon } from "react-hot-toast";
import { MdMusicNote } from "react-icons/md";
import { ImImage } from "react-icons/im";
import { songsAPI, albumsAPI } from "../services/apiService";

const AddSong = () => {
  const [image, setImage] = useState(null);
  const [song, setSong] = useState(null);
  const [name, setName] = useState("");
  const [album, setAlbum] = useState("None");
  const [albumsData, setAlbumsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      const request = { name, album };
      formData.append("request", JSON.stringify(request));
      formData.append("audio", song);
      formData.append("image", image);

      const response = await songsAPI.add(formData);
      if (response.status === 201) {
        toast.success("Song added!");
        setName("");
        setAlbum("");
        setImage(null);
        setSong(null);
      } else {
        toast.error("Error adding song");
      }
    } catch (e) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  const loadAlbumData = async () => {
    try {
      const response = await albumsAPI.list();
      setAlbumsData(response.data.albums);
    } catch (e) {
      toast.error("Error fetching albums");
    }
  };

  useEffect(() => {
    loadAlbumData();
  }, []);

  return (
    <Dashboard activeMenu="Add Song">
      {loading ? (
        <div className="grid place-items-center min-h-[80vh]">
          <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <form
          className="flex flex-col items-start gap-8 textgray-600 mt-5"
          onSubmit={onSubmitHandler}
        >
          <div className="flex gap-8">
            {/* Upload song */}
            <div className="flex flex-col gap-4">
              <p>Upload Song</p>
              <input
                type="file"
                id="song"
                accept="audio/*"
                hidden
                onChange={(e) => setSong(e.target.files[0])}
              />
              <label
                htmlFor="song"
                className="flex flex-col justify-center items-center w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer overflow-hidden transition-colors hover:border-blue-500"
              >
                {song ? (
                  <CheckmarkIcon className="w-8 h-8 text-blue-500" />
                ) : (
                  <MdMusicNote className="w-8 h-8 text-gray-500" />
                )}
              </label>
            </div>

            {/* Upload song image */}
            <div className="flex flex-col gap-4">
              <p>Upload Image</p>
              <input
                type="file"
                id="image"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
              <label
                htmlFor="image"
                className="flex flex-col justify-center items-center w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer overflow-hidden transition-colors hover:border-blue-500"
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <ImImage className="w-8 h-8 text-gray-500" />
                )}
              </label>
            </div>
          </div>

          {/* Song name */}
          <div className="flex flex-col gap-2.5">
            <p>Song Name</p>
            <input
              type="text"
              placeholder="Name"
              value={name}
              className="bg-transparent outline-blue-500 border-2 border-gray-400 p-2.5 w-[(max(40vw, 250px)]"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Albums */}
          <div className="flex flex-col gap-2.5">
            <p>Album</p>
            <select
              className="bg-transparent outline-blue-500 border-2 border-gray-400 p-2.5 w-[150px]"
              onChange={(e) => setAlbum(e.target.value)}
              defaultValue={album}
            >
              <option value="None">None</option>
              {albumsData.map((album, i) => (
                <option key={i} value={album.name}>
                  {album.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit btn */}
          <button
            type="submit"
            className="text-base bg-blue-500 text-white px-14 py-2.5 cursor-pointer"
          >
            Add
          </button>
        </form>
      )}
    </Dashboard>
  );
};

export default AddSong;
