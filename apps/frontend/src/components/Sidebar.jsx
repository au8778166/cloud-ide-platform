import { FaFolder, FaCode } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-14 h-full bg-[#181818] border-r border-gray-800 flex flex-col items-center py-4 gap-6 text-gray-300">
      <FaFolder size={20} />
      <FaCode size={20} />
    </div>
  );
};

export default Sidebar;