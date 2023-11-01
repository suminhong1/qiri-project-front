import React, { useState, useEffect } from "react";
import "../css/Review.css";
import { saveReview, updateReview, deleteReview } from "../api/post";
import { updatePostTitleDropbox } from "../api/matching";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/qiri",
});

export const getPosts = async () => {
  return await instance.get("/public/post", {
    params: {
      board: 2,
      // matched: "",
    },
  });
};

export const reviewUpdate = async (data) => {
  return await instance.put(`reviewUpdate`, data);
};

const ReviewBoard = () => {
  const [reviews, setReviews] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [content, setContent] = useState("");
  const [editingContent, setEditingContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContentURL, setModalContentURL] = useState("");
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [userPosts, setUserPosts] = useState([]); // 사용자의 글 목록
  const [selectedTitle, setSelectedTitle] = useState(null); // 선택된 글 타이틀

  useEffect(() => {
    postsAPI();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoggedInUser(user);
      fetchUserPosts(user.id); // 사용자 글 목록 가져오기
    }
  }, []);

  // 리뷰 수정버튼 활성화함수
  const handleEditClick = (postId, content) => {
    setIsEditing(true);
    setEditingPostId(postId);
    setEditingContent(content); // 기존 내용을 수정 상태로 설정
  };

  // 리뷰 업데이트 확인함수
  const handleUpdateSubmit = async () => {
    // 수정 로직
    const updateData = {
      token: loggedInUser.token,
      postTitle: editingContent,
      postContent: editingContent,
      boardSeq: 2,
      postSeq: editingPostId,
    };

    try {
      await updateReview(updateData);
      alert("게시글이 수정되었습니다.");
      setIsEditing(false);
      setEditingPostId(null);
      setContent("");
    } catch (error) {
      alert("게시글 수정에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  // 리뷰 삭제 확인함수
  const handleDeleteClick = async (postSEQ, userId) => {
    if (loggedInUser.id === userId) {
      try {
        await deleteReview(postSEQ);
        alert("리뷰가 삭제되었습니다.");
        // UI에서 해당 리뷰 제거 or 페이지 새로고침
      } catch (error) {
        alert("리뷰 삭제에 실패하였습니다. 다시 시도해주세요.");
      }
    } else {
      alert("본인의 리뷰만 삭제할 수 있습니다.");
    }
  };

  const postsAPI = async () => {
    const result = await getPosts();
    setPosts(result.data);
  };

  const fetchUserPosts = async (userId) => {
    try {
      const response = await instance.get("/public/post", {
        params: {
          board: 2,
          userId: userId,
        },
      });
      const filteredPosts = response.data.filter(
        (post) => post.postTitleDropbox !== "Y"
      );
      setUserPosts(filteredPosts);
    } catch (error) {
      console.error("Failed to fetch user posts:", error);
    }
  };
  // 드롭박스 만들기 및 선택하기

  const handleTitleSelect = async (title) => {
    setSelectedTitle(title);
    const selectedPost = userPosts.find((post) => post.postTitle === title);
    if (selectedPost) {
      await updatePostTitleDropbox(selectedPost.postSEQ);
    }
  }; // 드롭박스 만들기 및 선택하기

  const handleWriteClick = async () => {
    // 글 타이틀이 선택되지 않았을 경우 글쓰기 방지
    if (!selectedTitle || selectedTitle === "글 타이틀 선택") {
      alert("글 타이틀을 선택해주세요.");
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
      // PostDTO 형식에 맞게 reviewData 객체를 수정
      const reviewData = {
        token: loggedInUser.token, //로그인한 사용자의 토큰
        postTitle: content,
        postContent: content,
        boardSeq: 2,
        postTitle: selectedTitle + " " + content, // 드롭박스 만들기 및 선택하기
      };
      console.log(reviewData);

      try {
        // 리뷰 내용을 백엔드로 전송
        await saveReview(reviewData);
        alert("리뷰가 저장되었습니다.");

        // UI 업데이트
        setReviews([
          {
            title: content,
            content,
            userId: loggedInUser.id,
            userNickname: loggedInUser.nickname,
          },
          ...reviews,
        ]);
        setContent("");
        setUserPosts((prevPosts) =>
          prevPosts.filter((post) => post.postTitle !== selectedTitle)
        ); // 드롭박스 만들기 및 선택하기
        setSelectedTitle(null); // 드롭박스 만들기 및 선택하기
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
    <div className="rv-container">
      <h1>우리끼리한줄평</h1>
      <div className="rv-input-area">
        <select
          value={selectedTitle}
          onChange={(e) => handleTitleSelect(e.target.value)}
        >
          <option value={null}>글 타이틀 선택</option>
          {userPosts.map((post) => (
            <option key={post.postSEQ} value={post.postTitle}>
              {post.postTitle}
            </option>
          ))}
        </select>
        {/* 드롭박스 만들기 및 선택하기*/}
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
        {posts
          .filter((po) => po.postDelete !== "Y") // postDelete가 "Y"인 게시물을 필터링
          .map((po) => (
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
                  <p>{po.postContent}</p>
                  <span
                    className="rv-writer"
                    onClick={() => handleWriterClick(po.userInfo.userId)}
                  >
                    끼리: {po.userInfo.userNickname}
                    <div>끼리 찾기명 : {po.postTitle}</div>
                  </span>
                  {loggedInUser.id === po.userInfo.userId && (
                    <div className="rv-persnalBtn">
                      <button
                        className="rv-psUpdataBtn"
                        onClick={() =>
                          handleEditClick(po.postSEQ, po.postContent)
                        }
                      >
                        수정
                      </button>
                      <button
                        className="rv-psDeleteBtn"
                        onClick={() =>
                          handleDeleteClick(po.postSEQ, po.userInfo.userId)
                        }
                      >
                        삭제
                      </button>
                    </div>
                  )}
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
  );
};

export default ReviewBoard;
