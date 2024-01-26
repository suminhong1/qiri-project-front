import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/qiri/",
});

// 매칭신청
export const MatchingApply = async (data) => {
  return await instance.post("matching_apply", data);
};

// 특정 게시물의 매칭 신청 유저 리스트보기
export const getMatchingUserInfoByPostSEQ = async (DTO) => {
  return await instance.post("getApplyList", DTO);
};

// 매칭승락
export const matchingAccept = async (data) => {
  return await instance.put("matchingAccept", data);
};

// 매칭 신청자 가리기
export const hideMachingUser = async (data) => {
  return await instance.put("hideMachingUser", data);
};

// 신청자의 매칭정보 받아오기
export const getApplicantUserMatchingInfo = async (postSEQ, userId) => {
  return await instance.get(`check_user/${postSEQ}/${userId}`);
};
