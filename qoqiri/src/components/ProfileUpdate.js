import React, { useState } from "react";
import Modal from "./modal";
import "../css/ProfileUpdate.css";
import son from "../assets/son.jpg";

const ProfileForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [name, setName] = useState("#이름#");
  const [bio, setBio] = useState("한줄소개한줄소개한줄소개한줄소개...");

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


  const renderEditFields = () => {
    return (
      <div className="edit-fields">
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="한줄평"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button className="save-btn" onClick={handleSave}>
          저장
        </button>
      </div>
    );
  };


  const handleSave = () => {

    console.log("이름:", name);
    console.log("한줄평:", bio);
  };

  return (
    <div className="container">
      <div className="header-sign"></div>

      <div className={`custom-card ${isFlipped ? "flipped" : ""}`}>
        <div className="card-front">
          <div>
            <img
              className="main-image"
              src={son}
              alt="User"
              onClick={() => handleImageClick(0)}
            />
          </div>
          <div className="card-body">
            <h1>{name}</h1>
            <p className="pf-p-text">{bio}</p>
          </div>
        </div>

        <div className="front-Btn">
          <button
            className="front-infoBtn"
            style={customButtonStyle}
            onClick={handleCardClick}
          >
            프로필 정보보기
          </button>
        </div>
        <div className="card-back">
          <div className="card-body">

            <button className="edit-profile-btn" onClick={handleEditProfile}>
              프로필 수정
            </button>
            <div className="info-row">
              <div className="info-label">성별:</div>
              <div className="info-value">#성별#</div>
            </div>
            <div className="info-row">
              <div className="info-label">거주지:</div>
              <div className="info-value">#거주지#</div>
            </div>
            <div className="info-row">
              <div className="info-label">나이:</div>
              <div className="info-value">#나이#</div>
            </div>
          </div>
        </div>

        <div>
          <button
            className="back-infoBtn"
            style={customBackButtonStyle}
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
      {isFlipped && renderEditFields()}
    </div>
  );
};

export default ProfileForm;
