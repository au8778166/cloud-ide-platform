import { IoClose } from "react-icons/io5";

const EditorTabs = ({ files, activeFile, setActiveFile, deleteFile }) => {
  return (
    <div className="h-12 bg-[#020617] border-b border-slate-800 flex items-center overflow-x-auto px-2">
      {files?.map((file) => (
        <div
          key={file.id}
          onClick={() => setActiveFile(file)}
          className={`
            h-9
            px-4
            mx-1
            rounded-t-xl
            flex items-center gap-3
            cursor-pointer
            transition-all
            ${
              activeFile?.id === file.id
                ? "bg-[#0f172a] text-cyan-400 border border-slate-700"
                : "text-slate-400 hover:bg-slate-900"
            }
          `}
        >
          <span className="text-sm truncate max-w-[150px]">{file.name}</span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteFile(file.id);
            }}
            className="
              hover:text-red-400
              transition-all
            "
          >
            <IoClose size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default EditorTabs;
