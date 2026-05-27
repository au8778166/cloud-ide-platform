import { useState } from "react";

const languages = [
  {
    name: "JavaScript",
    value: "javascript",
    extension: "js",
  },
  {
    name: "Python",
    value: "python",
    extension: "py",
  },
  {
    name: "C",
    value: "c",
    extension: "c",
  },
  {
    name: "C++",
    value: "cpp",
    extension: "cpp",
  },
  {
    name: "Java",
    value: "java",
    extension: "java",
  },
  {
    name: "Go",
    value: "go",
    extension: "go",
  },
];

const LanguageSelector = ({
  createNewFile,
}) => {
  const [fileName, setFileName] =
    useState("");

  const [language, setLanguage] =
    useState("");

  const handleCreate = () => {
    if (!fileName || !language) return;

    createNewFile(fileName, language);

    setFileName("");
    setLanguage("");
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="filename"
        value={fileName}
        onChange={(e) =>
          setFileName(e.target.value)
        }
        className="bg-[#2d2d2d] text-white px-2 py-1 rounded outline-none text-sm"
      />

      <select
        value={language}
        onChange={(e) =>
          setLanguage(e.target.value)
        }
        className="bg-[#2d2d2d] text-white px-2 py-1 rounded outline-none text-sm"
      >
        <option value="">
          Language
        </option>

        {languages.map((lang) => (
          <option
            key={lang.value}
            value={lang.value}
          >
            {lang.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleCreate}
        className="bg-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-700"
      >
        Add
      </button>
    </div>
  );
};

export default LanguageSelector;