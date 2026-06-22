import api from "./axios";

export const getJobStatus = async (jobId) => {
  const response = await api.get(`/api/jobs/${jobId}`);

  return response.data;
};
