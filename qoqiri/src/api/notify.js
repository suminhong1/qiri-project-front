import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/qiri/",
});

// 내 알림 리스트 가져오기
export const getNotifyList = async (id) => {
  return await instance.get("public/notify/" + id);
};

// 미확인 알림 갯수 가져오기
export const getUnreadNotify = async (id) => {
  return await instance.get("public/unread_notify/" + id);
};

// 내 모든 알림 제거
export const deleteNotify = async (id) => {
  return await instance.delete("public/delete_notify/" + id);
};

// 알림 확인처리
export const checkNotify = async (id) => {
  return await instance.put("public/check_notify/" + id);
};
