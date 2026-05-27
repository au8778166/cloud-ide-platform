import {
  FaJs,
  FaPython,
  FaJava,
} from "react-icons/fa";

import {
  SiC,
  SiCplusplus,
  SiGo,
} from "react-icons/si";

const getFileIcon = (language) => {
  switch (language) {
    case "javascript":
      return <FaJs className="text-yellow-400" />;

    case "python":
      return <FaPython className="text-blue-400" />;

    case "c":
      return <SiC className="text-blue-300" />;

    case "cpp":
      return (
        <SiCplusplus className="text-blue-500" />
      );

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
}) => {
  return (
    <div className="h-full bg-[#1e1e1e] border-r border-gray-800 text-white p-3 overflow-auto">
      <h2 className="text-sm font-semibold mb-4">
        Explorer
      </h2>

      <div className="flex flex-col gap-2">
        {files.map((file) => (
          <button
            key={file.id}
            onClick={() => setActiveFile(file)}
            className={`flex items-center gap-2 text-left px-2 py-2 rounded text-sm ${
              activeFile.id === file.id
                ? "bg-[#37373d]"
                : "hover:bg-[#2a2d2e]"
            }`}
          >
            {getFileIcon(file.language)}

            <span>{file.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;