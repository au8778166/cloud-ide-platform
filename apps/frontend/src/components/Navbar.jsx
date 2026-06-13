import LanguageSelector from "./LanguageSelector";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({
  createNewFile,
  activeFile,
  runCode,
  isRunning,
  saveProject,
  openProjectsModal,
}) => {
  const { user, token, logout } = useAuth();

  return (
    <div className="h-16 bg-[#020617]/95 backdrop-blur-xl border-b border-cyan-500/10 flex items-center justify-between px-6 text-white">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Cloud IDE
          </h1>

          <p className="text-xs text-slate-400">
            Current: {activeFile?.language || "No File"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <LanguageSelector createNewFile={createNewFile} />

        <button
          onClick={runCode}
          disabled={isRunning || !activeFile}
          className="
            px-4 py-2 rounded-xl
            bg-gradient-to-r from-emerald-500 to-green-600
            hover:scale-105 transition-all duration-200
            disabled:opacity-50
          "
        >
          {isRunning ? "Running..." : "▶ Run"}
        </button>

        {token ? (
          <>
            <button
              onClick={saveProject}
              disabled={!activeFile}
              className="
                px-4 py-2 rounded-xl
                bg-gradient-to-r from-cyan-500 to-blue-600
                hover:scale-105 transition-all duration-200
                disabled:opacity-50
              "
            >
              Save
            </button>

            <button
              onClick={openProjectsModal}
              className="
                px-4 py-2 rounded-xl
                bg-gradient-to-r from-violet-500 to-purple-600
                hover:scale-105 transition-all duration-200
              "
            >
              Projects
            </button>

            <div className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700">
              {user?.name || "User"}
            </div>

            <button
              onClick={logout}
              className="
                px-4 py-2 rounded-xl
                bg-gradient-to-r from-rose-500 to-red-600
                hover:scale-105 transition-all duration-200
              "
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="
                px-4 py-2 rounded-xl
                bg-gradient-to-r from-cyan-500 to-blue-600
              "
            >
              Login
            </Link>

            <Link
              to="/register"
              className="
                px-4 py-2 rounded-xl
                bg-gradient-to-r from-violet-500 to-purple-600
              "
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