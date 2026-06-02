import axios from "axios";

const executionApi = axios.create({
  baseURL: "http://localhost:5004/api/v1",
});

export const executeCode = async (
  language,
  code
) => {
  const response =
    await executionApi.post(
      "/execute",
      {
        language,
        code,
      }
    );

  return response.data;
};