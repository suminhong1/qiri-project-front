import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/qiri/",
});

// 백단 서버에 요청하는거

export const addPost = async (data) => {
  //서버 주소와 클라이언트 주소는 다름
  return await instance.post("postWrite", data);
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

export const getThema = async (id) => {
  return await instance.get("public/post/" + id + "/thema");
};

export const getComments = async (id) => {
  return await instance.get("public/post/" + id + "/comment");
};

export const getSearch = async (keyword) => {
  return await instance.get("public/post/search/" + keyword);
};

export const saveReview = async (data) => {
  return await instance.post("reviews", data);
};

export const addPostLike = async (data) => {
  return await instance.post("postLike", data);
};
