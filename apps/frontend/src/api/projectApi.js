import axios from "axios";

const projectApi = axios.create({
  baseURL:
    import.meta.env
      .VITE_PROJECT_SERVICE_URL,
});

export const createProject =
  async (
    name,
    token
  ) => {
    const response =
      await projectApi.post(
        "/projects",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const getProjects =
  async (token) => {
    const response =
      await projectApi.get(
        "/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const getProjectById =
  async (
    projectId,
    token
  ) => {
    const response =
      await projectApi.get(
        `/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const createFile = async (
  projectId,
  file,
  token
) => {
  const response =
    await projectApi.post(
      `/projects/${projectId}/files`,
      {
        name: file.name,
        language: file.language,
        content: file.content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};