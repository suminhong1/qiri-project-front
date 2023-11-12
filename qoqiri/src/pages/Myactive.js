import React, { useState, useEffect } from "react";
import { getUser } from "../api/user";
import { getmyList } from "../api/post";
import "../css/Myactive.css";
import { useNavigate } from "react-router-dom";

const Myactive = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfoAndPosts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.id) {
          alert("로그인이 필요합니다.");
          navigate("/"); // 이전 페이지나 홈 페이지로 리다이렉트. 필요한 주소로 변경하세요.
          return; // 여기서 리턴해주어서 아래 로직을 실행하지 않게 합니다.
        }

        const userResponse = await getUser(user.id);
        setLoggedInUser(userResponse.data);

        const postsResponse = await getmyList();
        const userPosts = postsResponse.data.filter(
          (post) => post.userInfo.userId === userResponse.data.userId
        );
        setMyPosts(userPosts);
      } catch (error) {}
    };

    fetchUserInfoAndPosts();
  }, [navigate]);

  return (
    <div className="myactive-container">
      <h1>글을 썼어요</h1>
      {myPosts
        .filter((post) => post.postDelete !== "Y")
        .map((post) => (
          <div key={post.postSEQ} className="post-item">
            <p>제목 : {post.postTitle}</p>
            <p>글 내용 : {post.postContent}</p>
            <button
              className="apply-button"
              onClick={() => navigate(`/apply/${post.postSEQ}`)}
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
