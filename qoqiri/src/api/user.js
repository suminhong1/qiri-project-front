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

// 유저 닉네임 가져오는 API
export const getUserNickname = async (data) => {
  const response = await axios.get(data);
  return response.data;
};
export const EditProfile = async (data) => {
  return await instance.put("editProfile", data);
};
