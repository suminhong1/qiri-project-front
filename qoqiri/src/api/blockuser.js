import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/qiri/",
});

export const postBlockUser = async (sendUserInfo) => {
  return await instance.post("blockUsers", sendUserInfo);
};

export const getBlockUser = async (id) => {
  return await instance.get(`blockUsers/${id}`);
};
