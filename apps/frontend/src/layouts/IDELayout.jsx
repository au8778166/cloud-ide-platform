import { useState } from "react";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { getJobStatus } from "../api/jobApi";
import { executeCode } from "../api/executionApi";
import {
  createProject,
  createFile,
  getProjects,
  getProjectById,
  deleteProject,
  clearProjectFiles,
} from "../api/projectApi";

import { useAuth } from "../context/AuthContext";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FileExplorer from "../components/FileExplorer";
import Editor from "../components/Editor";
import Terminal from "../components/Terminal";
import EditorTabs from "../components/EditorTabs";

const IDELayout = () => {
  const [files, setFiles] = useState([]);

  const [activeFile, setActiveFile] = useState(null);

  const [terminalOutput, setTerminalOutput] = useState("Welcome to Cloud IDE");

  const [programInput, setProgramInput] = useState("");

  const [isRunning, setIsRunning] = useState(false);
  const [projects, setProjects] = useState([]);

  const [showProjects, setShowProjects] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);

  const { token } = useAuth();

  const updateFileContent = (value) => {
    if (!activeFile) return;

    const updatedFiles = files.map((file) =>
      file.id === activeFile.id
        ? {
            ...file,
            content: value,
          }
        : file,
    );

    setFiles(updatedFiles);

    setActiveFile({
      ...activeFile,
      content: value,
    });
  };

  const createNewFile = (fileName, language) => {
    const extensionMap = {
      javascript: "js",
      python: "py",
      c: "c",
      cpp: "cpp",
      java: "java",
      go: "go",
    };

    const extension = extensionMap[language];

    const cleanName = fileName.includes(".")
      ? fileName.split(".")[0]
      : fileName;

    const newFile = {
      id: Date.now(),
      name: `${cleanName}.${extension}`,
      language,
      content: "",
    };

    setFiles((prev) => [...prev, newFile]);

    setActiveFile(newFile);
  };

  const deleteFile = (id) => {
    const updatedFiles = files.filter((file) => file.id !== id);

    setFiles(updatedFiles);

    if (updatedFiles.length === 0) {
      setActiveFile(null);
      return;
    }

    if (activeFile?.id === id) {
      setActiveFile(updatedFiles[0]);
    }
  };

  const renameFile = (id, newName) => {
    const updatedFiles = files.map((file) =>
      file.id === id
        ? {
            ...file,
            name: newName,
          }
        : file,
    );

    setFiles(updatedFiles);

    if (activeFile?.id === id) {
      setActiveFile({
        ...activeFile,
        name: newName,
      });
    }
  };

  const saveProject = async () => {
    try {
      if (!token) {
        alert("Please login to save projects");
        return;
      }

      if (files.length === 0) {
        alert("Create at least one file before saving");
        return;
      }

      if (currentProjectId) {
        await clearProjectFiles(currentProjectId, token);

        for (const file of files) {
          await createFile(currentProjectId, file, token);
        }

        alert("Project updated successfully");

        return;
      }

      const projectName = prompt("Enter project name");

      if (!projectName) return;

      const projectResponse = await createProject(projectName, token);

      const projectId = projectResponse.project.id;

      setCurrentProjectId(projectId);

      for (const file of files) {
        await createFile(projectId, file, token);
      }

      alert("Project created successfully");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to save project");
    }
  };

  const openProjectsModal = async () => {
    try {
      if (!token) {
        alert("Please login first");
        return;
      }

      const data = await getProjects(token);

      setProjects(data.projects);

      setShowProjects(true);
    } catch (error) {
      console.error(error);
    }
  };

  const loadProject = async (projectId) => {
    try {
      const data = await getProjectById(projectId, token);

      setFiles(data.project.files);
      setCurrentProjectId(projectId);

      if (data.project.files.length > 0) {
        setActiveFile(data.project.files[0]);
      } else {
        setActiveFile(null);
      }

      setShowProjects(false);

      setTerminalOutput(`Loaded project: ${data.project.name}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const confirmed = window.confirm("Delete this project?");

      if (!confirmed) return;

      await deleteProject(projectId, token);

      const data = await getProjects(token);

      setProjects(data.projects);
    } catch (error) {
      console.error(error);
    }
  };

  const runCode = async () => {
    if (!activeFile) return;

    setIsRunning(true);

    try {
      setTerminalOutput("Running...");

      const jobResponse = await executeCode(
        activeFile.language,
        activeFile.content,
        programInput,
      );

      const jobId = jobResponse.jobId;

      let status = "waiting";

      const startTime = Date.now();

      const MAX_WAIT_TIME = 10000;

      while (status !== "completed" && status !== "failed") {
        if (Date.now() - startTime > MAX_WAIT_TIME) {
          setTerminalOutput("Execution Timeout");

          break;
        }

        const jobResult = await getJobStatus(jobId);

        status = jobResult.status;

        if (status === "completed") {
          setTerminalOutput(jobResult.output);

          break;
        }

        if (status === "failed") {
          setTerminalOutput(jobResult.error || "Execution Failed");

          break;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      setTerminalOutput(error.message || "Execution Failed");
    }

    setIsRunning(false);
  };

  return (
    <div className="h-screen bg-[#121212] flex flex-col">
      <Navbar
        createNewFile={createNewFile}
        activeFile={activeFile}
        runCode={runCode}
        isRunning={isRunning}
        saveProject={saveProject}
        openProjectsModal={openProjectsModal}
      />

      <PanelGroup direction="horizontal" className="flex-1">
        <Sidebar />

        <Panel defaultSize={18} minSize={15}>
          <FileExplorer
            files={files}
            activeFile={activeFile}
            setActiveFile={setActiveFile}
            deleteFile={deleteFile}
            renameFile={renameFile}
          />
        </Panel>

        <PanelResizeHandle className="w-[2px] bg-gray-800" />

        <Panel>
          <PanelGroup direction="vertical">
            <Panel defaultSize={75}>
              <div className="flex flex-col h-full">
                {files.length > 0 && (
                  <EditorTabs
                    files={files}
                    activeFile={activeFile}
                    setActiveFile={setActiveFile}
                    deleteFile={deleteFile}
                  />
                )}

                <div className="flex-1">
                  {activeFile ? (
                    <Editor
                      activeFile={activeFile}
                      updateFileContent={updateFileContent}
                    />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500">
                      <h2 className="text-3xl font-semibold mb-2">
                        Welcome to Cloud IDE
                      </h2>

                      <p className="text-lg">Create a file to start coding</p>
                    </div>
                  )}
                </div>
              </div>
            </Panel>

            <PanelResizeHandle className="h-[2px] bg-gray-800" />

            <Panel defaultSize={25} minSize={15}>
              <Terminal
                terminalOutput={terminalOutput}
                activeFile={activeFile}
                programInput={programInput}
                setProgramInput={setProgramInput}
              />
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
      {showProjects && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] w-96 rounded-lg p-6">
            <h2 className="text-white text-xl mb-4">Your Projects</h2>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {projects.map((project) => (
                <div key={project.id} className="flex items-center gap-2">
                  <button
                    onClick={() => loadProject(project.id)}
                    className="flex-1 text-left p-3 rounded bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
                  >
                    {project.name}
                  </button>

                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="bg-red-600 px-3 py-3 rounded text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowProjects(false)}
              className="mt-4 bg-red-600 px-4 py-2 rounded text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IDELayout;
