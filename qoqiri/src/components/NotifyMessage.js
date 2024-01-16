import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import styled, { keyframes } from "styled-components";

const rollAnimation = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const StyledDiv = styled.div`
  .realTime_notifyList {
    position: fixed; /* 고정 위치 */
    width: 350px;
    max-width: 100%;
    height: 400px;
    white-space: nowrap;
    font-weight: bold;
    bottom: 10%; /* 원하는 상단 여백 조정 */
    left: 80%; /* 원하는 우측 여백 조정 */
    z-index: 9999; /* 다른 요소들 위로 표시하기 위한 z-index 설정 */
    display: flex;
    flex-direction: column-reverse; /* 아래서부터 위로 쌓이도록 설정 */
  }
  .realTime_notify {
    width: 100%;
    height: 40px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: #ffffff; /* 배경색 */
    padding: 10px; /* 패딩 조정 */
    border: 1px solid #ccc; /* 테두리 스타일 설정 */
    border-radius: 5px; /* 둥근 테두리 설정 */
    position: relative;
    display: flex; /* 내부 요소를 가로로 나열하기 위해 추가 */
    overflow: hidden; /* 내부의 긴 콘텐츠를 잘라내도록 수정 */
  }

  .notify_msg {
    width: 300%;
    height: 100%;
    display: inline-block;
    animation: ${rollAnimation} 5s linear infinite;
  }

  .stop {
    animation-play-state: paused;
  }
`;

const NotifyMessage = () => {
  const stompClient = useRef(null);
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState([]);
  const [animate, setAnimate] = useState(false);

  const onStop = () => setAnimate(false);
  const onRun = () => setAnimate(true);

  useEffect(() => {
    if (user !== null) {
      const socket = new SockJS("http://localhost:8080/ws/notification");
      stompClient.current = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {}, // 여기서 오타를 수정했습니다
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      stompClient.current.onConnect = (frame) => {
        stompClient.current.subscribe(
          `/sub/notification/${user.id}`,
          (message) => {
            const recv = JSON.parse(message.body);
            recvMessage(recv);
          }
        );
      };

      stompClient.current.activate();

      // 로그아웃시 연결정리
      return () => {
        if (stompClient.current && stompClient.current.connected) {
          stompClient.current.deactivate();
        }
      };
    }
  }, [user]);

  const recvMessage = (recv) => {
    // 받은 메시지 처리
    setMessage((prevMessages) => [
      ...prevMessages,
      {
        notificationMessageSEQ: recv.notificationMessageSEQ,
        message: recv.message,
      },
    ]);
  };

  return ReactDOM.createPortal(
    <StyledDiv>
      <div className="realTime_notifyList">
        {/* {message.map((msg) => ( */}
        <div
          className="realTime_notify"
          //   key={msg?.notificationMessageSEQ}
          onMouseEnter={onRun}
          onMouseLeave={onStop}
        >
          <div className={`notify_msg ${animate ? "" : "stop"}`}>
            dassadadsdsa알림테스트dsadsadasdasdsadsads
          </div>
        </div>
        {/* ))} */}
      </div>
    </StyledDiv>,
    document.body
  );
};

export default NotifyMessage;
