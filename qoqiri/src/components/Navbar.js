import alarm from "../assets/alarm.gif";
import { useState, useEffect } from "react";
import "../css/Navbar.css";
import { GrHomeRounded } from "react-icons/gr";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import { getChatRoomList } from "../api/chat";
import { Modal } from "react-bootstrap";
import ChatRoom from "./ChatRoom";
import styled from "styled-components";

const CustomModal = styled.Modal``;

function OffCanvasExample({ show, handleClose, ...props }) {
  const [chatRoomList, setChatRoomList] = useState([]);
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [chatRoomId, setChatRoomId] = useState(null);
  const chatRoomListAPI = async () => {
    if (user) {
      const result = await getChatRoomList(user.id);
      setChatRoomList(result.data);
    }
  };

  // ChatRoom 모달을 열기 위한 함수
  const handleShowChatRoom = (chatRoomId) => {
    setChatRoomId(chatRoomId);
  };

  // ChatRoom 모달을 닫기 위한 함수
  const handleCloseChatRoom = () => {
    setChatRoomId(null);
  };

  // ChatRoom 모달이 열려 있는지 확인
  const isChatRoomModalOpen = chatRoomId !== null;

  useEffect(() => {
    chatRoomListAPI();
  }, [show]);

  useEffect(() => {
    chatRoomListAPI();
  }, [id]);

  useEffect(() => {
    chatRoomListAPI();
  }, [user]);

  return (
    <Offcanvas show={show} onHide={handleClose} {...props}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          내 채팅방
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="notice">
          {user &&
            Array.isArray(chatRoomList) &&
            chatRoomList.map((chatRoomList) => (
              <div
                className="notice-link"
                key={chatRoomList?.userChatRoomInfoSeq}
                onClick={() =>
                  handleShowChatRoom(chatRoomList?.chatRoom.chatRoomSEQ)
                }
              >
                <div className="notice-top">
                  <span className="notice-exp">
                    {chatRoomList?.chatRoom.post.postTitle}
                  </span>
                  <span className="notice-time">몇 분 전</span>
                </div>
                <div span className="notice-addr">
                  의 채팅방
                </div>
              </div>
            ))}

          {/* ChatRoom 모달 */}
          <ChatRoomModal
            show={isChatRoomModalOpen}
            handleClose={handleCloseChatRoom}
            chatRoomId={chatRoomId}
          />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

const ChatRoomModal = ({ show, handleClose, chatRoomId }) => {
  if (show && chatRoomId !== null) {
    return (
      <CustomModal
        show={show}
        onHide={handleClose}
        dialogClassName="chat-room-modal" // 모달 창의 클래스를 지정합니다
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {/* 채팅방 이름 또는 제목을 여기에 넣어주세요 */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChatRoom chatRoomId={chatRoomId} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </CustomModal>
    );
  }

  // chatRoomId가 null이거나 show가 false인 경우 모달을 렌더링하지 않음
  return null;
};

const Navbar = () => {
  const location = useLocation();
  const [bell, setBell] = useState([false]);
  const user = useSelector((state) => state.user);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {}, [bell]);

  if (location.pathname === "/Login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <>
      <div className="navbar2">
        <div className="navbar-home">
          <a href="/" className="homeButton">
            <GrHomeRounded />
          </a>
        </div>
        <div className="navbar-menu">
          <a href="/postWrite" className="matchingPost">
            끼리모집
          </a>
          <a href="/matchingBoard" className="matchingSearch">
            끼리찾기
          </a>
          <a href="/myMatching" className="myMatching">
            나의끼리
          </a>
          <a href="/review" className="review">
            끼리후기
          </a>
        </div>
        <div
          className="navbar-alarm"
          onClick={handleShow}
          style={{
            visibility: Object.keys(user).length === 0 ? "hidden" : "visible",
          }}
        >
          <img
            src={alarm}
            style={{ height: "40px", width: "auto" }}
            alt="alarm"
          />
        </div>
      </div>
      <OffCanvasExample show={show} handleClose={handleClose} placement="end" />
    </>
  );
};
export default Navbar;
