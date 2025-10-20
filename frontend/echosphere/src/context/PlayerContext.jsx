import { createContext, useEffect, useState } from "react";
import { API_BASE_URL, useAuth } from "./authContext";
import axios from "axios";

export const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {
  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const { user, token, getAuthHeaders } = useAuth();

  const getSongs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/songs`, {
        headers: getAuthHeaders(),
      });
      const songs = response.data.songs || [];
      setSongsData(songs);
    } catch (error) {
      console.error(error);
      setSongsData([]);
    }
  };
  const getAlbums = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/albums`, {
        headers: getAuthHeaders(),
      });
      const albums = response.data.albums || [];
      setAlbumsData(albums);
      console.log(response);
    } catch (error) {
      console.error(error);
      setAlbumsData([]);
    }
  };

  useEffect(() => {
    if (user && token) {
      getAlbums();
      getSongs();
    }
  }, [user, token]);

  const contextValue = { songsData, albumsData, getSongs, getAlbums };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};
