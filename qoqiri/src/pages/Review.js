import React, { useState, useEffect } from "react";
import "../css/Review.css";
import Modal from "../components/modalReview"; // 모달 컴포넌트를 임포트합니다.

const ReviewBoard = () => {
  const [reviews, setReviews] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 표시 상태
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(null); // 선택된 리뷰의 인덱스

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handleWriteClick = () => {
    const title = prompt("리뷰 제목을 입력하세요:");
    const content = prompt("리뷰 내용을 입력하세요:");
    if (title && content && loggedInUser) {
      setReviews([
        ...reviews,
        { title, content, writer: loggedInUser.nickname, likes: 0, views: 0 },
      ]);
    }
  };

  const handleReviewClick = (index) => {
    setSelectedReviewIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="rv-container">
      <h1>끼리후기</h1>
      <button className="rv-write-button" onClick={handleWriteClick}>
        글쓰기
      </button>
      <div className="rv-review-board">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="rv-review-item"
            onClick={() => handleReviewClick(index)}
          >
            <h2>{review.title}</h2>
            <p>{review.content}</p>
            <span className="rv-writer">글쓴이: {review.writer}</span>
            <div className="rv-stats-thums">
              <span>👍 {review.likes}</span>
            </div>
            <div className="rv-stats-views">
              <span>👁️ {review.views}</span>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <modalReview
          images={[
            reviews[selectedReviewIndex].title,
            reviews[selectedReviewIndex].content,
            reviews[selectedReviewIndex].writer,
            reviews[selectedReviewIndex].likes,
            reviews[selectedReviewIndex].views,
          ]}
          index={0}
          close={closeModal}
        />
      )}
    </div>
  );
};

export default ReviewBoard;
