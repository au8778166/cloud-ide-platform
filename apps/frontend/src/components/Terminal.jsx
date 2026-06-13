const Terminal = ({
  terminalOutput,
  activeFile,
  programInput,
  setProgramInput,
}) => {
  return (
    <div className="h-full bg-[#020617] border-t border-slate-800 flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800">
        <h3 className="text-cyan-400 font-semibold">Terminal</h3>

        <span className="text-xs text-slate-500">
          {activeFile?.language || "No File"}
        </span>
      </div>

      <div className="p-4 flex-1 overflow-auto">
        <div className="mb-4">
          <p className="text-yellow-400 text-sm mb-2">Program Input</p>

          <textarea
            value={programInput}
            onChange={(e) => setProgramInput(e.target.value)}
            placeholder="Enter program input..."
            className="
              w-full h-24
              bg-slate-900
              border border-slate-700
              rounded-xl
              p-3
              text-white
              resize-none
              outline-none
              focus:border-cyan-500
            "
          />
        </div>

        <div>
          <p className="text-emerald-400 text-sm mb-2">Output</p>

          <div
            className="
            bg-black
            rounded-xl
            border border-slate-800
            p-4
            min-h-[120px]
          "
          >
            <pre className="text-green-400 whitespace-pre-wrap">
              {terminalOutput}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
