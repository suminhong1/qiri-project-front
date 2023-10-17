import React from "react";
import "../css/modalReview.css";

const modalReview = ({ images, index, close }) => {
  const currentImage = images[index];

  if (!currentImage) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-maina">
        <button className="modal-close" onClick={close}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default modalReview;
