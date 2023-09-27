import React, { useState } from "react";
import "../css/ProfileForm.css";
import son from "../assets/son.jpg";

const Mini = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="container" onClick={handleCardClick}>
      <div className="header-sign">신청 카테고리명:을 신청하였습니다.</div>

      <div className={`custom-card ${isFlipped ? "flipped" : ""}`}>
        <div className="card-front">
          <img src={son} alt="User" />
          <div className="card-body">
            <h1>사용자명</h1>
            <p>한줄소개</p>
          </div>
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
      </div>
    </div>
  );
};

export default Mini;
