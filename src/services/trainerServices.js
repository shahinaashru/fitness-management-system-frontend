import { axiosInstance } from "../assets/axiosInstance";
export const getProfile = () => {
  return axiosInstance.get("/trainer");
};
export const createProfile = (data) => {
  let url = "/trainer";
  return axiosInstance.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const updateProfile = (data, id) => {
  let url = `/trainer/${id}`;
  return axiosInstance.put(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const addWeeklyPlan = (data) => {
  console.log(data);
  let url = "/activity/add-weeklyplan";
  return axiosInstance.post(url, data);
};
export const getActivities = (date) => {
  return axiosInstance.get(`activity/usersact-trainer/${date}`);
};
export const getTrainerForChat = () => {
  return axiosInstance.get("/trainer/trainer-forchat");
};
export const getTrainers = () => {
  return axiosInstance.get("/trainer/get-trainers");
};
export const getTrainerOrders = () => {
  return axiosInstance.get("payment/trainer-order");
};
export const getDashbordCounts = () => {
  return axiosInstance.get("trainer/dashbord-count");
};
export const getMonthlyEarnings = () => {
  return axiosInstance.get("trainer/monthly-earnings");
};
export const getWeeklyEarnings = () => {
  return axiosInstance.get("trainer/weekly-earnings");
};
export const getDailyEarnings = () => {
  return axiosInstance.get("trainer/daily-earnings");
};
