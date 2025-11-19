import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AddSong from "./pages/AddSong";
import ListSongs from "./pages/ListSongs";
import AddAlbum from "./pages/AddAlbum";
import ListAlbums from "./pages/ListAlbums";
import ProtectedRoute from "./components/ProtectedRoute";

export const API_BASE_URL = "https://echosphere-backend-9666.onrender.com";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/add-song"
          element={
            <ProtectedRoute requiredAdmin={true}>
              <AddSong />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-album"
          element={
            <ProtectedRoute requiredAdmin={true}>
              <AddAlbum />
            </ProtectedRoute>
          }
        />
        <Route
          path="/list-songs"
          element={
            <ProtectedRoute requiredAdmin={true}>
              <ListSongs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/list-albums"
          element={
            <ProtectedRoute requiredAdmin={true}>
              <ListAlbums />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute requiredAdmin={true}>
              <AddSong />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
