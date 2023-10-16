import React, { useState, useEffect } from "react";
import "../css/ApplyForm.css";
import Modal from "./modal";
import son from "../assets/son.jpg";
import { getUser, login } from "../api/user";

const ApplyForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await getUser("user3"); // 해당 주인계정만 나오도록 하기
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
      <div className="ap-header-sign">#category# 카테고리 신청하였습니다</div>

      <div className={`ap-custom-card ${isFlipped ? "flipped" : ""}`}>
        <div className="ap-card-front">
          <div>
            <img
              className="ap-main-image"
              src={son}
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
              <div className="ap-info-value">{userData?.addr}</div>
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
        <Modal
          images={[son]}
          index={currentImageIndex}
          close={handleModalClose}
        />
      )}
    </div>
  );
};

export default ApplyForm;
