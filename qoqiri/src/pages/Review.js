import React, { useState, useEffect } from "react";
import "../css/Review.css";

const ReviewBoard = () => {
  const [reviews, setReviews] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [content, setContent] = useState("");
  const [sortByLikes, setSortByLikes] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handleWriteClick = () => {
    if (content.length === 0) {
      alert("댓글을 입력해 주세요!!");
      return;
    }

    if (content.length <= 50 && loggedInUser) {
      setReviews([
        {
          content,
          writer: loggedInUser.nickname,
          userId: loggedInUser.id,
          likes: 0,
        },
        ...reviews,
      ]);
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

  const handleLikeClick = (index) => (event) => {
    event.stopPropagation();
    const updatedReviews = [...reviews];
    updatedReviews[index].likes += 1;
    setReviews(updatedReviews);
    alert("추천하였습니다.");
  };

  const handleSortByLikesClick = () => {
    if (sortByLikes) {
      // 원래 순서로 되돌리기 (예: 가장 최근 작성된 리뷰부터)
      const originalReviews = [...reviews].reverse(); // 혹은 원하는 정렬 방식 사용
      setReviews(originalReviews);
    } else {
      // 추천순으로 정렬
      const sortedReviews = [...reviews].sort((a, b) => b.likes - a.likes);
      setReviews(sortedReviews);
    }
    setSortByLikes(!sortByLikes); // sortByLikes 값을 반전시킴
  };

  // 팝업창
  const handleWriterClick = (userId) => {
    let popupUrl =
      loggedInUser && userId === loggedInUser.id
        ? `/miniup/${userId}`
        : `/mini/${userId}`;

    // 팝업을 열고, 팝업의 크기와 위치를 설정
    window.open(popupUrl, "popupName", "width=600,height=620,top=100,left=100");
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
    </div>
  );
};

export default ReviewBoard;
