import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useParams } from "react-router-dom";
import { getChatMessage, getChatRoom, getChatRoomInfo } from "../api/chat";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledChatRoom = styled.div`
display: flex;
flex-direction: column;
align-items: center;
min-height: 100vh; /* 화면 전체 높이를 차지하도록 설정 */

  * {
    white-space: normal;
  }

  .container {    
    height: 600px;
    width: 800px;
    overflow-y: scroll;   
    margin-top: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .list-group {
    margin-top: auto;
    width: 100%;
  }

  .input-group {
    width: 800px;
    margin-top: 10px;
  }

  .sendMessageBtn {
    width: 100px;
    height: 100px;
  }
  .container::-webkit-scrollbar {
    width: 8px; /* 스크롤바 너비 조절 */
  }
  
  .container::-webkit-scrollbar-thumb {
    background-color: rgb(199, 199, 199); /* 스크롤바 색상 조절 */
    border-radius: 10px; /* 스크롤바 둥글게 만들기 */
  }
  
  .container::-webkit-scrollbar-thumb:hover {
    background-color: rgb(156, 156, 156); /* 스크롤바 호버 시 색상 변경 */
  }

  
 `

const ChatRoom = () => {
  const [chatRoom, setChatRoom] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatRoomInfo, setChatRoomInfo] = useState([]);
  const [loadMessage, setLoadMessage] = useState([]);
  const { id } = useParams();
  const stompClient = useRef(null);

  const chatRoomAPI = async () => {
    const result = await getChatRoom(id);
    setChatRoom(result.data);
  };

  const chatMessageAPI = async () => {
    const result = await getChatMessage(id);
    setLoadMessage(result.data);
  }

  const chatRoomInfoAPI = async () => {
    const result = await getChatRoomInfo(id, user.id);
    setChatRoomInfo(result.data);
  }

  const user = useSelector((state) => state.user);

  const scrollToBottom = () => {
    const chatContainer = document.getElementById('app');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };


  useEffect(() => {
    chatRoomAPI();
    chatMessageAPI();
    chatRoomInfoAPI();
  }, []);


  useEffect(() => {
    chatRoomAPI();
    chatMessageAPI();
    chatRoomInfoAPI();
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  //메세지 발송 부분
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

  // 현재 채팅방에 발송된 메세지 채팅창에 띄우는 부분
  const recvMessage = (recv) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: recv.type,
        sender: recv.type === "ENTER" ? "[알림]" : recv.sender,
        message: recv.message,
      },
    ]);
  };

  return (
    <StyledChatRoom>
      <div>
        <h2></h2>
      </div>
    <div className="container" id="app">
      <ul className="list-group">  
        {loadMessage
  ?.filter((msg) => new Date(msg.sendTime) > new Date(chatRoomInfo.joinDate))
  .map((msg, index) => (
    <li className="list-loadChat" key={index}>
      {msg?.userInfo?.userNickname} - {msg?.message} - {msg?.sendTime}
    </li>
  ))}
  {messages.map((msg, index) => (
          <li className="list-group-item" key={index}>
            {msg.sender} - {msg.message}
          </li>
        ))}
      </ul>
     
    </div>
    <div className="input-group">
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
            className="sendMessageBtn"
            type="button"
            onClick={sendMessage}
          >
          <FontAwesomeIcon icon="fas fa-location-arrow" style={{color: "#005eff",}} />        
            </button>
        </div>
      </div>
    </StyledChatRoom>
  );
};

export default ChatRoom;
