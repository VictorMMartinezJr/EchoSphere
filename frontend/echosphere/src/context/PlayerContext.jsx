import { createContext, useEffect, useRef, useState } from "react";
import { API_BASE_URL, useAuth } from "./authContext";
import axios from "axios";

export const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {
  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const { user, token, getAuthHeaders } = useAuth();
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const playSong = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playSongWithId = async (id) => {
    songsData.map((item) => {
      if (id == item._id) {
        setTrack(item);
      }
    });

    await audioRef.current.play();
    setPlayStatus(true);
  };

  const previousSong = () => {
    const currentIndex = songsData.findIndex((item) => item._id === track._id);

    if (currentIndex > 0) {
      const newTrack = songsData[currentIndex - 1];
      setTrack(newTrack);

      // Wait to update the audio src before playing
      setTimeout(() => {
        audioRef.current.play();
        setPlayStatus(true);
      }, 200);
    }
  };

  const nextSong = async () => {
    const currentIndex = songsData.findIndex((item) => item._id === track._id);

    if (currentIndex < songsData.length - 1) {
      const newTrack = songsData[currentIndex + 1];
      setTrack(newTrack);

      // Wait to update the audio src before playing
      setTimeout(() => {
        audioRef.current.play();
        setPlayStatus(true);
      }, 200);
    }
  };

  const seekSong = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  const getSongs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/songs`, {
        headers: getAuthHeaders(),
      });
      const songs = response.data.songs || [];
      setSongsData(songs);

      if (songs.length > 0) setTrack(songs[0]);
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

  // Setup audio event listeners
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateSeekbar = () => {
      if (seekBar.current && audio.duration) {
        const songProgress = (audio.currentTime / audio.duration) * 100;
        seekBar.current.style.width = Math.floor(songProgress) + "%";
        setTime({
          currentTime: {
            second: Math.floor(audio.currentTime % 60),
            minute: Math.floor(audio.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audio.duration % 60),
            minute: Math.floor(audio.duration / 60),
          },
        });
      }
    };

    const handleLoadedMetaData = () => {
      if (seekBar.current) {
        seekBar.current.style.width = "0%";
      }
    };

    // Add event listeners
    audio.addEventListener("timeupdate", updateSeekbar);
    audio.addEventListener("loadedmetadata", handleLoadedMetaData);

    // Cleanup
    return () => {
      audio.removeEventListener("timeupdate", updateSeekbar);
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
    };
  }, [track]);

  const contextValue = {
    songsData,
    albumsData,
    getSongs,
    getAlbums,
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    playSong,
    pauseSong,
    playSongWithId,
    previousSong,
    nextSong,
    seekSong,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};
