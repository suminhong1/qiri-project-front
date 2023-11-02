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
  const response = await instance.post("postAttachments", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data; // 서버에서의 응답을 반환?
};

// postAttachments 전체 조회
export const getAttachments = async (id) => {
  return await instance.get("postAttachments/" + id);
};

// 게시물 수정
export const editPostAPI = async (id) => {
  return await instance.put("post", id);
};

// 선택한 카테고리 수정
export const editMatchingAPI = async (data) => {
  return await instance.put("matchingCategoryInfo", data);
};

// 첨부 파일 수정
export const editAttachmentsAPI = async (formData) => {
  console.log(formData);
  const response = await instance.put("postAttachments", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getMatchCate = async (id) => {
  // 매칭카테고리인포
  // return await instance.get('public/post/' + id + '/matchingCategoryInfo');
  return await instance.get("matchingCategoryInfo/" + id);
};

export const getAttach = async (id) => {
  // 첨부파일
  return await instance.get("postAttachments/" + id);
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

//카테고리타입SEQ받아서 해당하는 POST가져오기
export const getPostsByCategoryType = async (code) => {
  return await instance.get("post/categoryType/" + code);
};
