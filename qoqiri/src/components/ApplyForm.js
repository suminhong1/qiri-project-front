import React, { useState } from "react";
import "../css/ApplyForm.css";
import son from "../assets/son.jpg";

const ApplyForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
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
      <div className="header-sign">축구 카테고리 신청하였습니다</div>

      <div
        className={`custom-card ${isFlipped ? "flipped" : ""}`}
        onClick={handleCardClick}
      >
        <div className="card-front">
          <div>
            <img className="main-image" src={son} alt="User" />
          </div>
          <div className="card-body">
            <h1>손흥민</h1>
            <p className="p-text">
              한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개aergaergaergaergaergargaergaergaergaergaergreaaergaergaergaergaerg한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개
            </p>
          </div>
          <div className="sub-image">
            <img className="sub-image1" src={son} alt="User1" />

            <img className="sub-image2" src={son} alt="User2" />

            <img className="sub-image3" src={son} alt="User3" />
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
            className="front-chatBtn"
            style={customButtonStyle}
            onClick={"/"}
          >
            채팅
          </button>
        </div>
        <div className="card-back">
          <div className="card-body">
            <div className="info-row">
              <div className="info-label">이름:</div>
              <div className="info-value">사용자명</div>
            </div>
            <div className="info-row">
              <div className="info-label">성별:</div>
              <div className="info-value">남성</div>
            </div>
            <div className="info-row">
              <div className="info-label">거주지:</div>
              <div className="info-value">서울, 대한민국</div>
            </div>
            <div className="info-row">
              <div className="info-label">나이:</div>
              <div className="info-value">30세</div>
            </div>
            <div className="info-row">
              <div className="info-label">취미1:</div>
              <div className="info-value">축구</div>
            </div>
            <div className="info-row">
              <div className="info-label">취미2:</div>
              <div className="info-value">야구</div>
            </div>
            <div className="info-row">
              <div className="info-label">취미3:</div>
              <div className="info-value">농구</div>
            </div>
            <div className="text">앞에 소개글</div>
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
            className="back-chatBtn"
            style={customBackButtonStyle}
            onClick={"/"}
          >
            채팅
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyForm;
