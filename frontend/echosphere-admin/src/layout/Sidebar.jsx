import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../assets/assets";

const Sidebar = ({ activeMenu }) => {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20 h-[calc(100vh - 61px)]">
      {SIDE_MENU_DATA.map((item, i) => (
        <button
          key={i}
          className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg transition-all duration-200 cursor-pointer ${
            activeMenu === item.label
              ? "bg-blue-500 text-white font-medium show-md hover:bg-blue-700"
              : "hover:bg-blue-100"
          }`}
          onClick={() => navigate(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
