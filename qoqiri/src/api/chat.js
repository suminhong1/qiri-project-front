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

export const postMessage = async () => {
  return await instance.post("chatSave/");
};

export const deleteMesaage = async (id) => {
  return await instance.delete("chat/delete/" + id);
};
