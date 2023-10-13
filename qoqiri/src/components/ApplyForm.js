import React, { useState } from "react";
import "../css/ApplyForm.css";
import Modal from "./modal";
import son from "../assets/son.jpg";

const ApplyForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
            <h1>#이름#</h1>
            <p className="ap-text">
              한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개aergaergaergaergaergargaergaergaergaergaergreaaergaergaergaergaerg한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개
            </p>
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
              <div className="ap-info-label">이름 :</div>
              <div className="ap-info-value">#사용자명#</div>
            </div>
            <hr />
            <div className="ap-info-row">
              <div className="ap-info-label">성별 :</div>
              <div className="ap-info-value">#성별#</div>
            </div>
            <hr />
            <div className="ap-info-row">
              <div className="ap-info-label">지역 :</div>
              <div className="ap-info-value">#거주지#</div>
            </div>
            <hr />
            <div className="ap-info-row">
              <div className="ap-info-label">나이 :</div>
              <div className="ap-info-value">#나이#</div>
            </div>
            <hr />
            <div className="ap-info-row">
              <div className="ap-info-label">취미1 :</div>
              <div className="ap-info-value">#취미1#</div>
            </div>
            <hr />
            <div className="ap-info-row">
              <div className="ap-info-label">취미2 :</div>
              <div className="ap-info-value">#취미2#</div>
            </div>
            <hr />
            <div className="ap-info-row">
              <div className="ap-info-label">취미3 :</div>
              <div className="ap-info-value">#취미3#</div>
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
