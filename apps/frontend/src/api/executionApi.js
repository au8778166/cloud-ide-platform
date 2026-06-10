import axios from "axios";

const executionApi = axios.create({
  baseURL:
    import.meta.env
      .VITE_EXECUTION_SERVICE_URL,
});

export const executeCode = async (
  language,
  code,
  input,
) => {
  const response =
    await executionApi.post(
      "/execute",
      {
        language,
        code,
        input
      }
    );

  return response.data;
};