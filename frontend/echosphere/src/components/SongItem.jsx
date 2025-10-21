const SongItem = ({ id, name, image }) => {
  return (
    <div className="min-w-[180px] p-2 py-3 rounded cursor-pointer hover:bg-[#ffffff26]">
      <img src={image} alt="Song cover" className="rounded" />
      <p className="font-bold mt-2 mb-1">{name}</p>
    </div>
  );
};

export default SongItem;
