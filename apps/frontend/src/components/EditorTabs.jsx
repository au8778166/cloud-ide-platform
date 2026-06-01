import { IoClose } from "react-icons/io5";

const EditorTabs = ({
  files,
  activeFile,
  setActiveFile,
  deleteFile,
}) => {

  

  return (
    <div className="h-10 bg-[#1e1e1e] border-b border-gray-800 flex items-center overflow-x-auto">
      {files?.map((file) => (
        <div
          key={file.id}
          onClick={() =>
            setActiveFile(file)
          }
          className={`h-full px-4 flex items-center gap-3 border-r border-gray-800 cursor-pointer ${
            activeFile.id === file.id
              ? "bg-[#2d2d2d] text-white"
              : "bg-[#1e1e1e] text-gray-400"
          }`}
        >
          <span className="text-sm">
            {file.name}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteFile(file.id);
            }}
            className="hover:text-red-400"
          >
            <IoClose size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default EditorTabs;