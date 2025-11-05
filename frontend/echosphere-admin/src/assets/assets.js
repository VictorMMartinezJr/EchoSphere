import { LuMusic4 } from "react-icons/lu";
import logo from "../../public/logo.png";
import { FiFolder, FiFolderPlus } from "react-icons/fi";
import { CiCircleList } from "react-icons/ci";

export const assets = {
  logo,
};

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Add Song",
    icon: LuMusic4,
    path: "/add-song",
  },
  {
    id: "02",
    label: "All Songs",
    icon: CiCircleList,
    path: "/list-songs",
  },
  {
    id: "03",
    label: "Add Album",
    icon: FiFolderPlus,
    path: "/add-album",
  },
  {
    id: "04",
    label: "All Albums",
    icon: FiFolder,
    path: "/list-albums",
  },
];
