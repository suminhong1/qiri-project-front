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
