import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/qiri/",
});
// 내가 참여중인 채팅방 리스트 가져오기
export const getChatRoomList = async (id) => {
  return await instance.get("public/chatRooms/" + id);
};
// 채팅방 정보 가져오기
export const getChatRoomInfo = async (id) => {
  return await instance.get("chat/room/" + id);
};

//참여중인 채팅방의 내 참여정보 가져오기
export const getUserChatRoomInfo = async (userId, code) => {
  return await instance.get(`/public/chatRoomInfo/${userId}/${code}`);
};

// 채팅방의 채팅보기
export const getChatMessage = async (id) => {
  return await instance.get("chat/room/message/" + id);
};

// 채팅방 만들기
export const createChatRoom = async (data) => {
  return await instance.post("chatroom/create/", data);
};

// 채팅방나가기 및 참여자 없는 채팅방 정보 자동 삭제
export const leaveChatroom = async (data) => {
  return await instance.put("chatroom/leave", data);
};

// 매칭신청정보 저장
export const requestMatching = async (postSEQ, id) => {
  return await instance.post("/matching/" + postSEQ, id);
};
