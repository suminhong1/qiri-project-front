import React, { useState, useEffect } from "react";
import Imgmodal from "./imgmodal";
import "../css/ProfileForm.css";
import { getUser } from "../api/user";
import defaultimg from "../assets/defaultimg.png";

const ProfileForm = ({ userId }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [userData, setUserData] = useState({ introduction: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await getUser(userId);
      setUserData(response.data);
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
    if (parts.length !== 2) return "";

    // 첫 번째 부분만 반환 (1992년 11월 11일)
    return parts[0].trim();
  };

  return (
    <div className="pf-container">
      <div className="pf-header-sign"></div>

      <div className={`pf-custom-card ${isFlipped ? "flipped" : ""}`}>
        <div className="pf-card-front">
          <div>
            <img
              className="pf-main-image"
              src={
                userData?.profileImg
                  ? `/uploadprofile/${userData?.profileImg}`
                  : defaultimg
              }
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

              <div className="pf-info-value">{userData?.userNickname}</div>
            </div>
            <hr />
            <div className="pf-info-row">
              <div className="pf-info-label">성별:</div>
              <div className="pf-info-value">
                {userData?.gender || "비공개"}
              </div>
            </div>
            <hr />
            <div className="pf-info-row">
              <div className="pf-info-label">혈액형:</div>
              <div className="pf-info-value">
                {userData?.bloodType || "비공개"}
              </div>
            </div>
            <hr />
            <div className="pf-info-row">
              <div className="pf-info-label">지역:</div>
              <div className="pf-info-value">
                {" "}
                {userData?.placeType?.placeTypeName || "비공개"}
                {}
              </div>
            </div>
            <hr />
            <div className="pf-info-row">
              <div className="pf-info-label">MBTI:</div>
              <div className="pf-info-value">{userData?.mbti || "비공개"}</div>
            </div>
            <hr />
            <div className="pf-info-row">
              <div className="pf-info-label">생일:</div>
              <div className="ap-info-value">
                {formatBirthday(userData?.birthday) || "비공개"}
              </div>
            </div>
            <hr />
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

export default ProfileForm;
