import LanguageSelector from "./LanguageSelector";

import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Navbar = ({
  createNewFile,
  activeFile,
  runCode,
  isRunning,
  saveProject,
}) => {
  const { user, token, logout } = useAuth();

  return (
    <div className="h-14 bg-[#1e1e1e] border-b border-gray-800 flex items-center justify-between px-4 text-white">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">Cloud IDE</h1>

        <span className="text-sm text-gray-400">
          Current: {activeFile?.language || "No File"}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSelector createNewFile={createNewFile} />

        <button
          onClick={runCode}
          disabled={isRunning || !activeFile}
          className="bg-green-600 px-4 py-1 rounded hover:bg-green-700 disabled:bg-gray-600"
        >
          {isRunning ? "Running..." : "Run"}
        </button>

        {token ? (
          <>
            <button
              onClick={saveProject}
              disabled={!activeFile}
              className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700 disabled:bg-gray-600"
            >
              Save Project
            </button>

            <span className="text-sm text-gray-300">
              {user?.name || "User"}
            </span>

            <button
              onClick={logout}
              className="bg-red-600 px-4 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-purple-600 px-4 py-1 rounded hover:bg-purple-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
