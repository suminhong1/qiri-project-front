import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/qiri/",
});

// 매칭신청
export const MatchingApply = async (data) => {
  return await instance.post("matching_apply", data);
};

// 신청한 postSEQ 같은유저정보리스트 확인하기
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
