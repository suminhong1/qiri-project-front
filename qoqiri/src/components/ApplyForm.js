import React, { useState, useEffect } from "react";
import "../css/ApplyForm.css";
import Imgmodal from "./imgmodal";
import defaultimg from "../assets/defaultimg.png";
import { getUser, login } from "../api/user";

const ApplyForm = (userInfo) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await getUser("userid"); // 해당 주인계정만 나오도록 하기
      setUserData(response.data);
    };

    fetchUserData();
  }, []);

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

  const customButtonStyle = {
    display: isFlipped ? "none" : "block",
    transform: "none",
    cursor: "pointer",
    borderRadius: "4px",
  };

  const customBackButtonStyle = {
    display: isFlipped ? "block" : "none",
    transform: "scale(-1, 1)",
    cursor: "pointer",
    borderRadius: "4px",
  };

  return (
    <div className="ap-container">
      <div className="ap-header-sign">
        {userInfo.nickname}님이 카테고리 신청하였습니다
      </div>

      <div className={`ap-custom-card ${isFlipped ? "flipped" : ""}`}>
        <div className="ap-card-front">
          <div>
            <img
              className="ap-main-image"
              src={userData?.profileImage || defaultimg}
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
            className="ap-front-applyBtn"
            style={customButtonStyle}
            onClick={"/"}
          >
            승낙
          </button>
          <button
            className="ap-front-infoBtn"
            style={customButtonStyle}
            onClick={handleCardClick}
          >
            프로필 정보보기
          </button>
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
              <div className="ap-info-value">{userData?.gender}</div>
            </div>
            <hr />
            <div className="ap-info-row">
              <div className="ap-info-label">혈액형:</div>
              <div className="ap-info-value">{userData?.bloodType}</div>
            </div>
            <hr />
            <div className="ap-info-row">
              <div className="ap-info-label">지역:</div>
              <div className="ap-info-value">{userData?.placeTypeName}</div>
            </div>
            <hr />
            <div className="ap-info-row">
              <div className="ap-info-label">MBTI:</div>
              <div className="ap-info-value">{userData?.mbti}</div>
            </div>
            <hr />
            <div className="ap-info-row">
              <div className="ap-info-label">생일:</div>
              <div className="ap-info-value">{userData?.birthday}</div>
            </div>
            <hr />
            <div className="ap-info-row">
              <div className="ap-info-label">관심사:</div>
              <div className="ap-info-value">{userData?.categorys}</div>
            </div>
          </div>
        </div>

        <div>
          <button
            className="ap-back-infoBtn"
            style={customBackButtonStyle}
            onClick={handleCardClick}
          >
            사진보기
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Imgmodal
          images={[userData?.profileImage || defaultimg]}
          index={currentImageIndex}
          close={handleModalClose}
        />
      )}
    </div>
  );
};

export default ApplyForm;
