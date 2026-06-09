const Terminal = ({
  terminalOutput,
  activeFile,
  programInput,
  setProgramInput,
}) => {
  return (
    <div className="h-full bg-black border-t border-gray-800 p-3 overflow-auto">
      <p className="mb-2 text-gray-500 text-sm">
        Ready to execute {activeFile?.language}
      </p>

      <div className="mb-4">
        <p className="text-yellow-400 text-sm mb-1">
          Program Input
        </p>

        <textarea
          value={programInput}
          onChange={(e) =>
            setProgramInput(e.target.value)
          }
          placeholder="Enter input here..."
          className="w-full h-24 bg-[#1e1e1e] text-white p-2 rounded resize-none outline-none border border-gray-700"
        />
      </div>

      <div>
        <p className="text-green-400 text-sm mb-1">
          Output
        </p>

        <pre className="text-green-400 whitespace-pre-wrap">
          {terminalOutput}
        </pre>
      </div>
    </div>
  );
};

export default Terminal;