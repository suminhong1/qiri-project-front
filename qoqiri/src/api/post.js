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
export const deleteReview = async (postSeq) => {
  return await instance.put(`reviewDelete/${postSeq}`);
};

// 내활동 목록창 보기
// export const getPostList = async (boardSeq) => {
//   let url = `public/post`;
//   if (boardSeq) {
//     url += `?board=${boardSeq}`;
//   }
//   return await instance.get(url);
// };

export const addPostLikeAPI = async (data) => {
  return await instance.post("postLike", data);
};
