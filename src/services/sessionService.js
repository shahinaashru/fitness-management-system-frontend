import { axiosInstance } from "../assets/axiosInstance";
export const createSesion = (data) => {
  let url = "/personal-session";
  return axiosInstance.post(url, data);
};
export const getMySessions = () => {
  return axiosInstance.get("/personal-session/my");
};
export const getMySessionWithId = (id) => {
  return axiosInstance.get(`/personal-session/session/${id}`);
};
export const getTrainerSessions = () => {
  return axiosInstance.get("/personal-session/trainer-session");
};
export const getBookedSessions = () => {
  return axiosInstance.get("/personal-session/booked-sessions");
};
export const getTodaysSessions = () => {
  return axiosInstance.get("/personal-session/today-sessions");
};
export const updateSessionStatus = (sessionId, status) => {
  return axiosInstance.put(`/personal-session/status/${sessionId}`, { status });
};
export const makePaymentOnStripe = (body) => {
  return axiosInstance.post(`/personal-session/session-payment`, body);
};
export const updateSessionPaymentStatus = (dbSessionId, status) => {
  return axiosInstance.put(`/personal-session/make-paid/${dbSessionId}`, {
    status,
  });
};
