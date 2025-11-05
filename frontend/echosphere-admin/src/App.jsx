import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AddSong from "./pages/AddSong";
import ListSongs from "./pages/ListSongs";
import AddAlbum from "./pages/AddAlbum";
import ListAlbums from "./pages/ListAlbums";

export const API_BASE_URL = "http://localhost:8080";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/add-song" element={<AddSong />} />
        <Route path="/add-album" element={<AddAlbum />} />
        <Route path="/list-songs" element={<ListSongs />} />
        <Route path="/list-albums" element={<ListAlbums />} />
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<AddSong />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
