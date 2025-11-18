import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";

const DisplayHome = () => {
  const { songsData, albumsData, track, setTrack, setPlayStatus, playSong } =
    useContext(PlayerContext);

  return (
    <>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {/* Display albums */}
          {albumsData?.map((item, i) => (
            <AlbumItem
              key={i}
              id={item._id}
              name={item.name}
              desc={item.description}
              image={item.imageUrl}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {/* Display songs */}
          {songsData?.map((item, i) => (
            <div
              onClick={() => {
                if (track != item) {
                  setTrack(item);
                } else {
                  playSong();
                }
                setPlayStatus(true);
              }}
            >
              <SongItem
                key={i}
                id={item._id}
                name={item.name}
                image={item.image}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
