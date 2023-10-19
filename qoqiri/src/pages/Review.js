import React, { useState, useEffect } from "react";
import "../css/Review.css";
import { saveReview } from "../api/post";

const ReviewBoard = () => {
  const [reviews, setReviews] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [content, setContent] = useState("");
  const [sortByLikes, setSortByLikes] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContentURL, setModalContentURL] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handleWriteClick = async () => {
    if (content.length === 0) {
      alert("댓글을 입력해 주세요!!");
      return;
    }

    // 로그인 확인
    if (!loggedInUser) {
      alert("로그인이 필요합니다.");
      return;
    }

    // userId 확인
    if (!loggedInUser.id) {
      alert("유효하지 않은 사용자 정보입니다. 다시 로그인해주세요.");
      return;
    }

    if (content.length <= 50) {
      const reviewData = {
        postContent: content || "",
        postTitle: content.substring(0, 50),
        userInfo: {
          userId: loggedInUser.id,
        },
        likes: 0,
        board: {
          boardSeq: 2,
        },
      };
      console.log(reviewData);

      try {
        // 리뷰 내용을 백엔드로 전송
        await saveReview(reviewData);
        alert("리뷰가 저장되었습니다.");

        // UI 업데이트
        setReviews([
          {
            content,
            userId: loggedInUser.id,
          },
          ...reviews,
        ]);
        setContent("");
      } catch (error) {
        alert("리뷰 저장에 실패하였습니다. 다시 시도해주세요.");
      }
    } else {
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

  const handleLikeClick = (index) => (event) => {
    event.stopPropagation();
    const updatedReviews = [...reviews];
    updatedReviews[index].likes += 1;
    setReviews(updatedReviews);
    alert("추천하였습니다.");
  };

  const handleSortByLikesClick = () => {
    if (sortByLikes) {
      const originalReviews = [...reviews].reverse(); // 혹은 원하는 정렬 방식 사용
      setReviews(originalReviews);
    } else {
      // 추천순으로 정렬
      const sortedReviews = [...reviews].sort((a, b) => b.likes - a.likes);
      setReviews(sortedReviews);
    }
    setSortByLikes(!sortByLikes); // sortByLikes 값을 반전시킴
  };

  const handleWriterClick = (userId) => {
    let modalUrl =
      loggedInUser && userId === loggedInUser.id
        ? `/miniup/${userId}`
        : `/mini/${userId}`;

    setModalContentURL(modalUrl);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
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
          <div key={index} className="rv-review-item">
            <p>{review.content}</p>
            <span
              className="rv-writer"
              onClick={() => handleWriterClick(review.userId)}
            >
              끼리: {review.writer}
            </span>

            <div className="rv-stats-thums">
              <span className="rv-like-button" onClick={handleLikeClick(index)}>
                👍 {review.likes}
              </span>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <iframe src={modalContentURL} width="100%" height="100%"></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewBoard;
