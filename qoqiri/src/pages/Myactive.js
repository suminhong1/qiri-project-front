import React, { useState, useEffect } from "react";
import { getMyPosts, getmyList } from "../api/post";
import "../css/Myactive.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Myactive = () => {
  const [myPosts, setMyPosts] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const getMyPostsAPI = async () => {
    const result = await getMyPosts(user.id);
    setMyPosts(result.data);
  };

  useEffect(() => {
    const fetchUserInfoAndPosts = async () => {
      await getMyPostsAPI();
      if (!localStorage.getItem("user")) {
        alert("로그인이 필요합니다.");
        navigate("/"); // 이전 페이지나 홈 페이지로 리다이렉트. 필요한 주소로 변경하세요.
      }
    };
    fetchUserInfoAndPosts();
  }, [user]);

  return (
    <div className="myactive-container">
      <h1>글을 썼어요</h1>
      {myPosts.map((post) => (
        <div key={post.postSEQ} className="post-item">
          <p>제목 : {post.postTitle}</p>
          <p>글 내용 : {post.postContent}</p>
          <button
            className="apply-button"
            onClick={() => navigate(`/apply/${post.postSEQ}`)}
          >
            신청자 목록
          </button>
        </div>
      ))}
    </div>
  );
};

export default Myactive;
