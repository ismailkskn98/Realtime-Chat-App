import { HOST } from "@/utils/constants";
import axios, { type AxiosInstance } from "axios";

export const apiClient: AxiosInstance = axios.create({
  baseURL: HOST,
  headers: {
    "Content-Type": "application/json",
  },
});
