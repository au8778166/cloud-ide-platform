import { FaJs, FaPython, FaJava, FaTrash } from "react-icons/fa";

import { SiC, SiCplusplus, SiGo } from "react-icons/si";

const getFileIcon = (language) => {
  switch (language) {
    case "javascript":
      return <FaJs className="text-yellow-400" />;

    case "python":
      return <FaPython className="text-blue-400" />;

    case "c":
      return <SiC className="text-blue-300" />;

    case "cpp":
      return <SiCplusplus className="text-blue-500" />;

    case "java":
      return <FaJava className="text-red-400" />;

    case "go":
      return <SiGo className="text-cyan-400" />;

    default:
      return null;
  }
};

const FileExplorer = ({
  files,
  activeFile,
  setActiveFile,
  deleteFile,
  renameFile,
}) => {
  return (
    <div className="h-full bg-[#1e1e1e] border-r border-gray-800 text-white p-3 overflow-auto">
      <h2 className="text-sm font-semibold mb-4">Explorer ({files.length})</h2>

      <div className="flex flex-col gap-2">
        {files.length === 0 && (
          <div className="text-gray-500 p-3">No files yet</div>
        )}
        {files.map((file) => (
          <div
            key={file.id}
            className={`flex items-center justify-between px-2 py-2 rounded text-sm ${
              activeFile.id === file.id ? "bg-[#37373d]" : "hover:bg-[#2a2d2e]"
            }`}
          >
            <button
              onClick={() => setActiveFile(file)}
              className="flex items-center gap-2 flex-1 text-left"
            >
              {getFileIcon(file.language)}

              <span>{file.name}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const newName = prompt("Enter new filename", file.name);

                  if (newName) {
                    renameFile(file.id, newName);
                  }
                }}
              >
                ✏️
              </button>

              <button onClick={() => deleteFile(file.id)}>
                <FaTrash className="text-red-400 hover:text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
