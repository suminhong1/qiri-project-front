import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/qiri/",
});

// 리뷰글 전체 가져오기
export const getAllReview = async () => {
  return await instance.get("review");
};

// 작성할 리뷰 가져오기
export const getMyMatchings = async (id) => {
  return await instance.get("my_matching/" + id);
};

// 리뷰 저장하기
export const saveReview = async (data) => {
  return await instance.post("reviewWrite", data);
};

// 리뷰 업데이트하기
export const updateReview = async (data) => {
  return await instance.put("reviewUpdate", data);
};
