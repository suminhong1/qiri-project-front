import React, { useState, useEffect } from "react";
import { getChatRoomList } from "../api/chat";
import { useParams } from "react-router-dom";

const ChatList = () => {
  const [chatRoomList, setChatRoomList] = useState([]);
  const { id } = useParams();

  const chatRoomListAPI = async () => {
    const result = await getChatRoomList(id);
    setChatRoomList(result.data);
  };

  useEffect(() => {
    chatRoomListAPI();
  }, []);

  const enterRoom = (chatRoomSEQ) => {
    const sender = prompt("대화명을 입력해 주세요.");
    if (sender !== null && sender !== "") {
      localStorage.setItem("wschat.sender", sender);
      localStorage.setItem("wschat.roomId", chatRoomSEQ);
      window.location.href = `/chatRoom/${chatRoomSEQ}`;
    }
  };

  return (
    <div className="container" id="app">
      <div className="row">
        <div className="col-md-12">
          <h2>참여중 채팅</h2>
        </div>
      </div>
      <ul className="list-group">
        {chatRoomList?.map((chatRoomList) => (
          <li
            key={chatRoomList?.chatRoom.chatRoomSEQ}
            className="list-group-item list-group-item-action"
            onClick={() => enterRoom(chatRoomList?.chatRoom.chatRoomSEQ)}
          >
            {chatRoomList?.chatRoom.post.postTitle}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
