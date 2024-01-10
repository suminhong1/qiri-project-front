import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector } from "react-redux";
import ChatRoomModal from "./ChatRoomModal";
import { useEffect, useState } from "react";
import { getNotifyList } from "../api/notify";
import { formatSendTime, formatSendTimeBasedOnDate } from "../utils/TimeFormat";

const NotifyList = ({ show, handleClose, ...props }) => {
  const user = useSelector((state) => state.user);
  const [notifyList, setNotifyList] = useState([]);
  const [chatRoomSEQ, setChatRoomSEQ] = useState(null);

  // ChatRoom 모달을 열기 위한 함수
  const handleShowChatRoom = (chatRoomSEQ) => {
    setChatRoomSEQ(chatRoomSEQ);
  };

  // ChatRoom 모달을 닫기 위한 함수
  const handleCloseChatRoom = () => {
    setChatRoomSEQ(null);
  };

  // 내 알림 리스트 불러오기
  const notifyListAPI = async () => {
    const result = await getNotifyList(user.id);
    setNotifyList(result.data);
    console.log(notifyList);
  };

  useEffect(() => {
    if (show) {
      notifyListAPI();
    }
  }, [show]);

  // ChatRoom 모달이 열려 있는지 확인
  const isChatRoomModalOpen = chatRoomSEQ !== null;

  return (
    <Offcanvas show={show} onHide={handleClose} {...props}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          내 알림
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {notifyList.map((notify) => (
          <div className="notify_list">
            <div key={notify?.notificationMessageSEQ}>
              <div className="notify_message">{notify?.message}</div>
              <div className="notify_time">
                {formatSendTime(notify?.sentTime)}
              </div>
            </div>
          </div>
        ))}
        <ChatRoomModal
          show={isChatRoomModalOpen}
          handleClose={handleCloseChatRoom}
          chatRoomSEQ={chatRoomSEQ}
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default NotifyList;
