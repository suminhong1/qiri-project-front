import React from "react";
import "../css/imgmodal.css";

const imgmodal = ({ images, index, close }) => {
  const currentImage = images[index];

  if (!currentImage) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-main">
        <img src={currentImage} alt="imgmodal" />
        <button className="modal-close" onClick={close}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default imgmodal;
