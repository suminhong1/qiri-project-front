import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import {
  getChatMessage,
  getChatRoomInfo,
  getUserChatRoomInfo,
  joinMessage,
  leaveChatroom,
} from "../api/chat";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { formatSendTime } from "../utils/TimeFormat";

const StyledChatRoom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;

  * {
    white-space: normal;
  }

  .chatroom {
    overflow: hidden;
  }

  .container {
    margin-bottom: -1px;
    padding-left: 20px;
    height: 700px;
    width: 850px;
    min-width: 850px;
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
    width: 850px;
    min-width: 850px;
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
    width: 850px;
    min-width: 850px;
    height: 50px;
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
  const [userChatRoomInfo, setUserChatRoomInfo] = useState("");
  const [loadMessage, setLoadMessage] = useState([]);
  const stompClient = useRef(null);
  const user = useSelector((state) => state.user);

  //어느 채팅방인지 받아오기
  const chatRoomInfoAPI = async () => {
    const result = await getChatRoomInfo(chatRoomId);
    setChatRoomInfo(result.data);
  };

  //현재 채팅방의 메세지들 받아오기
  const chatMessageAPI = async () => {
    const result = await getChatMessage(chatRoomId);
    setLoadMessage(result.data);
  };

  // 현재 채팅방에 참여한 유저정보중 내 정보 받아오기(최초접속 확인용)
  const userChatRoomInfoAPI = async () => {
    const result = await getUserChatRoomInfo(user.id, chatRoomId);
    setUserChatRoomInfo(result.data);
    return result.data;
  };

  // 메세지 발송, 채팅방 참여시 스크롤 하단이동(최하단 요소부터 노출)
  const scrollToBottom = () => {
    const chatContainer = document.getElementById("app");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };

  const chatDTO = {
    id: user.id,
    chatRoomSEQ: chatRoomId,
  };

  useEffect(() => {
    chatRoomInfoAPI();
    chatMessageAPI();
    userChatRoomInfoAPI();
  }, [chatRoomId]);

  useEffect(() => {
    scrollToBottom();
  }, [loadMessage, messages]);

  useEffect(() => {
    chatRoomInfoAPI();
    chatMessageAPI();

    const currentTime = new Date();
    const socket = new SockJS("http://localhost:8080/ws/chat");
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {},
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // 무조건 유저의 채팅방 정보를 받아온 뒤에 작동해야됨!
    // 특정 주소 구독처리(채팅방 구현)
    userChatRoomInfoAPI().then((userChatRoomInfo) => {
      stompClient.current.onConnect = (frame) => {
        stompClient.current.subscribe(
          `/sub/chat/room/${chatRoomId}`,
          (message) => {
            const recv = JSON.parse(message.body);
            recvMessage(recv);
          }
        );

        if (userChatRoomInfo.joinMessageSent == "N") {
          stompClient.current.publish({
            destination: "/pub/chat/message",
            body: JSON.stringify({
              nickname: user.nickname,
              chatRoomSEQ: chatRoomId,
              message: user.nickname + "님이 채팅에 참여하였습니다.",
              sendTime: currentTime.toISOString(),
            }),
          });
          joinMessage(chatDTO);
        }
      };

      stompClient.current.activate();

      return () => {
        if (stompClient.current.active) {
          stompClient.current.deactivate();
        }
      };
    });
  }, [user, chatRoomId]);

  //메세지 발송 부분
  const sendMessage = async () => {
    // 입력한 메시지의 양 끝 공백 제거
    const trimmedMessage = message.trim();

    // 메세지가 비어 있으면 동작하지 않음
    if (!trimmedMessage) {
      return;
    }

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

  // 현재 채팅방에 메세지 발송시 프론트에 표시
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
    const currentTime = new Date();
    stompClient.current.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify({
        nickname: user.nickname,
        chatRoomSEQ: chatRoomId,
        message: user.nickname + "님이 채팅방에서 퇴장하였습니다.",
        sendTime: currentTime.toISOString(),
      }),
    });

    leaveChatroom(chatDTO);
    window.location.reload();
  };

  return (
    <StyledChatRoom>
      <div className="chatroom">
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

        <div className="container" id="app">
          <ul className="list-group">
            {loadMessage
              ?.sort((a, b) => a.chatMessageSeq - b.chatMessageSeq)
              .filter(
                (msg) =>
                  new Date(msg?.sendTime) > new Date(userChatRoomInfo?.joinDate)
              )
              .map((msg) => (
                <li className="list-group-item" key={msg?.chatMessageSEQ}>
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
