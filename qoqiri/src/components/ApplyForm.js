import React, { useState, useEffect } from "react";
import Imgmodal from "./imgmodal";
import "../css/ApplyForm.css";
import { getUser } from "../api/user";
import defaultimg from "../assets/defaultimg.png";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { enterChatRoom } from "../api/chat";
import { matchingAccept, hideMachingUser } from "../api/matching";
import ChatRoomModal from "./ChatRoomModal";
import { asyncChatRooms } from "../store/chatRoomSlice";

const ApplyForm = ({ userId }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userData, setUserData] = useState({ introduction: "" });
  const [chatRoomSEQ, setChatRoomSEQ] = useState(null);
  const dispatch = useDispatch();
  const { postSEQ } = useParams();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        // 유효하지 않은 userId 값 체크
        console.error("Invalid userId:", userId);
        console.log(userData);
        return;
      }
      try {
        const response = await getUser(userId);
        setUserData(response.data);
      } catch (error) {
        console.error("API 호출 에러:", error);
      }
    };
    fetchUserData();
  }, [userId]);
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };
  const handleImageClick = (index) => {
    setIsModalOpen(true);
    setCurrentImageIndex(index);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // ChatRoom 모달을 닫기 위한 함수
  const handleCloseChatRoom = () => {
    setChatRoomSEQ(null);
  };

  // ChatRoom 모달이 열려 있는지 확인
  const isChatRoomModalOpen = chatRoomSEQ !== null;

  const ChatDTO = {
    id: user.id,
    postSEQ: postSEQ,
    applicantId: userId,
  };
  const chatStart = async () => {
    const result = await enterChatRoom(ChatDTO);
    await setChatRoomSEQ(result.data.chatRoom.chatRoomSEQ);
    await dispatch(asyncChatRooms(user.id));
  };
  const matchingAcceptAPI = () => {
    matchingAccept(ChatDTO);
    window.location.reload();
  };
  const hideMatchingUser = () => {
    hideMachingUser(ChatDTO);
    window.location.reload();
  };
  const customButtonStyle = {
    display: isFlipped ? "none" : "block",
    transform: "none",
    cursor: "pointer",
    borderRadius: "4px",
  };
  const customBackBtn = {
    display: isFlipped ? "block" : "none", // 아이디가 같지않으면 안보임
    transform: "scale(-1, 1)",
    cursor: "pointer",
    borderRadius: "4px",
  };
  const formatBirthday = (birthday) => {
    if (!birthday) return "";
    const parts = birthday.split("T");
    if (parts.length !== 2) return ""; // unexpected format
    // 첫 번째 부분만 반환 (1992년 11월 11일)
    return parts[0].trim();
  };
  return (
    <div className="ap-container">
      <ChatRoomModal
        show={isChatRoomModalOpen}
        handleClose={handleCloseChatRoom}
        chatRoomSEQ={chatRoomSEQ}
      />
      <div className="ap-header-sign"></div>
      <div className={`ap-custom-card ${isFlipped ? "flipped" : ""}`}>
        <div className="ap-card-front">
          <div>
            <img
              className="ap-main-image"
              src={
                userData?.profileImg
                  ? `/uploadprofile/${userData?.profileImg}`
                  : defaultimg
              }
              alt="User"
              onClick={() => handleImageClick(0)}
            />
          </div>
          <div className="ap-card-body">
            <h1>{userData?.userNickname}</h1>
            <p className="ap-text">{userData?.statusMessage}</p>
          </div>
        </div>
        <div className="ap-front-Btn">
          <button
            className="ap-front-infoBtn"
            style={customButtonStyle}
            onClick={handleCardClick}
          >
            프로필 정보
          </button>
          <div className="ap-bottomBtn">
            <button
              className="ap-front-chatBtn"
              onClick={chatStart}
              style={customButtonStyle}
            >
              채팅
            </button>
            <button
              className="ap-front-applyBtn"
              style={customButtonStyle}
              onClick={matchingAcceptAPI}
            >
              승낙
            </button>
          </div>
        </div>
        <div className="ap-card-back">
          <div className="ap-card-body">
            <div className="ap-info-row">
              <div className="ap-info-label">닉네임:</div>
              <div className="ap-info-value">{userData?.userNickname}</div>
            </div>
            <hr />
            <div className="ap-info-row">
              <div className="ap-info-label">성별:</div>
              <div className="ap-info-value">
                {userData?.gender || "비공개"}
              </div>
            </div>
            <hr />
            <div className="ap-info-row">
              <div className="ap-info-label">혈액형:</div>
              <div className="ap-info-value">
                {userData?.bloodType || "비공개"}
              </div>
            </div>
            <hr />
            <div className="ap-info-row">
              <div className="ap-info-label">지역:</div>
              <div className="ap-info-value">
                {userData?.placeType?.placeTypeName || "비공개"}
              </div>
            </div>
            <hr />
            <div className="ap-info-row">
              <div className="ap-info-label">MBTI:</div>
              <div className="ap-info-value">{userData?.mbti || "비공개"}</div>
            </div>
            <hr />
            <div className="ap-info-row">
              <div className="ap-info-label">생일:</div>
              <div className="ap-info-value">
                {formatBirthday(userData?.birthday) || "비공개"}
              </div>
            </div>
            <hr />
          </div>
        </div>
        <div>
          <button className="ap-closeButton" onClick={hideMatchingUser}>
            잠깐 가릴게요
          </button>
          <button
            className="ap-back-infoBtn"
            style={customBackBtn}
            onClick={handleCardClick}
          >
            앞!
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Imgmodal
          images={[
            userData?.profileImg
              ? `/uploadprofile/${userData?.profileImg}`
              : defaultimg,
          ]}
          index={currentImageIndex}
          close={handleModalClose}
        />
      )}
    </div>
  );
};
export default ApplyForm;
