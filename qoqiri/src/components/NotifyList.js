import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector } from "react-redux";
import ChatRoomModal from "./ChatRoomModal";
import { useEffect, useState } from "react";
import { getNotifyList } from "../api/notify";

import Date from "../components/Date";
import DetailView from "./DetailView";

const NotifyList = ({ show, handleClose, ...props }) => {
  const user = useSelector((state) => state.user);
  const [notifyList, setNotifyList] = useState([]);
  const [chatRoomSEQ, setChatRoomSEQ] = useState(null);
  const [PostSEQ, setPostSEQ] = useState(null);

  // ChatRoom 모달을 열기 위한 함수
  const handleShowChatRoom = (chatRoomSEQ) => {
    setChatRoomSEQ(chatRoomSEQ);
  };

  // ChatRoom 모달을 닫기 위한 함수
  const handleCloseChatRoom = () => {
    setChatRoomSEQ(null);
  };

  // DetailView 모달을 열기 위한 함수
  const handleShowDetailView = (postSEQ) => {
    setPostSEQ(postSEQ);
  };

  // DetailView 모달을 닫기 위한 함수
  const handleCloseDetailView = () => {
    setPostSEQ(null);
  };

  // 내 알림 리스트 불러오기
  const notifyListAPI = async () => {
    const result = await getNotifyList(user.id);
    setNotifyList(result.data);
  };

  useEffect(() => {
    if (show) {
      notifyListAPI();
    }
  }, [show]);

  // ChatRoom 모달이 열려 있는지 확인
  const isChatRoomModalOpen = chatRoomSEQ !== null;
  // DetailView모달이 열려 있는지 확인
  const isDetailViewModalOpen = PostSEQ !== null;

  return (
    <Offcanvas show={show} onHide={handleClose} {...props}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          내 알림
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {notifyList.map((notify) => (
          <div
            className={`notify_list ${
              notify?.isRead === "Y" ? "read" : "unread"
            }`}
            onClick={() => {
              if (notify?.chatRoom !== null) {
                handleShowChatRoom(notify?.chatRoom?.chatRoomSEQ);
              }
            }}
            key={notify?.notificationMessageSEQ}
          >
            <div className="notify_message">{notify?.message}</div>
            <div className="notify_time">
              <Date postDate={notify?.sentTime} />
            </div>
          </div>
        ))}
        <ChatRoomModal
          show={isChatRoomModalOpen}
          handleClose={handleCloseChatRoom}
          chatRoomSEQ={chatRoomSEQ}
        />
        <DetailView
          show={isDetailViewModalOpen}
          handleClose={handleCloseDetailView}
          selectedPostSEQ={PostSEQ}
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default NotifyList;
