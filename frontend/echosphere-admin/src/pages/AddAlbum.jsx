import { useState } from "react";
import Dashboard from "../layout/Dashboard";
import { ImImage } from "react-icons/im";
import { albumsAPI } from "../services/apiService";
import toast from "react-hot-toast";

const AddAlbum = () => {
  const [image, setImage] = useState(null);
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      const request = { name, description, bgColor: color };
      formData.append("request", JSON.stringify(request));
      formData.append("file", image);

      const response = await albumsAPI.add(formData);
      if (response.status === 201) {
        toast.success("Album added!");
        setName("");
        setDescription("");
        setColor("");
        setImage(null);
      } else {
        toast.error("Error adding album");
      }
    } catch (e) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard activeMenu="Add Album">
      {loading ? (
        <div className="grid place-items-center min-h-[80vh]">
          <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <form
          className="flex flex-col items-start gap-8 textgray-600 mt-5"
          onSubmit={onSubmitHandler}
        >
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

          {/* Album name */}
          <div className="flex flex-col gap-2.5">
            <p>Album Name</p>
            <input
              type="text"
              placeholder="Name"
              value={name}
              className="bg-transparent outline-blue-500 border-2 border-gray-400 p-2.5 w-[max(40vw, 250px)]"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Album description */}
          <div className="flex flex-col gap-2.5">
            <p>Album Description</p>
            <input
              type="text"
              placeholder="Description"
              value={description}
              className="bg-transparent outline-blue-500 border-2 border-gray-400 p-2.5 w-[(max(40vw, 250px)]"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Album bg color */}
          <div className="flex flex-col gap-3">
            <p>Background Color</p>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
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

export default AddAlbum;
