import axios from "axios";

const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const postComment = async (data) => {
  return await instance.post("/comments", data);
};

export const putComment = async (data) => {
  return await instance.put("/comments", data);
};

export const delComment = async (id) => {
  return await instance.delete("comments/" + id);
};
