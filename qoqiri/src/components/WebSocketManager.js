import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const WebSocketManager = ({ endpoint }) => {
  const stompClient = useRef(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws/" + endpoint);
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {},
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.current.activate();

    return () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.deactivate();
      }
    };
  }, [endpoint]);

  return stompClient.current;
};

export default WebSocketManager;
