import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/qiri/",
});

// 백단 서버에 요청하는거

export const addPost = async (data) => {
  return await instance.post("post", data);
};

export const getBoards = async () => {
  return await instance.get("public/board");
};

export const getPostList = async (page, board) => {
  let url = `public/post?page=${page}`;
  if (board !== null) {
    url += `&board=${board}`;
  }
  return await instance.get(url);
};

export const getPost = async (id) => {
  return await instance.get("public/post/" + id);
};

export const getComments = async (id) => {
  return await instance.get("public/post/" + id + "/comments");
};

export const getSearch = async (keyword) => {
  return await instance.get("public/post/search/" + keyword);
};

export const saveReview = async (data) => {
  return await instance.post("reviews", data);
};
