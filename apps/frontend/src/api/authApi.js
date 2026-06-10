import axios from "axios";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_SERVICE_URL,
});

export const registerUser = async (data) => {
  const response = await authApi.post("/register", data);

  return response.data;
};

export const loginUser = async (data) => {
  const response = await authApi.post("/login", data);

  return response.data;
};
export const getProfile = async (
  token
) => {
  const response =
    await authApi.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  return response.data;
};