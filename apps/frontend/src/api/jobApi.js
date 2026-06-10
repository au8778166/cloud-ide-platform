import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_JOB_SERVICE_URL,
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