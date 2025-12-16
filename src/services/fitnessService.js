import { axiosInstance } from "../assets/axiosInstance";
export const getFitnessPrograms = () => {
  return axiosInstance.get("/fitness-program");
};
export const getFitnessProgramById = (id) => {
  return axiosInstance.get(`/fitness-program/${id}`);
};
export const getMyPrograms = () => {
  return axiosInstance.get("/fitness-program/my-program");
};
export const createFitnessProgram = (formData) => {
  return axiosInstance.post("/fitness-program", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const updateOrderStatus = (sessionId, status) => {
  return axiosInstance.put(`/payment/update-status/${sessionId}`, { status });
};
