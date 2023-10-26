import { useParams } from "react-router-dom";
import { createChatRoom, requestMatching } from "../api/chat";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

//매칭신청버튼 누를때 동작할 함수
const test = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.user.token);

  const matchingButton = (postSEQ, id) => {
    requestMatching(postSEQ, id);

    const chatDTO = {
      postSEQ: postSEQ,
    };
    createChatRoom(chatDTO);
    //채팅방생성 및 신청자가 접속하는 기능
    const socket = new SockJS("http://localhost:8080/ws/chat");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: { token },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    stompClient.connect({}, () => {});
  };

  // 채팅발송기능
};

//게시글
