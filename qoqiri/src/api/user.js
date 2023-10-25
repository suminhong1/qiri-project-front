import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/qiri/userInfo/",
});

export const login = async (data) => {
  return await instance.post("signin", data);
};

export const getUser = async (userId) => {
  const response = await instance.get(`${userId}`);
  return response;
};

export const signUp = async (data) => {
  return await instance.post("signUp", data);
};

export const findIdByEmail = async (data) => {
  return await instance.get("findIdByEmail", data);
};
