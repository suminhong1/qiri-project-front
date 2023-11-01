import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/qiri/",
});

// 백단 서버에 요청하는거

// 게시물 추가
export const addPostAPI = async (data) => {
  //서버 주소와 클라이언트 주소는 다름
  return await instance.post("post", data);
};

// 선택한 카테고리 matchingCategoryInfo 테이블로 저장하는 API
export const addMatchingAPI = async (data) => {
  return await instance.post("matchingCategoryInfo", data);
};

// // 첨부파일 경로와 postSEQ를 postAttachments 테이블로 저장하는 API
export const addAttachmentsAPI = async (formData) => {
  console.log(formData);
  // const response = await instance.post('postAttachments', formData);
  const response = await instance.post("postAttachments", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data; // 서버에서의 응답을 반환?
};

// export const addAttachmentsAPI = async (data, postId) => {
//     return await instance.post('postAttachments', data, postId);
// };

// 게시물 수정
export const editPostAPI = async (data) => {
  return await instance.put("post", data);
};

export const getBoards = async () => {
  return await instance.get("public/board");
};

export const getPostList = async (page, board) => {
  let url = `public/post?page=${page}`;
  // if (board !== null) {
  //     url += `&board=${board}`;
  // }
  return await instance.get(url);
};

export const getPost = async (id) => {
  return await instance.get("public/post/" + id);
};

export const getPlace = async () => {
  return await instance.get("public/place");
};

export const getPlaceType = async () => {
  return await instance.get("public/placeType");
};

export const getComments = async (id) => {
  return await instance.get("public/post/" + id + "/comments");
};

export const getSearch = async (keyword) => {
  return await instance.get("public/post/search/" + keyword);
};

// 리뷰 저장하기
export const saveReview = async (data) => {
  return await instance.post("reviewWrite", data);
};

// 리뷰 업데이트하기
export const updateReview = async (data) => {
  return await instance.put("reviewUpdate", data);
};

//리뷰 삭제하기
export const deleteReview = async (postSEQ) => {
  return await instance.put(`reviewDelete/${postSEQ}`);
};

// 게시글에 신청하기
export const applyToPost = async (userData, userId) => {
  return await instance.post(`post/${userData}/apply`, { userId });
};

// 게시글의 신청자 목록 가져오기
export const getApplicantsForPost = async (userData) => {
  return await instance.get(`post/${userData}/applicants`);
};

// 내활동 리스트 보기
export const getmyList = async (boardSEQ) => {
  let url = `public/post`;
  if (boardSEQ) {
    url += `?board=${boardSEQ}`;
  }
  return await instance.get(url);
};

export const addPostLikeAPI = async (data) => {
  return await instance.post("postLike", data);
};
