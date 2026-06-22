import api from "./axios";

export const executeCode = async (language, code, input) => {
  const response = await api.post("/api/execute", {
    language,
    code,
    input,
  });

  return response.data;
};
