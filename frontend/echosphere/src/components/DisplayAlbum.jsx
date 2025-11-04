import { useContext } from "react";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/assets";
import { FaRegClock } from "react-icons/fa";

const DisplayAlbum = ({ album }) => {
  const { albumsData, songsData } = useContext(PlayerContext);
  const { id } = useParams();

  const albumSongs = songsData.filter((s) => s.albumName === album.name);
  const numOfSongs = albumSongs.length;

  return albumsData ? (
    <>
      <div className="flex flex-col flex-gap mt-10 gap-8 md:flex-row md:items-end">
        <img src={album?.imageUrl} alt="Album cover" className="w-48 rounded" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{album?.name}</h2>
          <h4>{album?.description}</h4>
          <p className="mt-1">
            <img
              src={assets.logo}
              alt="EchoSphere logo"
              className="inline-block w-5 mr-1"
            />
            <b>EchoSphere</b> . 1,233,456 .{" "}
            <b>
              {numOfSongs} {numOfSongs === 1 ? "Song" : "Songs"}
            </b>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 mt-10 mb-4 pl-2 sm:grid-cols-4 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>
        </p>
        <p>Song</p>
        <p className="hidden sm:block">Date Added</p>
        <div className="m-auto w-4">
          <FaRegClock />
        </div>
      </div>

      <hr />

      {albumSongs.map((song, i) => (
        <div
          key={i}
          className="grid grid-cols-3 gap-2 p-2 items-center text-[#a7a7a7] cursor-pointer hover:bg-[#ffffff2b] sm:grid-cols-4"
        >
          <p className="text-white">
            <b className="mr-4 text-[#a7a7a7]">{++i}</b>
            <img
              src={song.image}
              alt="Song cover"
              className="inline w-10 mr-5"
            />
          </p>
          <p className="text-[15px]">{song.name}</p>
          <p className="hidden sm:block text-[15px]">5 days ago</p>
          <p className="text-center text-[15px]">{song.duration}</p>
        </div>
      ))}
    </>
  ) : null;
};

export default DisplayAlbum;
