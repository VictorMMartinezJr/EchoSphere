import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { FaPause, FaPlay } from "react-icons/fa6";
import { FaStepBackward, FaStepForward } from "react-icons/fa";

const Player = () => {
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    playSong,
    pauseSong,
    previousSong,
    nextSong,
    seekSong,
    time,
  } = useContext(PlayerContext);

  {
    /* Track image and name */
  }
  return track ? (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex items-center gap-4">
        <img src={track.image} alt="" className="w-12" />
        <div>
          <p>{track.name}</p>
        </div>
      </div>
      {/* Song player */}
      <div className="flex flex-col items-center gap-1 m-auto">
        {/* Prevous song */}
        <div className="flex gap-4">
          <FaStepBackward
            className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors"
            onClick={previousSong}
          />

          {playStatus ? (
            // Pause song
            <FaPause
              className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors"
              onClick={pauseSong}
            />
          ) : (
            // Play song
            <FaPlay
              className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors"
              onClick={playSong}
            />
          )}
          {/* Next song */}
          <FaStepForward
            className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors"
            onClick={nextSong}
          />
        </div>

        {/* Current time of song */}
        <div className="flex items-center gap-5">
          <p>
            {time.currentTime.minute}:{time.currentTime.second}
          </p>

          {/* Visual of current song duration */}
          <div
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
            ref={seekBg}
            onClick={seekSong}
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-500 rounded-full"
            />
          </div>
          {/* Track length */}
          <p>{track.duration}</p>
        </div>
      </div>
    </div>
  ) : null;
};

export default Player;
