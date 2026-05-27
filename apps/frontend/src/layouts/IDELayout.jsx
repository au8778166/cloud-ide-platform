import { useState } from "react";

import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FileExplorer from "../components/FileExplorer";
import Editor from "../components/Editor";
import Terminal from "../components/Terminal";
import EditorTabs from "../components/EditorTabs";

import { initialFiles } from "../utils/initialFiles";

const IDELayout = () => {
  const [files, setFiles] = useState(initialFiles);

  const [activeFile, setActiveFile] =
    useState(initialFiles[0]);

  const updateFileContent = (value) => {
    const updatedFiles = files.map((file) =>
      file.id === activeFile.id
        ? {
            ...file,
            content: value,
          }
        : file
    );

    setFiles(updatedFiles);

    setActiveFile({
      ...activeFile,
      content: value,
    });
  };

  const createNewFile = (
    fileName,
    language
  ) => {
    const extensionMap = {
      javascript: "js",
      python: "py",
      c: "c",
      cpp: "cpp",
      java: "java",
      go: "go",
    };

    const extension =
      extensionMap[language];

    const newFile = {
      id: Date.now(),
      name: `${fileName}.${extension}`,
      language,
      content: "",
    };

    setFiles([...files, newFile]);

    setActiveFile(newFile);
  };

  const deleteFile = (id) => {
    if (files.length === 1) return;

    const updatedFiles = files.filter(
      (file) => file.id !== id
    );

    setFiles(updatedFiles);

    if (activeFile.id === id) {
      setActiveFile(updatedFiles[0]);
    }
  };

  return (
    <div className="h-screen bg-[#121212] flex flex-col">
      <Navbar
        createNewFile={createNewFile}
      />

      <PanelGroup
        direction="horizontal"
        className="flex-1"
      >
        <Sidebar />

        <Panel
          defaultSize={18}
          minSize={15}
        >
          <FileExplorer
            files={files}
            activeFile={activeFile}
            setActiveFile={setActiveFile}
          />
        </Panel>

        <PanelResizeHandle className="w-[2px] bg-gray-800" />

        <Panel>
          <PanelGroup direction="vertical">
            <Panel defaultSize={75}>
              <div className="flex flex-col h-full">
                <EditorTabs
                  files={files}
                  activeFile={activeFile}
                  setActiveFile={setActiveFile}
                  deleteFile={deleteFile}
                />

                <div className="flex-1">
                  <Editor
                    activeFile={activeFile}
                    updateFileContent={
                      updateFileContent
                    }
                  />
                </div>
              </div>
            </Panel>

            <PanelResizeHandle className="h-[2px] bg-gray-800" />

            <Panel
              defaultSize={25}
              minSize={15}
            >
              <Terminal />
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default IDELayout;