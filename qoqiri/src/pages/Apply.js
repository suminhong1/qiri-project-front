import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ApplyForm from "../components/ApplyForm";
import "../css/Apply.css";
import { useNavigate } from "react-router-dom"; // 추가

const Apply = () => {
  const [sectionCount, setSectionCount] = useState(1);
  const navigate = useNavigate(); // 추가
  const handleBack = () => {
    navigate("/myMatching");
  };
  return (
    <div className="ApplyMain">
      <div className="AC">
        <legend className="Applytag">궁금해요</legend>
        <button className="backButton" onClick={handleBack}>
          뒤로가기
        </button>
        {Array.from({ length: sectionCount }).map((_, index) => (
          <section key={index} className="ApplySelect">
            <ApplyForm />
          </section>
        ))}
      </div>
    </div>
  );
};

export default Apply;
