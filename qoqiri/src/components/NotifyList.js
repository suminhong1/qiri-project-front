import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector } from "react-redux";
import ChatRoomModal from "./ChatRoomModal";
import { useEffect, useState } from "react";
import { getNotifyList } from "../api/notify";

import Date from "../components/Date";
import DetailView from "./DetailView";

const NotifyList = ({ show, handleClose, ...props }) => {
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [notifyList, setNotifyList] = useState([]);
  const [chatRoomSEQ, setChatRoomSEQ] = useState(null);
  const [postSEQ, setPostSEQ] = useState(null);

  // ChatRoom 모달을 열기 위한 함수
  const handleShowChatRoom = (chatRoomSEQ) => {
    setChatRoomSEQ(chatRoomSEQ);
  };

  // ChatRoom 모달을 닫기 위한 함수
  const handleCloseChatRoom = () => {
    setChatRoomSEQ(null);
  };

  // DetailView 모달 관리 함수
  const closeModal = () => {
    setIsOpen(false);
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
  const isDetailViewModalOpen = postSEQ !== null;

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
              } else if (notify?.post !== null && notify?.chatRoom == null) {
                setPostSEQ(notify?.post?.postSEQ);
                setIsOpen(!isOpen);
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
        {isOpen && (
          <div className="Matching-modal-main">
            <div className="Matching-modal-overlay">
              <div className="Matching-modal">
                <div className="close-button" onClick={closeModal}>
                  &times;
                </div>
                <DetailView selectedPostSEQ={postSEQ} />
              </div>
            </div>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default NotifyList;
