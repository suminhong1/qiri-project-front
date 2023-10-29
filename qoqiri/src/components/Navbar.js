import alarm from "../assets/alarm.gif";
import { useState, useEffect } from "react";
import "../css/Navbar.css";
import { GrHomeRounded } from "react-icons/gr";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import { getChatRoomList, getChatRoomUserList } from "../api/chat";
import { Modal } from "react-bootstrap";
import ChatRoom from "./ChatRoom";
import styled from "styled-components";

const CustomModal = styled(Modal)`
  & .modal-dialog {
    min-width: 900px;
    min-height: 900px;
  }

  & .modal-content {
    height: 900px;
  }
  & .modal-body {
  }
`;

const OffCanvas = ({ show, handleClose, ...props }) => {
  const [chatRoomList, setChatRoomList] = useState([]);
  const [chatRoomUserList, setChatRoomUserList] = useState([]);
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [chatRoomId, setChatRoomId] = useState(null);
  const chatRoomListAPI = async () => {
    if (user) {
      const result = await getChatRoomList(user.id);
      setChatRoomList(result.data);
    }
  };

  const chatRoomUserListAPI = async (chatRoomSEQ) => {
    if (user) {
      const result = await getChatRoomUserList(chatRoomSEQ);
      setChatRoomUserList(result.data);
    }
  };

  // ChatRoom 모달을 열기 위한 함수
  const handleShowChatRoom = (chatRoomId) => {
    setChatRoomId(chatRoomId);
    chatRoomListAPI(chatRoomId);
    console.log(chatRoomUserList);
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
                  handleShowChatRoom(chatRoomList?.chatRoom?.chatRoomSEQ)
                }
              >
                <div className="notice-top">
                  <div className="notice-exp">
                    {chatRoomList?.chatRoom?.post?.postTitle}
                  </div>
                  <div className="notice-time">몇 분 전</div>
                </div>
                <div className="notice-addr">의 채팅방</div>
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
};

const ChatRoomModal = ({ show, handleClose, chatRoomId }) => {
  if (show && chatRoomId !== null) {
    return (
      <CustomModal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <ChatRoom chatRoomId={chatRoomId} />
        </Modal.Body>
      </CustomModal>
    );
  }

  // chatRoomId가 null이거나 show가 false인 경우 모달을 렌더링하지 않음
  return null;
};

const Navbar = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      <OffCanvas show={show} handleClose={handleClose} placement="end" />
    </>
  );
};
export default Navbar;
