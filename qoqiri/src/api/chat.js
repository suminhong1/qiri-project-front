import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/qiri/",
});

export const getChatRoomList = async (id) => {
  return await instance.get("public/chatRooms/" + id);
};

export const getChatRoom = async (id) => {
  return await instance.get("chat/room/" + id);
};

export const createChat = async (data) => {
  return await instance.post("chat/create", data);
};

export const createChatRoom = async (data) => {
  return await instance.post("chatroom/create/", data);
};

export const leaveChatroom = async (id, code) => {
  return await instance.put("chatroom/leave/", id, code);
};

export const requestMatching = async (postSEQ, id) => {
  return await instance.post("/matching/" + postSEQ, id);
};
