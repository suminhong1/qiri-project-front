import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/qiri/",
});

export const getChatRooms = async () => {
  return await instance.get("chat/rooms");
};

export const getChatRoom = async (id) => {
    return await instance.get("chat/room/" + id);
};

