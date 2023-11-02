import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/qiri/",
});

// 리뷰 저장하기
export const saveReview = async (data) => {
  return await instance.post("reviewWrite", data);
};

// 리뷰 업데이트하기
export const updateReview = async (data) => {
  return await instance.put("reviewUpdate", data);
};

// 리뷰 삭제하기
export const deleteReview = async (postSEQ, postTitle) => {
  try {
    // 리뷰 삭제 처리
    await instance.put(`reviewDelete/${postSEQ}`, {
      boardSEQ: 2,
    });
  } catch (error) {
    throw error;
  }
};

// 드롭박스 선택한 post 변경시키기
export const updatePostTitleDropbox = async (postId) => {
  return await instance.put(`/updatePostTitleDropbox/${postId}`);
};
