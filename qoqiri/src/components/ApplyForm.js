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
    <div className="container">
      <div className="header-sign">#category# 카테고리 신청하였습니다</div>

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
            <h1>#이름#</h1>
            <p className="p-text">
              한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개aergaergaergaergaergargaergaergaergaergaergreaaergaergaergaergaerg한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개
            </p>
          </div>
        </div>

        <div className="front-Btn">
          <button
            className="front-applyBtn"
            style={customButtonStyle}
            onClick={"/"}
          >
            승낙
          </button>
          <button
            className="apfront-infoBtn"
            style={customButtonStyle}
            onClick={handleCardClick}
          >
            프로필 정보보기
          </button>
        </div>
        <div className="card-back">
          <div className="card-body">
            <div className="info-row">
              <div className="info-label">이름:</div>
              <div className="info-value">#사용자명#</div>
            </div>
            <hr />
            <div className="info-row">
              <div className="info-label">성별:</div>
              <div className="info-value">#성별#</div>
            </div>
            <hr />
            <div className="info-row">
              <div className="info-label">거주지:</div>
              <div className="info-value">#거주지#</div>
            </div>
            <hr />
            <div className="info-row">
              <div className="info-label">나이:</div>
              <div className="info-value">#나이#</div>
            </div>
            <hr />
            <div className="info-row">
              <div className="info-label">취미1:</div>
              <div className="info-value">#취미1#</div>
            </div>
            <hr />
            <div className="info-row">
              <div className="info-label">취미2:</div>
              <div className="info-value">#취미2#</div>
            </div>
            <hr />
            <div className="info-row">
              <div className="info-label">취미3:</div>
              <div className="info-value">#취미3#</div>
            </div>
          </div>
        </div>

        <div>
          <button
            className="back-applyBtn"
            style={customBackButtonStyle}
            onClick={"/"}
          >
            승낙
          </button>
          <button
            className="apback-infoBtn"
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
