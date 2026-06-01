const Terminal = ({
  terminalOutput,
  activeFile,
}) => {
  return (
    <div className="h-full bg-black border-t border-gray-800 text-green-400 p-3 text-sm overflow-auto">
      <p className="mb-2 text-gray-500">
        Ready to execute{" "}
        {activeFile?.language}
      </p>

      <pre className="whitespace-pre-wrap">
        {terminalOutput}
      </pre>
    </div>
  );
};

export default Terminal;