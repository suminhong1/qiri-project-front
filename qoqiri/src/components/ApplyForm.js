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
          <img src={son} alt="User" />
          <div className="card-body">
            <h3>사용자명</h3>
            <p>한줄소개</p>
          </div>
        </div>
        <div className="front-Btn">
          <button
            className="front-applyBtn"
            style={customButtonStyle}
            // onClick={"#"}
          >
            승락
          </button>
          <button
            className="front-chatBtn"
            style={customButtonStyle}
            // onClick={"#"}
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
          </div>
        </div>

        <div>
          <button
            className="back-applyBtn"
            style={customBackButtonStyle}
            // onClick={"#"}
          >
            승락
          </button>
          <button
            className="back-chatBtn"
            style={customBackButtonStyle}
            // onClick={"#"}
          >
            채팅
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyForm;
