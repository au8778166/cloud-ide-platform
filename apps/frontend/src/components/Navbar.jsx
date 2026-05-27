import LanguageSelector from "./LanguageSelector";

const Navbar = ({
  createNewFile,
}) => {
  return (
    <div className="h-14 bg-[#1e1e1e] border-b border-gray-800 flex items-center justify-between px-4 text-white">
      <h1 className="text-lg font-semibold">
        Cloud IDE
      </h1>

      <div className="flex items-center gap-4">
        <LanguageSelector
          createNewFile={createNewFile}
        />

        <button className="bg-green-600 px-4 py-1 rounded hover:bg-green-700">
          Run
        </button>
      </div>
    </div>
  );
};

export default Navbar;