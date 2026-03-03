import axios, { type AxiosInstance } from "axios";
import createApiFactory from "./factory";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (res) => res.data,
  (err) =>
    Promise.reject(
      err?.response?.data?.detail ?? err?.message ?? "Something went wrong",
    ),
);

export const api = createApiFactory(apiClient);
export default apiClient;
