import MonacoEditor from "@monaco-editor/react";

const languageMap = {
  javascript: "javascript",
  python: "python",
  c: "c",
  cpp: "cpp",
  java: "java",
  go: "go",
};

const Editor = ({ activeFile, updateFileContent }) => {
  return (
    <div className="h-full w-full">
      <MonacoEditor
        height="100%"
        language={languageMap[activeFile.language]}
        theme="vs-dark"
        value={activeFile.content}
        onChange={(value) => updateFileContent(value)}
        options={{
          fontSize: 16,
          fontLigatures: true,
          smoothScrolling: true,

          minimap: {
            enabled: false,
          },

          scrollBeyondLastLine: false,

          padding: {
            top: 20,
          },

          cursorBlinking: "smooth",

          roundedSelection: true,

          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default Editor;
