import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/qiri/",
});

export const getLike = async (id) => {
  return await instance.get("commentLike/" + id);
};

export const postLike = async (data) => {
  return await instance.post("commentLike", data);
};

export const delLike = async (id) => {
  return await instance.put("commentLike/" + id);
};
