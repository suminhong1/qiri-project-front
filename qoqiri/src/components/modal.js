import React from "react";
import "../css/modal.css";

const modal = ({ images, index, close }) => {
  const currentImage = images[index];

  if (!currentImage) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-maina">
        <img src={currentImage} alt="Modal" />
        <button className="modal-close" onClick={close}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default modal;
