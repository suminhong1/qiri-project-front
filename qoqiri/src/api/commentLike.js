import axios from "axios";

const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "http://localhost:8080/qiri/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const postLike = async (data) => {
  return await instance.post("post/comments", data);
};

export const putLike = async (data) => {
  return await instance.put("post/comments", data);
};

export const delLike = async (data) => {
  return await instance.put("post/comments/delete", data);
};
