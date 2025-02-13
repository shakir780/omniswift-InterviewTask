import axios from "axios";
import { FilterParams, Student } from "../types";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchAges = async () => {
  const response = await api.get("/viewAllAges");
  return response.data;
};

export const fetchStates = async () => {
  const response = await api.get("/viewAllStates");
  return response.data;
};

export const fetchLevels = async () => {
  const response = await api.get("/viewAllLevels");
  return response.data;
};

export const fetchGenders = async () => {
  const response = await api.get("/viewAllGender");
  return response.data;
};

export const fetchAllData = async () => {
  const response = await api.get("/viewAllData");
  return response.data;
};

export const filterData = async (filters: FilterParams): Promise<Student[]> => {
  const response = await api.post("/filterData", filters);
  return response?.data?.data?.students;
};

export const downloadResult = async (studentId: number) => {
  try {
    const response = await api.post(`viewResult/${studentId}`, {
      responseType: "blob",
    });
    const blob = new Blob([response.data], { type: "application/pdf" });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Student_Result_${studentId}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading result:", error);
  }
};
