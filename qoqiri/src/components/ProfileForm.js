import React, { useState, useEffect } from "react";
import Modal from "./modal";
import "../css/ProfileForm.css";
import son from "../assets/son.jpg";
import { getUser, login } from "../api/user";

const ProfileForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [userData, setUserData] = useState({ introduction: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await getUser("user10"); // 해당 주인계정만 나오도록 하기
      setUserData(response.data);
    };

    fetchUserData();
  }, []);

  const currentUserId = "user10"; //  현재 접속한 계정  (수정해야함)

  const handleEditClick = () => {
    setIsEditing(true); // 편집 모드 활성화
  };

  const handleSaveClick = () => {
    setIsEditing(false); // 편집 모드 종료및 저장
    // 변경된 데이터를 API나 데이터베이스에 저장하는 코드를 여기에 작성해야함 (추가 필요)
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
    display: isFlipped || isEditing ? "none" : "block", // <-- isEditing 추가
    transform: "none",
    cursor: "pointer",
    borderRadius: "4px",
  };

  const customBackButtonStyle = {
    display: isFlipped && !isEditing ? "block" : "none", // <-- Added !isEditing here
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
            {isEditing ? (
              <input
                className="pf-text-input"
                defaultValue={userData.introduction}
                onChange={(e) =>
                  setUserData((prevData) => ({
                    ...prevData,
                    introduction: e.target.value,
                  }))
                }
              />
            ) : (
              <p className="pf-text">{userData.introduction || "자기소개"}</p>
            )}
          </div>
          {currentUserId === userData?.userId && !isEditing && (
            <button
              className="pf-front-editBtn"
              style={customFrontEditButtonStyle}
              onClick={handleEditClick}
            >
              프로필 수정
            </button>
          )}
          {isEditing && (
            <button
              className="pf-front-saveBtn"
              style={customFrontSaveButtonStyle}
              onClick={handleSaveClick}
            >
              저장
            </button>
          )}
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
              <div className="pf-info-label">이름:</div>
              {isEditing ? (
                <input defaultValue={userData?.userName} />
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

          {currentUserId === userData?.userId &&
            !isEditing && ( // 아이디가 같고 편집 모드가 아닐 때만 '프로필 수정' 버튼을 보여줍니다.
              <button
                className="pf-back-editBtn"
                style={customBackButtonStyle}
                onClick={handleEditClick}
              >
                프로필 수정
              </button>
            )}
          {isEditing && (
            <button
              className="pf-back-saveBtn"
              style={customSaveButtonStyle}
              onClick={handleSaveClick}
            >
              저장
            </button>
          )}
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
