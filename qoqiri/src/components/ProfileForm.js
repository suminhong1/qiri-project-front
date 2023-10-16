import React, { useState, useEffect } from "react";
import Modal from "./modal";
import "../css/ProfileForm.css";
import son from "../assets/son.jpg";
import { getUser } from "../api/user";

const ProfileForm = ({ userId }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [userData, setUserData] = useState({ introduction: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await getUser(userId);
      setUserData(response.data);
    };

    fetchUserData();
  }, [userId]);

  const currentUserId = userId; //  현재 접속한 계정  (수정해야함)

  const handleInputChange = (key, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

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
    display: isFlipped || isEditing ? "none" : "block",
    transform: "none",
    cursor: "pointer",
    borderRadius: "4px",
  };

  const customBackButtonStyle = {
    display: isFlipped && !isEditing ? "block" : "none",
    transform: "scale(-1, 1)",
    cursor: "pointer",
    borderRadius: "4px",
  };

  const customBackBtn = {
    display: isFlipped && !isEditing ? "block" : "none", // 아이디가 같지않으면 안보임
    transform: "scale(-1, 1)",
    cursor: "pointer",
    borderRadius: "4px",
  };

  const customSaveButtonStyle = {
    display: isFlipped && isEditing ? "block" : "none", // 편집 모드일 때만 보이게 변경
    transform: "scale(-1, 1)",
    cursor: "pointer",
    borderRadius: "4px",
  };

  const customFrontEditButtonStyle = {
    display: !isFlipped && !isEditing ? "block" : "none",
    transform: "none",
    cursor: "pointer",
    borderRadius: "4px",
  };

  const customFrontSaveButtonStyle = {
    display: !isFlipped && isEditing ? "block" : "none",
    transform: "none",
    cursor: "pointer",
    borderRadius: "4px",
  };

  return (
    <div className="pf-container">
      <div className="pf-header-sign"></div>

      <div className={`pf-custom-card ${isFlipped ? "flipped" : ""}`}>
        <div className="pf-card-front">
          <div>
            <img
              className="pf-main-image"
              src={son}
              alt="User"
              onClick={() => handleImageClick(0)}
            />
          </div>
          <div className="pf-card-body">
            <h1>{userData?.userNickname}</h1>

            <p className="pf-text">{userData.statusMessage}</p>
          </div>
        </div>

        <div className="pf-front-Btn">
          <button
            className="pf-front-infoBtn"
            style={customButtonStyle}
            onClick={handleCardClick}
          >
            프로필 정보보기
          </button>
        </div>
        <div className="pf-card-back">
          <div className="pf-card-body">
            <div className="pf-info-row">
              <div className="pf-info-label">닉네임:</div>
              {isEditing ? (
                <input
                  value={userData?.userNickname}
                  onChange={(e) =>
                    handleInputChange("userNickname", e.target.value)
                  }
                />
              ) : (
                <div className="pf-info-value">{userData?.userNickname}</div>
              )}
            </div>
            <hr />
            <div className="pf-info-row">
              <div className="pf-info-label">성별:</div>
              <div className="pf-info-value">{userData?.gender}</div>
            </div>
            <hr />
            <div className="pf-info-row">
              <div className="pf-info-label">혈액형:</div>
              <div className="pf-info-value">{userData?.bloodType}</div>
            </div>
            <hr />
            <div className="pf-info-row">
              <div className="pf-info-label">지역:</div>
              <div className="pf-info-value">{userData?.addr}</div>
            </div>
            <hr />
            <div className="pf-info-row">
              <div className="pf-info-label">MBTI:</div>
              <div className="pf-info-value">{userData?.mbti}</div>
            </div>
            <hr />
            <div className="pf-info-row">
              <div className="pf-info-label">생일:</div>
              <div className="pf-info-value">{userData?.birthday}</div>
            </div>
            <hr />
            <div className="pf-info-row">
              <div className="pf-info-label">관심사:</div>
              <div className="pf-info-value">{userData?.categorys}</div>
            </div>
          </div>
        </div>

        <div>
          <button
            className="pf-back-infoBtn"
            style={customBackBtn}
            onClick={handleCardClick}
          >
            앞!
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

export default ProfileForm;
