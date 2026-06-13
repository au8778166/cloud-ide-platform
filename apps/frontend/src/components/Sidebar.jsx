import { FaFolder, FaCode } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-16 h-full bg-[#020617] border-r border-slate-800 flex flex-col items-center py-6 gap-8">
      <button className="text-cyan-400 hover:text-cyan-300 transition-all text-xl">
        <FaFolder />
      </button>

      <button className="text-slate-400 hover:text-white transition-all text-xl">
        <FaCode />
      </button>
    </div>
  );
};

export default Sidebar;