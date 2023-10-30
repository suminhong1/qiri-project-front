import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/qiri/",
});

export const postMatchingUserInfo = async (data) => {
  return await instance.post("MatchingUserInfo", data);
};

export const ApplyUserInfo = async (data) => {
  return await instance.post("ApplyUserInfo", data);
};
