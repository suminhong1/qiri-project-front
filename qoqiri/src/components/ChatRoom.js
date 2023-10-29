import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useParams, useNavigate } from "react-router-dom";
import {
  getChatMessage,
  getChatRoomInfo,
  getUserChatRoomInfo,
  leaveChatroom,
} from "../api/chat";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons";

const StyledChatRoom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 700px; /* 화면 전체 높이를 차지하도록 설정 */

  * {
    white-space: normal;
  }

  .chatroom {
    overflow: hidden;
  }

  .container {
    margin-bottom: -1px;
    padding-left: 20px;
    height: 500px;
    width: 800px;
    min-width: 800px;
    overflow-y: scroll;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-left: 3px solid #e5e5e5;
    border-right: 3px solid #e5e5e5;
  }
  .msgHeader {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .sendTime {
    font-size: 0.8rem;
    color: #808080;
  }

  .list-group {
    margin-top: auto;
    width: 100%;
    max-height: -webkit-fill-available;
  }

  .list-group-item {
    margin-left: -12px;
    margin-right: -12px;
    border-radius: 0px;
    border-left: none;
    border-right: none;
    .chat {
      font-weight: bold;
      margin-bottom: 7px;
      font-size: 1.1rem;
    }
  }

  .form-control {
    border-right: 0px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .inputgroup {
    width: 800px;
    min-width: 800px;
    margin-bottom: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid #e5e5e5;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .input-group-append {
    width: 60px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sendMessageBtn {
    margin-top: auto;
    width: 50px;
    height: 100%;
    background-color: white;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-control {
    height: 50px;
    border: none;
  }

  .roomHeader {
    width: 800px;
    height: 50px;
    margin-top: 50px;
    background-color: #ff7f38;
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 25px;
    align-items: center;
    font-weight: bold;
    font-size: 1.2rem;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .leave {
    width: 65px;
    height: 30px;
    background-color: white;
    border-radius: 15px;
  }

  .leaveBtn {
    margin: auto;
    width: 100%;
    height: 100%;
    border: none;
    font-size: 1rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
  }

  .form-control:focus {
    outline: none !important;
    border: none; /* 추가로 border를 제거하려면 */
    box-shadow: none; /* 추가로 box-shadow를 제거하려면 */
  }

  .container::-webkit-scrollbar {
    width: 8px; /* 스크롤바 너비 조절 */
  }

  .container::-webkit-scrollbar-thumb {
    background-color: #ff7f38; /* 스크롤바 색상 조절 */
    border-radius: 10px; /* 스크롤바 둥글게 만들기 */
  }

  .container::-webkit-scrollbar-thumb:hover {
    background-color: #ff7f38; /* 스크롤바 호버 시 색상 변경 */
  }
`;

const ChatRoom = ({ chatRoomId }) => {
  const [chatRoomInfo, setChatRoomInfo] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userChatRoomInfo, setUserChatRoomInfo] = useState([]);
  const [loadMessage, setLoadMessage] = useState([]);
  const stompClient = useRef(null);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const chatRoomInfoAPI = async () => {
    const result = await getChatRoomInfo(chatRoomId);
    setChatRoomInfo(result.data);
  };

  const chatMessageAPI = async () => {
    const result = await getChatMessage(chatRoomId);
    setLoadMessage(result.data);
  };

  const userChatRoomInfoAPI = async () => {
    const result = await getUserChatRoomInfo(user.id, chatRoomId);
    setUserChatRoomInfo(result.data);
  };

  const scrollToBottom = () => {
    const chatContainer = document.getElementById("app");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };

  useEffect(() => {
    chatRoomInfoAPI();
    chatMessageAPI();
    userChatRoomInfoAPI();
  }, []);

  useEffect(() => {
    chatRoomInfoAPI();
    chatMessageAPI();
    userChatRoomInfoAPI();
  }, [chatRoomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    chatRoomInfoAPI();
    chatMessageAPI();
    userChatRoomInfoAPI();

    const currentTime = new Date();

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
      stompClient.current.subscribe(
        `/sub/chat/room/${chatRoomId}`,
        (message) => {
          const recv = JSON.parse(message.body);
          recvMessage(recv);
        }
      );

      stompClient.current.publish({
        destination: "/pub/chat/message",
        body: JSON.stringify({
          nickname: user.nickname,
          chatRoomSEQ: chatRoomId,
          message: user.nickname + "님이 채팅에 참여하였습니다.",
          sendTime: currentTime.toISOString(),
        }),
      });
    };

    stompClient.current.activate();

    return () => {
      if (stompClient.current.active) {
        stompClient.current.deactivate();
      }
    };
  }, [user, chatRoomId]);

  //메세지 발송 부분
  const sendMessage = async () => {
    const trimmedMessage = message.trim(); // 입력한 메시지의 양 끝 공백을 제거

    // 메세지가 비어 있으면 동작하지 않음
    if (!trimmedMessage) {
      return;
    }

    const currentTime = new Date();

    stompClient.current.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify({
        nickname: user.nickname,
        chatRoomSEQ: chatRoomId,
        message: message,
      }),
    });

    setMessage("");
  };

  // 현재 채팅방에 발송된 메세지 프론트에서 저장
  const recvMessage = (recv) => {
    const currentTime = new Date();
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        nickname: recv.nickname,
        chatRoomSEQ: recv.chatRoomSEQ,
        message: recv.message,
        sendTime: currentTime.toISOString(),
      },
    ]);
  };

  //채팅방 나가기
  const exit = async () => {
    const chatDTO = {
      nickname: user.nickname,
      chatRoomSEQ: chatRoomId,
    };
    leaveChatroom(chatDTO);
    navigate("/");
  };

  // 시간 형식 설정
  const formatSendTime = (sendTime) => {
    const date = new Date(sendTime);
    const options = {
      month: "numeric", // 월
      day: "numeric", // 일
      hour: "numeric", // 시간
      minute: "numeric", // 분
      hour12: true, // 오전/오후 표시
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <StyledChatRoom>
      <div className="chatroom">
        <div>
          <div className="roomHeader">
            <div className="roomName">
              {chatRoomInfo?.post?.postTitle}의 채팅방
            </div>
            <div className="leave">
              <button className="leaveBtn" onClick={exit}>
                나가기
              </button>
            </div>
          </div>
        </div>

        <div className="container" id="app">
          <ul className="list-group">
            {loadMessage
              ?.sort((a, b) => a.chatMessageSeq - b.chatMessageSeq)
              .filter(
                (msg) =>
                  new Date(msg?.sendTime) > new Date(userChatRoomInfo?.joinDate)
              )
              .map((msg) => (
                <li className="list-group-item" key={msg?.chatMessageSeq}>
                  <div className="msgHeader">
                    <div className="chat">{msg?.userInfo?.userNickname}</div>
                    <div className="sendTime">
                      {formatSendTime(msg?.sendTime)}
                    </div>
                  </div>
                  {msg?.message}
                </li>
              ))}
            {messages.map((msg, index) => (
              <li className="list-group-item" key={index}>
                <div className="msgHeader">
                  <div className="chat">{msg?.nickname}</div>
                  <div className="sendTime">
                    {formatSendTime(msg?.sendTime)}
                  </div>
                </div>
                {msg.message}
              </li>
            ))}
          </ul>
        </div>
        <div className="inputgroup">
          <input
            type="text"
            className="form-control"
            value={message}
            placeholder="메세지를 입력해주세요"
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
              <FontAwesomeIcon
                icon={faCircleUp}
                rotation={90}
                style={{ color: "#ff7f38" }}
                size="2xl"
              />
            </button>
          </div>
        </div>
      </div>
    </StyledChatRoom>
  );
};

export default ChatRoom;
