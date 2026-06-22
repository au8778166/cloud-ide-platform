import api from "./axios";

export const createProject = async (name, token) => {
  const response = await api.post(
    "/api/projects",
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const getProjects = async (token) => {
  const response = await api.get("/api/projects", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getProjectById = async (projectId, token) => {
  const response = await api.get(`/api/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createFile = async (projectId, file, token) => {
  const response = await api.post(
    `/api/projects/${projectId}/files`,
    {
      name: file.name,
      language: file.language,
      content: file.content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const deleteProject = async (projectId, token) => {
  const response = await api.delete(`/api/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const clearProjectFiles = async (projectId, token) => {
  const response = await api.delete(`/api/projects/${projectId}/files`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
