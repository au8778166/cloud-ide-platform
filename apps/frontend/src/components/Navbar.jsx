import LanguageSelector from "./LanguageSelector";

const Navbar = ({
  createNewFile,
  activeFile,
  runCode,
  isRunning,
}) => {
  return (
    <div className="h-14 bg-[#1e1e1e] border-b border-gray-800 flex items-center justify-between px-4 text-white">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">
          Cloud IDE
        </h1>

        <span className="text-sm text-gray-400">
          Current: {activeFile?.language}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSelector
          createNewFile={createNewFile}
        />

        <button
          onClick={runCode}
          disabled={isRunning}
          className="bg-green-600 px-4 py-1 rounded hover:bg-green-700 disabled:bg-gray-600"
        >
          {isRunning
            ? "Running..."
            : "Run"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;