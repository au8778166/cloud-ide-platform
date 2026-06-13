import { FaJs, FaPython, FaJava, FaTrash } from "react-icons/fa";

import { SiC, SiCplusplus, SiGo } from "react-icons/si";

const getFileIcon = (language) => {
  switch (language) {
    case "javascript":
      return <FaJs className="text-yellow-400 text-lg" />;

    case "python":
      return <FaPython className="text-blue-400 text-lg" />;

    case "c":
      return <SiC className="text-blue-300 text-lg" />;

    case "cpp":
      return <SiCplusplus className="text-blue-500 text-lg" />;

    case "java":
      return <FaJava className="text-red-400 text-lg" />;

    case "go":
      return <SiGo className="text-cyan-400 text-lg" />;

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
    <div className="h-full bg-[#0f172a] border-r border-slate-800 text-white p-4 overflow-auto">
      <h2 className="text-sm uppercase tracking-wider font-bold text-cyan-400 mb-4">
        Explorer ({files.length})
      </h2>

      {files.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-16 text-slate-500">
          <div className="text-5xl mb-3">📁</div>

          <p className="text-center">Create a file to start coding</p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {files.map((file) => (
          <div
            key={file.id}
            className={`
              flex items-center justify-between
              px-3 py-3 rounded-xl text-sm
              border transition-all duration-200
              ${
                activeFile?.id === file.id
                  ? "bg-cyan-500/10 border-cyan-500 shadow-lg shadow-cyan-500/10"
                  : "bg-slate-900 border-slate-800 hover:border-slate-600"
              }
            `}
          >
            <button
              onClick={() => setActiveFile(file)}
              className="flex items-center gap-3 flex-1 text-left overflow-hidden"
            >
              {getFileIcon(file.language)}

              <span className="truncate">{file.name}</span>
            </button>

            <div className="flex items-center gap-3 ml-2">
              <button
                className="hover:scale-110 transition-all"
                onClick={() => {
                  const newName = prompt("Enter new filename", file.name);

                  if (newName) {
                    renameFile(file.id, newName);
                  }
                }}
              >
                ✏️
              </button>

              <button
                className="hover:scale-110 transition-all"
                onClick={() => deleteFile(file.id)}
              >
                <FaTrash className="text-rose-400 hover:text-rose-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
