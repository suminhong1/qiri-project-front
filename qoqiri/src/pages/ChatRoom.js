import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useParams } from "react-router-dom";
import { getChatRoom } from "../api/chat";
import { useSelector } from "react-redux";

const ChatRoom = () => {
  const [chatRoom, setChatRoom] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { id } = useParams();
  const stompClient = useRef(null);

  const chatRoomAPI = async () => {
    const result = await getChatRoom(id);
    setChatRoom(result.data);
  };

  const user = useSelector((state) => state.user);

  useEffect(() => {
    chatRoomAPI();
  }, []);

  useEffect(() => {
    chatRoomAPI();
  }, [id]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws/chat");
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {},
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.current.onConnect = (frame) => {
      console.log("Connected: " + frame);
      stompClient.current.subscribe(`/sub/chat/room/${id}`, (message) => {
        const recv = JSON.parse(message.body);
        recvMessage(recv);
      });

      stompClient.current.publish({
        destination: "/pub/chat/message",
        body: JSON.stringify({
          nickname: user.nickname,
          chatRoomSEQ: id,
          message: user.nickname + "님이 채팅에 참가하였습니다.",
        }),
      });
    };

    stompClient.current.activate();

    return () => {
      if (stompClient.current.active) {
        stompClient.current.deactivate();
      }
    };
  }, [id]);

  const sendMessage = async () => {
    stompClient.current.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify({
        nickname: user.nickname,
        chatRoomSEQ: id,
        message: message,
      }),
    });
    setMessage("");
  };

  const recvMessage = (recv) => {
    setMessages((prevMessages) => [
      {
        type: recv.type,
        sender: recv.type === "ENTER" ? "[알림]" : recv.sender,
        message: recv.message,
      },
      ...prevMessages,
    ]);
  };

  return (
    <div className="container" id="app">
      <div>
        <h2>{chatRoom?.chatRoomSEQ}</h2>
      </div>
      <div className="input-group">
        <div className="input-group-prepend">
          <label className="input-group-text">내용</label>
        </div>
        <input
          type="text"
          className="form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={sendMessage}
          >
            보내기
          </button>
        </div>
      </div>
      <ul className="list-group">
        {messages.map((msg, index) => (
          <li className="list-group-item" key={index}>
            {msg.sender} - {msg.message}
          </li>
        ))}
      </ul>
      <div></div>
    </div>
  );
};

export default ChatRoom;
