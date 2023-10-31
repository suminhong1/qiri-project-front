import React, { useState, useEffect } from "react";
import { getUser } from "../api/user";
import { getmyList } from "../api/post";
import "../css/Myactive.css";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 가져옵니다.

const Myactive = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

  useEffect(() => {
    const fetchUserInfoAndPosts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.id) {
          throw new Error("아이디를 못찾았습니다.");
        }

        const userResponse = await getUser(user.id);
        setLoggedInUser(userResponse.data);

        const postsResponse = await getmyList(2);
        const userPosts = postsResponse.data.filter(
          (post) => post.userInfo.userId === userResponse.data.userId
        );
        setMyPosts(userPosts);
      } catch (error) {}
    };

    fetchUserInfoAndPosts(2);
  }, []);

  const handleOpenApplyPage = (postId) => {
    navigate(`/apply/${postId}`);
  };

  if (!loggedInUser) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div className="myactive-container">
      <h1>내 활동목록!</h1>
      {myPosts
        .filter((post) => post.postDelete !== "Y")
        .map((post) => (
          <div key={post.postSEQ} className="post-item">
            <p>제목 : {post.postTitle}</p>
            <p>글 내용 : {post.postContent}</p>
            <button
              className="apply-button"
              onClick={() => handleOpenApplyPage(post.userInfo.userId)}
            >
              신청목록
            </button>
            <span>끼리: {post.userInfo.userNickname}</span>
          </div>
        ))}
    </div>
  );
};

export default Myactive;