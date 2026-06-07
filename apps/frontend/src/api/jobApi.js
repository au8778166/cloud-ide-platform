import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5004/api",
});

export const getJobStatus = async (
  jobId
) => {
  const response =
    await api.get(
      `/jobs/${jobId}`
    );

  return response.data;
};