import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell as solidBell } from "@fortawesome/free-solid-svg-icons";

const rollAnimation = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const fadeOutAnimation = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const StyledDiv = styled.div`
  .realTime_notifyList {
    position: fixed; /* 고정 위치 */
    width: 300px;
    max-width: 100%;
    white-space: nowrap;
    font-weight: bold;
    bottom: 10%; /* 원하는 상단 여백 조정 */
    left: 75%; /* 원하는 우측 여백 조정 */
    display: flex;
    flex-direction: column; /* 아래서부터 위로 쌓이도록 설정 */
  }
  .realTime_notify {
    width: 100%;
    height: 40px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: #ffffff; /* 배경색 */
    margin-top: 15px;
    padding: 10px;
    background-color: white;
    border-radius: 15px;
    border: 0.5px solid rgb(224, 224, 224);
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    position: relative;
    display: flex;
    overflow: hidden; /* 내부의 긴 콘텐츠를 잘라내도록 수정 */
    z-index: 9999; /* 다른 요소들 위로 표시하기 위한 z-index 설정 */
    animation: ${fadeOutAnimation} 2s ease-out 3s forwards;
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
  const [animations, setAnimations] = useState(
    Array(message.length).fill(false)
  );

  const onStop = (index) => {
    setAnimations((prevAnimations) => {
      const newAnimations = [...prevAnimations];
      newAnimations[index] = false;
      return newAnimations;
    });
  };

  const onRun = (index) => {
    setAnimations((prevAnimations) => {
      const newAnimations = [...prevAnimations];
      newAnimations[index] = true;
      return newAnimations;
    });
  };

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

  useEffect(() => {
    // 메시지가 추가될 때마다 타이머를 설정하여 5초 후에 메시지 삭제
    const timer = setTimeout(() => {
      if (message.length > 0) {
        setMessage((prevMessages) => prevMessages.slice(1));
        setAnimations((prevAnimations) => prevAnimations.slice(1));
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

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
        {message.map((msg, index) => (
          <div
            className="realTime_notify"
            key={msg?.notificationMessageSEQ}
            onMouseEnter={() => onRun(index)}
            onMouseLeave={() => onStop(index)}
          >
            <div className={`notify_msg ${animations[index] ? "" : "stop"}`}>
              &nbsp;
              <FontAwesomeIcon
                icon={solidBell}
                style={{
                  height: "15px",
                  color: "red",
                }}
              />
              &nbsp;&nbsp;
              {msg?.message}
            </div>
          </div>
        ))}
      </div>
    </StyledDiv>,
    document.body
  );
};

export default NotifyMessage;
