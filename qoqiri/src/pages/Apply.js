import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import ApplyForm from "../components/ApplyForm";
import "../css/Apply.css";

const Apply = () => {
  const [sectionCount, setSectionCount] = useState(1);

  const addSection = () => {
    // 섹션을 추가하는 함수
    setSectionCount(sectionCount + 1);
  };

  return (
    <div className="ApplyMain">
      <div className="AC">
        <legend className="Applytag">신청 목록!!!</legend>
        <button onClick={addSection}>신청하기</button>
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
