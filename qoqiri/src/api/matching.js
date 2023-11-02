import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/qiri/",
});

export const postMatchingUserInfo = async (data) => {
  return await instance.post("MatchingUserInfo", data);
};

// 수락유저 정보 DB 저장하기
export const ApplyUserInfo = async (data) => {
  return await instance.post("ApplyUserInfo", data);
};

// 신청한 postSEQ 같은유저정보리스트 확인하기
export const getMatchingUserInfoByPostSEQ = async (postSEQ) => {
  return await instance.get(`getApplyList/${postSEQ}`);
};

// 매칭승락
export const matchingAccept = async (data) => {
  return await instance.put("/matchingAccept", data);
};

// // 게시물의 post_title_dropbox 값을 'Y'로 변경하는 API
// export const updatePostTitleDropbox = async (postSEQ) => {
//   return await instance.put(`updateDropdownTitle/${postSEQ}`);
// };

// // 게시물의 post_title_dropbox 값을 'N'으로 변경하는 API
// export const resetPostTitleDropbox = async (postSEQ) => {
//   return await instance.put(`resetDropdownTitle/${postSEQ}`);
// };
