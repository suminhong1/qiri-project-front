import Offcanvas from "react-bootstrap/Offcanvas";
import { getChatRoomUserList } from "../api/chat";
import ChatRoomModal from "./ChatRoomModal";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { formatSendTimeBasedOnDate } from "../utils/TimeFormat";

const ChatList = ({ show, handleClose, ...props }) => {
  const user = useSelector((state) => state.user); // 내정보
  const chatRoomList = useSelector((state) => state.chatRoom); // 내가 참여중인 채팅방 리스트

  const [chatRoomUserList, setChatRoomUserList] = useState([]);
  const [chatRoomSEQ, setChatRoomSEQ] = useState(null);

  // 내가 참여중인 채팅방 리스트를 통해 참여중인 채팅방의 참여자 조회
  const chatRoomUserListAPI = async (chatRoomSEQ) => {
    const result = await getChatRoomUserList(chatRoomSEQ);
    setChatRoomUserList((prev) => {
      return { ...prev, [chatRoomSEQ]: result.data };
    });
  };

  // ChatRoom 모달을 열기 위한 함수
  const handleShowChatRoom = (chatRoomSEQ) => {
    setChatRoomSEQ(chatRoomSEQ);
  };

  // ChatRoom 모달을 닫기 위한 함수
  const handleCloseChatRoom = () => {
    setChatRoomSEQ(null);
  };

  useEffect(() => {
    if (show) {
      chatRoomList.forEach(async (chatRoom) => {
        await chatRoomUserListAPI(chatRoom?.chatRoom?.chatRoomSEQ);
      });
    }
  }, [show]);

  // ChatRoom 모달이 열려 있는지 확인
  const isChatRoomModalOpen = chatRoomSEQ !== null;

  return (
    <Offcanvas show={show} onHide={handleClose} {...props}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          내 채팅방
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="chatlist">
          {user &&
            Array.isArray(chatRoomList) &&
            chatRoomList.map((chatRoom) => {
              const chatRoomSEQ = chatRoom?.chatRoom?.chatRoomSEQ;
              const userList = chatRoomUserList[chatRoomSEQ] || [];
              return (
                <div
                  className="chat-link"
                  key={chatRoom?.userChatRoomInfoSeq}
                  onClick={() => handleShowChatRoom(chatRoomSEQ)}
                >
                  <div className="chat-top">
                    <div className="chat-exp">
                      {chatRoom?.chatRoom?.post?.postTitle}
                    </div>
                    <div className="chat-time">
                      {formatSendTimeBasedOnDate(chatRoom?.joinDate)}
                    </div>
                  </div>
                  <div className="chat-addr">
                    {userList?.map((user) => (
                      <span key={user?.userChatRoomInfoSeq}>
                        {user?.userInfo?.userNickname}&nbsp;
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          <ChatRoomModal
            show={isChatRoomModalOpen}
            handleClose={handleCloseChatRoom}
            chatRoomSEQ={chatRoomSEQ}
          />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ChatList;
