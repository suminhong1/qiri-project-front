import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/qiri/",
});

export const getCategories = async () => {
  return await instance.get("public/category");
};
