import { axiosInstance } from "../assets/axiosInstance";
export const getUsers = () => {
  return axiosInstance.get("/user/users");
};
export const getUsersByOrder = () => {
  return axiosInstance.get("/user/usersby-order");
};
export const getChatUsersUnderTrainer = () => {
  return axiosInstance.get("/user/chatusers-trainer");
};
export const getTrainers = () => {
  return axiosInstance.get("/trainer");
};
export const getFitnessData = () => {
  return axiosInstance.get("/fitness-program");
};
export const doRegister = (data) => {
  let url = "/auth/register";
  return axiosInstance.post(url, data);
};
export const doLogin = (data) => {
  let url = "/auth/login";
  return axiosInstance.post(url, data);
};
export const doLogout = () => {
  let url = "/auth/logout";
  return axiosInstance.post(url);
};
export const createUser = (data) => {
  let url = "/admin/create-user";
  return axiosInstance.post(url, data);
};
export const createProfile = (data) => {
  let url = "/user";
  return axiosInstance.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const updateProfile = (data, id) => {
  let url = `/user/${id}`;
  return axiosInstance.put(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const getProfile = () => {
  return axiosInstance.get("/user");
};
export const getusersCountUnderTrainer = () => {
  return axiosInstance.get("/user/users-count");
};
export const makePaymentOnStripe = (body) => {
  return axiosInstance.post(`/payment/makepayment`, body);
};
export const changeOrderStatus = (body) => {
  return axiosInstance.post(`/payment/change-status`, body);
};
export const getWeeklyPlan = () => {
  return axiosInstance.get("activity/get-weeklyplan");
};
export const getUserOrders = () => {
  return axiosInstance.get("payment/my-order");
};
export const getFilteredWeeklyPlan = (userId, day) => {
  const params = {};
  if (userId) params.user = userId;
  if (day) params.day = day;

  return axiosInstance.get("activity/get-filtered-weeklyplan", { params });
};
export const addDailyActivity = (data) => {
  return axiosInstance.post("/activity", data);
};
export const getUserDashboardTopData = () => {
  return axiosInstance.get("user/dashboard-topdata");
};
export const getTodaysActivity = () => {
  return axiosInstance.get("user/today-activity");
};
export const getActivePrograms = () => {
  return axiosInstance.get("user/active-programs");
};
