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

export const saveChat = async (data) => {
  return await instance.post("chat/save", data);
}

export const saveChatRoom = async (data) => {
  return await instance.post("chatroom/save/", data);
}

export const leaveChatroom = async (id, code) => {
  return await instance.put("chatroom/leave/", id, code);
}

