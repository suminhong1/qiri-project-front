import React, { useState, useEffect } from "react";
import "../css/Review.css";
import {
  saveReview,
  updateReview,
  deleteReview,
  updatePostTitleDropbox,
} from "../api/review";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/qiri",
});

export const getPosts = async () => {
  return await instance.get("/public/post", {
    params: {
      board: 2,
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
  const [selectedTitle, setSelectedTitle] = useState(""); // 선택된 글 타이틀
  const [editingPostTitle, setEditingPostTitle] = useState(""); // 수정할 글 타이틀

  useEffect(() => {
    postsAPI();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoggedInUser(user);
      fetchUserPosts(user.id); // 사용자 글 목록 가져오기
    }
  }, []);

  // 리뷰 수정버튼 활성화함수
  const handleEditClick = (postId, content, postTitle) => {
    setIsEditing(true);
    setEditingPostId(postId);
    setEditingContent(content); // 기존 내용을 수정 상태로 설정
    setEditingPostTitle(postTitle); // 여기에 postTitle을 저장합니다.
  };

  // 리뷰 업데이트 확인함수
  const handleUpdateSubmit = async () => {
    // 수정 로직
    const updateData = {
      token: loggedInUser.token,
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
  const handleDeleteClick = async (postSEQ, userId, postTitle) => {
    if (loggedInUser.id === userId) {
      try {
        await deleteReview(postSEQ, postTitle);
        alert("리뷰가 삭제되었습니다.");

        // 드롭박스를 업데이트하기 위해 사용자 글 목록을 다시 가져옴
        fetchUserPosts(loggedInUser.id);

        window.location.replace("http://localhost:3000/review");
      } catch (error) {
        alert("리뷰 삭제에 실패하였습니다. 다시 시도해주세요.");
      }
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
          board: 1,
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
    console.log("타이틀명" + title);
    setSelectedTitle(title);
    const selectedPost = userPosts.find((post) => post.postTitle === title);
    console.log("선택포스트 확인용" + selectedPost.postSEQ);
    if (selectedPost) {
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
        postContent: content,
        boardSEQ: 2,
        postTitle: selectedTitle, // 드롭박스 만들기 및 선택하기
      };
      console.log(reviewData);

      try {
        // 리뷰 내용을 백엔드로 전송
        await saveReview(reviewData);
        console.log("리뷰 저장시 정보" + reviewData);
        alert("리뷰가 저장되었습니다.");

        // 선택한 포스트의 postTitleDropbox를 "Y"로 변경
        const selectedPost = userPosts.find(
          (post) => post.postTitle === selectedTitle
        );
        window.location.replace("http://localhost:3000/review");
        if (selectedPost) {
          await updatePostTitleDropbox(selectedPost.postSEQ);
        }

        // UI 업데이트
        setReviews([
          {
            title: selectedTitle,
            postContent: content,
            userId: loggedInUser.id,
            userNickname: loggedInUser.nickname,
            postTitleDropbox: "Y",
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
      <h1>저는 이랬어요</h1>
      <div className="rv-input-area">
        <select
          className="rv-select"
          value={selectedTitle}
          onChange={(e) => handleTitleSelect(e.target.value)}
        >
          <option value={""}>글 타이틀 선택</option>
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
                  <div className="rv-writerInfo">
                    <p>{po.postContent}</p>
                    <span
                      className="rv-writer"
                      onClick={() => handleWriterClick(po.userInfo.userId)}
                    >
                      끼리: {po.userInfo.userNickname}
                    </span>
                    <span className="rv-writer-title">
                      글 제목 : {po.postTitle}
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
                        onClick={() =>
                          handleDeleteClick(
                            po.postSEQ,
                            po.userInfo.userId,
                            po.postTitle
                          )
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
