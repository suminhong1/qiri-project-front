import React, { useState, useEffect } from "react";
import "../css/Review.css";
import Modal from "../components/modalReview";

const ReviewBoard = () => {
  const [reviews, setReviews] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sortByLikes, setSortByLikes] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handleWriteClick = () => {
    // Check if content length is 0
    if (content.length === 0) {
      alert("댓글을 입력해 주세요!!");
      return;
    }

    if (content.length <= 50 && loggedInUser) {
      setReviews([
        { title, content, writer: loggedInUser.nickname, likes: 0, views: 0 },
        ...reviews,
      ]);
      setTitle("");
      setContent("");
    } else if (content.length > 50) {
      alert("댓글은 50자를 초과할 수 없습니다.");
    }
  };

  const handleContentChange = (e) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setContent(value);
    } else {
      alert("댓글은 50자를 초과할 수 없습니다.");
    }
  };

  const handleReviewClick = (index) => {
    setSelectedReviewIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLikeClick = (index) => (event) => {
    event.stopPropagation();
    const updatedReviews = [...reviews];
    updatedReviews[index].likes += 1;
    setReviews(updatedReviews);
    alert("추천하였습니다.");
  };

  const handleSortByLikesClick = () => {
    const sortedReviews = [...reviews].sort((a, b) => b.likes - a.likes);
    setReviews(sortedReviews);
    setSortByLikes(false); // 추천순 상태값을 false로 재설정
  };

  return (
    <div className="rv-container">
      <h1>우리끼리한줄평</h1>
      <div className="rv-input-area">
        <textarea
          placeholder="리뷰 내용을 입력하세요. (50자를 초과할 수 없습니다.)"
          value={content}
          onChange={handleContentChange}
        ></textarea>
        <div className="rv-character-count">{content.length}/50</div>
        <button className="rv-write-button" onClick={handleWriteClick}>
          글쓰기
        </button>
        <div
          type="button"
          className="rv-like-array"
          onClick={handleSortByLikesClick}
        >
          추천순
        </div>
      </div>
      <div className="rv-review-board">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="rv-review-item"
            onClick={() => handleReviewClick(index)}
          >
            <p>{review.content}</p>
            <span className="rv-writer">끼리: {review.writer}</span>

            <div className="rv-stats-thums">
              <span className="rv-like-button" onClick={handleLikeClick(index)}>
                👍 {review.likes}
              </span>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <Modal
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
