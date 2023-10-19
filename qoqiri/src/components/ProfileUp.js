import React, { useState, useEffect } from "react";
import Imgmodal from "./imgmodal";
import "../css/ProfileUp.css";
import defaultimg from "../assets/defaultimg.png";
import { getUser, signUp } from "../api/user";

const ProfileUp = ({ userId }) => {
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

  const handleEditClick = () => {
    setIsEditing(true); // 편집 모드 활성화
  };

  const handleSaveClick = async () => {
    setIsEditing(false); // 편집 모드 종료
    try {
      // 변경된 데이터를 API를 통해 서버로 전송
      await signUp(currentUserId, userData);
      alert("프로필이 성공적으로 업데이트되었습니다.");
    } catch (error) {
      alert("프로필 업데이트 중 오류가 발생했습니다.");
    }
  };

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
    <div className="pfU-container">
      <div className="pfU-header-sign"></div>

      <div className={`pfU-custom-card ${isFlipped ? "flipped" : ""}`}>
        <div className="pfU-card-front">
          <div>
            <img
              className="pfU-main-image"
              src={userData?.profileImage || defaultimg}
              alt="User"
              onClick={() => handleImageClick(0)}
            />
          </div>
          <div className="pfU-card-body">
            <h1>{userData?.userNickname}</h1>

            <p className="pfU-text">{userData.statusMessage}</p>
          </div>
          {currentUserId === userData?.userId && !isEditing && (
            <button
              className="pfU-front-editBtn"
              style={customFrontEditButtonStyle}
              onClick={handleEditClick}
            >
              프로필 수정
            </button>
          )}
          {isEditing && (
            <button
              className="pfU-front-saveBtn"
              style={customFrontSaveButtonStyle}
              onClick={handleSaveClick}
            >
              저장
            </button>
          )}
        </div>

        <div className="pfU-front-Btn">
          <button
            className="pfU-front-infoBtn"
            style={customButtonStyle}
            onClick={handleCardClick}
          >
            프로필 정보보기
          </button>
        </div>
        <div className="pfU-card-back">
          <div className="pfU-card-body">
            <div className="pfU-info-row">
              <div className="pfU-info-label">닉네임:</div>
              {isEditing ? (
                <input
                  value={userData?.userNickname}
                  onChange={(e) =>
                    handleInputChange("userNickname", e.target.value)
                  }
                />
              ) : (
                <div className="pfU-info-value">{userData?.userNickname}</div>
              )}
            </div>
            <hr />
            <div className="pfU-info-row">
              <div className="pfU-info-label">성별:</div>
              <div className="pfU-info-value">{userData?.gender}</div>
            </div>
            <hr />
            <div className="pfU-info-row">
              <div className="pfU-info-label">혈액형:</div>
              <div className="pfU-info-value">{userData?.bloodType}</div>
            </div>
            <hr />
            <div className="pfU-info-row">
              <div className="pfU-info-label">지역:</div>
              <div className="pfU-info-value">{userData?.addr}</div>
            </div>
            <hr />
            <div className="pfU-info-row">
              <div className="pfU-info-label">MBTI:</div>
              <div className="pfU-info-value">{userData?.mbti}</div>
            </div>
            <hr />
            <div className="pfU-info-row">
              <div className="pfU-info-label">생일:</div>
              <div className="pfU-info-value">{userData?.birthday}</div>
            </div>
            <hr />
            <div className="pfU-info-row">
              <div className="pfU-info-label">관심사:</div>
              <div className="pfU-info-value">{userData?.categorys}</div>
            </div>
          </div>
        </div>

        <div>
          <button
            className="pfU-back-infoBtn"
            style={customBackBtn}
            onClick={handleCardClick}
          >
            앞!
          </button>

          {currentUserId === userData?.userId &&
            !isEditing && ( // 아이디가 같고 편집 모드가 아닐 때만 '프로필 수정' 버튼을 보여줍니다.
              <button
                className="pfU-back-editBtn"
                style={customBackButtonStyle}
                onClick={handleEditClick}
              >
                프로필 수정
              </button>
            )}
          {isEditing && (
            <button
              className="pfU-back-saveBtn"
              style={customSaveButtonStyle}
              onClick={handleSaveClick}
            >
              저장
            </button>
          )}
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

export default ProfileUp;
