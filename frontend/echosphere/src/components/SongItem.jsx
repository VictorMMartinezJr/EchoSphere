const SongItem = ({ name, image }) => {
  return (
    <div className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
      <img
        src={image}
        alt="album cover"
        className="rounded object-contain h-50"
      />
      <p className="font-bold mt-2 mb-1">{name}</p>
    </div>
  );
};

export default SongItem;
