import React, { useState, useEffect } from "react";
import {
  saveReview,
  updateReview,
  getAllReview,
  getMyMatchings,
} from "../api/review";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { deletePost } from "../api/post";

const StyledReview = styled.div`
  width: 100%;
  padding-left: 240px;
  padding-top: 30px;
  padding-bottom: 30px;
  margin: auto;

  .rv-container {
    width: 1100px;
    padding-left: 100px;
  }

  .rv-container h1 {
    color: #ff7f38;
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 30px;
  }

  .rv-write-button {
    font-weight: bold;
    background-color: #ff7f38;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 20px;
    position: relative;
    left: 1px;
    height: 90px;
  }

  .rv-input-area {
    display: flex;
    margin-bottom: 20px;
    justify-content: center;
  }

  .rv-input-area textarea {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    resize: none;
    height: 90px;
    width: 100rem;
  }

  .rv-review-board {
    border: 1px solid #e0e0e0;
  }

  .rv-review-item {
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #e0e0e08e;
    transition: background-color 0.3s;
    height: 100px;
  }

  .rv-review-item:hover {
    background-color: #f5f5f5;
  }

  .rv-review-item:last-child {
    border-bottom: none;
  }

  .rv-writerInfo {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .rv-info {
    font-size: 0.8rem;
    .rv-writer {
      margin-right: 40px;
    }
  }

  .rv-menu {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .rv-stats-thums {
    float: right;
    position: relative;
  }
  .rv-like-button {
    cursor: pointer;
  }

  .rv-stats-views {
    float: right;
    position: relative;
    bottom: 20px;
    margin: 6px;
  }

  .rv-input-area {
    position: relative;
  }

  .rv-review-item textarea {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    resize: none;
    height: 60px;
    width: 700px;
  }

  .rv-psUpdataOKBtn {
    background: none;
    border: none;
    color: blue;
    font-size: small;
    font-weight: bold;
  }

  .rv-psUpdataBtn {
    background: none;
    border: none;
    color: blue;
    font-size: small;
    font-weight: bold;
  }

  .rv-psDeleteBtn {
    background: none;
    border: none;
    color: blue;
    font-size: small;
    font-weight: bold;
  }

  .rv-character-count {
    position: absolute;
    top: 95px; /* 위치 조절이 필요할 수 있습니다 */
    font-size: 0.9em;
    color: gray;
  }

  .rv-review-item p {
    font-size: 20px;
  }

  .rv-like-array {
    border: none;
    position: relative;
    top: 110px;
    right: 10px;
    font-weight: bolder;
    color: #ff7f38;
  }

  .rv-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .rv-modal-content {
    position: relative;
    width: 360px;
    height: 690px;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }

  .rv-select {
    font-size: 13px;
    width: 110px;
    display: flex;
    justify-items: baseline;
    font-weight: bold;
    height: 90px;
    border: 1px solid #e0e0e0;
    position: relative;
  }
`;

const ReviewBoard = () => {
  const user = useSelector((state) => state.user);
  const [reviews, setReviews] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [content, setContent] = useState("");
  const [editingContent, setEditingContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContentURL, setModalContentURL] = useState("");
  const [myMatchings, setMyMatchings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [selectedMatching, setSelectedMatching] = useState(""); // 선택된 글 타이틀
  const [editingPostTitle, setEditingPostTitle] = useState(""); // 수정할 글 타이틀

  const getAllReviewAPI = async () => {
    const result = await getAllReview();
    setReviews(result.data);
  };

  const getMyMatchingsAPI = async () => {
    const result = await getMyMatchings(user.id);
    setMyMatchings(result.data);
  };

  useEffect(() => {
    setLoggedInUser(user);
    getMyMatchingsAPI(); // 사용자 글 목록 가져오기
    getAllReviewAPI();
  }, [user]);

  // 리뷰 수정버튼 활성화함수
  const handleEditClick = (postId, content, postTitle) => {
    setIsEditing(true);
    setEditingPostId(postId);
    setEditingContent(content);
    setEditingPostTitle(postTitle);
  };

  // 리뷰 업데이트 확인함수
  const handleUpdateSubmit = async () => {
    // 수정 로직
    const updateData = {
      token: user.token,
      postTitle: editingPostTitle,
      postContent: editingContent,
      board: 2,
      postSEQ: editingPostId,
    };
    console.log(updateData);

    try {
      await updateReview(updateData);
      alert("게시글이 수정되었습니다.");
      setIsEditing(false);
      setEditingPostId(null);
      setContent("");
      window.location.replace("http://localhost:3000/review");
    } catch (error) {
      alert("게시글 수정에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  // 리뷰 삭제 확인함수
  const handleDeleteClick = async (postSEQ) => {
    try {
      await deletePost(postSEQ);
      alert("리뷰가 삭제되었습니다.");
      // 드롭박스를 업데이트하기 위해 사용자 글 목록을 다시 가져옴
      getMyMatchingsAPI();
      window.location.replace("http://localhost:3000/review");
    } catch (error) {
      alert("리뷰 삭제에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  // 드롭박스로 선택한 매칭글 담기
  const handleMatchingSelect = async (data) => {
    await setSelectedMatching(data);
    console.log(data);
  };

  // 글쓰기 버튼 함수
  const handleWriteClick = async () => {
    // 글 타이틀이 선택되지 않았을 경우 글쓰기 방지
    if (!selectedMatching || selectedMatching === "글 타이틀 선택") {
      alert("글 타이틀을 선택해주세요.");
      return;
    }

    if (content.length <= 50) {
      // PostDTO 형식에 맞게 reviewData 객체를 수정
      const PostDTO = {
        token: user.token, //로그인한 사용자의 토큰
        postContent: content,
        boardSEQ: 2,
        postTitle: content, // 드롭박스 만들기 및 선택하기
        postSEQ: selectedMatching,
      };
      try {
        // 리뷰 내용을 백엔드로 전송
        await saveReview(PostDTO);
        alert("리뷰가 저장되었습니다.");
        window.location.replace("http://localhost:3000/review");
      } catch (error) {
        alert("리뷰 저장에 실패하였습니다. 다시 시도해주세요.");
      }
    } else {
      alert("댓글은 50자를 초과할 수 없습니다.");
    }
  };

  const handleContentChange = (e, isEditingMode = false) => {
    const value = e.target.value;
    if (value.length <= 50) {
      if (isEditingMode) {
        setEditingContent(value); // 수정 모드에서는 editingContent를 업데이트
      } else {
        setContent(value);
      }
    } else {
      alert("댓글은 50자를 초과할 수 없습니다.");
    }
  };

  const handleWriterClick = (userId) => {
    let modalUrl =
      loggedInUser && userId === loggedInUser.id
        ? `/mini/${userId}`
        : `/mini/${userId}`;

    setModalContentURL(modalUrl);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <StyledReview>
      <div className="rv-container">
        <h1>저는 이랬어요</h1>
        <div className="rv-input-area">
          <select
            className="rv-select"
            value={selectedMatching}
            onChange={(e) => handleMatchingSelect(e.target.value)}
          >
            <option value={""}>원글 제목 선택</option>
            {myMatchings.map((myMatching) => (
              <option
                key={myMatching.post?.postSEQ}
                value={myMatching.post?.postSEQ}
              >
                {myMatching.post?.postTitle}
              </option>
            ))}
          </select>
          <textarea
            placeholder="리뷰 내용을 입력하세요. (50자를 초과할 수 없습니다.)"
            value={content}
            onChange={handleContentChange}
          ></textarea>
          <div className="rv-character-count">{content.length}/50</div>
          <button className="rv-write-button" onClick={handleWriteClick}>
            글쓰기
          </button>
        </div>
        <div className="rv-review-board">
          {reviews.map((po) => (
            <div key={po.postSEQ} className="rv-review-item">
              {isEditing && editingPostId === po.postSEQ ? (
                <>
                  <textarea
                    value={editingContent}
                    onChange={(e) => handleContentChange(e, true)}
                  ></textarea>
                  <button
                    className="rv-psUpdataOKBtn"
                    onClick={handleUpdateSubmit}
                  >
                    수정 완료
                  </button>
                </>
              ) : (
                <>
                  <div className="rv-writerInfo">
                    <p>{po.postContent}</p>
                    <div className="rv-menu">
                      <div className="rv-info">
                        <span
                          className="rv-writer"
                          onClick={() => handleWriterClick(po.userInfo.userId)}
                        >
                          작성자: {po.userInfo.userNickname}
                        </span>
                        <span className="rv-writer-title">
                          원글 제목 : {po.postTitle}
                        </span>
                      </div>
                      {loggedInUser.id === po.userInfo.userId && (
                        <div className="rv-persnalBtn">
                          <button
                            className="rv-psUpdataBtn"
                            onClick={() =>
                              handleEditClick(
                                po.postSEQ,
                                po.postContent,
                                po.postTitle
                              )
                            }
                          >
                            수정
                          </button>
                          <button
                            className="rv-psDeleteBtn"
                            onClick={() => handleDeleteClick(po.postSEQ)}
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {showModal && (
          <div className="rv-modal" onClick={handleCloseModal}>
            <div
              className="rv-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="rv-close-button" onClick={handleCloseModal}>
                &times;
              </span>
              <iframe src={modalContentURL} width="100%" height="100%"></iframe>
            </div>
          </div>
        )}
      </div>
    </StyledReview>
  );
};

export default ReviewBoard;
