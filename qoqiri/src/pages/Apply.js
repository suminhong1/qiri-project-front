import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ApplyForm from "../components/ApplyForm";
import Applymain from "../css/Apply.css";

const Apply = () => {
  return (
    <div className="Apply-main">
      <div className="Apply-container">
        <ApplyForm />
        <ApplyForm />
        <ApplyForm />
        <ApplyForm />
        <ApplyForm />
        <ApplyForm />
      </div>
    </div>
  );
};

export default Apply;
