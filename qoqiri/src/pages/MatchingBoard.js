import React, { useEffect, useState } from "react";
import "../css/MatchingBoard.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Date from "../components/Date";
import { getPost } from "../api/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { getCategoryTypes } from "../api/categoryType";
import { getCategories } from "../api/category";
import UserRating from "../components/UserRating";
import { viewComments } from "../store/commentSlice";
import { useSelector, useDispatch } from "react-redux";
import AddComment from "../components/AddComment";
import Comment from "../components/Comment";

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/qiri",
});

export const getPosts = async () => {
  return await instance.get("/public/post");
};

const DetailView = ({ selectedPostSEQ }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [post, setPost] = useState({});
  const [commentsCount, setCommentsCount] = useState(0);
  const dispatch = useDispatch();

  const comments = useSelector((state) => {
    return state.comment;
  });

  const openModal = (imageIndex) => {
    setSelectedImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImageIndex(0);
    setIsModalOpen(false);
  };

  const postAPI = async () => {
    const result = await getPost(selectedPostSEQ);
    setPost(result.data);
    // console.log(result.data);
  };

  useEffect(() => {
    postAPI();
    // setCommentsCount(comments.length);
  }, []);

  useEffect(() => {
    dispatch(viewComments(selectedPostSEQ));
    // console.log(selectedPostSEQ);
  }, [dispatch]);

  const images = ["", "", ""];
  return (
    <>
      <div className="board-detail" key={post?.postSEQ}>
        <div className="board-header">
          <div className="board-header-time">
            <Date postDate={post?.postDate} />
          </div>
          <div className="titleNickname">
            <div className="title">{post?.postTitle}</div>
          </div>
          <div className="board-header-main">
            <div className="profile">
              <img src="" alt="프로필 이미지" className="profileImg" />
              <UserRating rating={post?.userInfo?.rating} />
            </div>
            <span className="nickname">{post?.userInfo?.userNickname}</span>
            <div className="board-image-main">
              <div className="board-image">
                {images.map((imageSrc, index) => (
                  <img
                    key={index}
                    src={imageSrc}
                    alt={`이미지 ${index + 1}`}
                    onClick={() => openModal(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="Detail-write-board">
          <div className="Detail-write">
            {post?.postContent}
            {/* <a href="#" className="comment-count">
              <FontAwesomeIcon icon={faMessage} />
              <div className="count">{commentsCount}</div>
            </a> */}
          </div>
        </div>
        <div className="board-foot">
          <div className="foot-place-detail">
            <p>{post?.place?.placeName}</p>
            <p>{post?.place?.placeType?.placeTypeName}</p>
          </div>
        </div>
        <hr />
        <AddComment code={post !== null ? post.postSEQ : null} />
        {comments
          .filter((comment) => comment.commentDelete === "N") // comment.commentDelete가 "N"인 것만 필터링
          .map((comment) => (
            <Comment key={comment.commentsSEQ} comment={comment} />
          ))}
        {/* <div className="comment">
          <div className="coment-profile-img">
            <img alt="프로필 이미지" />
          </div>
          <textarea placeholder="댓글달기"></textarea>
          <button>
            <FontAwesomeIcon icon={faArrowTurnDown} rotation={90} />
          </button>
        </div> */}
        <hr />
        {/* {comments.map((co) => (
          <div className="commentList-main" key={co.commentsSeq}>
            <div className="commentList">
              <div className="comment-profile">
                <img alt="프로필 이미지" />
                <div comment-profile-nickname>{co.userInfo.userNickname}</div>
              </div>
              <div className="comment-content">{co.commentDesc}</div>
            </div>
            <hr />
          </div>
        ))} */}
      </div>
      {isModalOpen && (
        <div className="Matching-modal-overlay">
          <div className="Matching-modal">
            {/* 왼쪽 화살표 */}
            <div
              onClick={() => {
                if (selectedImageIndex > 0) {
                  setSelectedImageIndex(selectedImageIndex - 1);
                }
              }}
              className="arrow-button left-arrow"
            >
              &lt;
            </div>
            <Carousel
              showArrows={false} // 이미지 클릭으로 넘기기 기능을 비활성화
              selectedItem={selectedImageIndex}
              dynamicHeight={true}
              showThumbs={false}
            >
              {images.map((imageSrc, index) => (
                <div key={index}>
                  <img src={imageSrc} alt={`이미지 ${index + 1}`} />
                </div>
              ))}
            </Carousel>
            {/* 오른쪽 화살표 */}
            <div
              onClick={() => {
                if (selectedImageIndex < images.length - 1) {
                  setSelectedImageIndex(selectedImageIndex + 1);
                }
              }}
              className="arrow-button right-arrow"
            >
              &gt;
            </div>
            <div onClick={closeModal} className="close-button">
              &times;
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const MatchingBoard = () => {
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPostSEQ, setSelectedPostSEQ] = useState(0); // 선택된 게시물의 postSEQ를 저장
  const [category, setCategory] = useState([]);
  const [categoryType, setCategoryType] = useState([]);
  const [selectedCatSEQ, setSelectedCatSEQ] = useState(null); // 초기값을 null로 설정

  useEffect(() => {
    // console.log(selectedPostSEQ);
  }, [selectedPostSEQ]);

  const postsAPI = async () => {
    const result = await getPosts();
    setPosts(result.data);
  };

  const categoryAPI = async () => {
    const result = await getCategories();
    setCategory(result.data);
  };

  const categoryTypeAPI = async () => {
    const result = await getCategoryTypes();
    setCategoryType(result.data);
  };

  const toggleModal = (postSEQ) => {
    // setSelectedPostSEQ(postSEQ); // 선택된 게시물의 postSEQ를 설정
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    postsAPI();
    categoryTypeAPI();
    categoryAPI();
  }, [selectedCatSEQ]);

  return (
    <>
      <div className="main-content">
        <main className="main">
          <div className="select-bar">
            <div className="active-button">
              {categoryType.map((cat) => (
                <a
                  href="#"
                  className="active"
                  key={cat.ctSEQ}
                  onClick={() => {
                    setSelectedCatSEQ(cat.ctSEQ); // 클릭한 cat.ctSEQ를 선택된 상태 변수에 저장
                  }}
                >
                  {cat.ctName}
                </a>
              ))}
              {/* {category.map((ca) => (
                <a href="#" className="active" key={ca.categorySEQ}>
                  {ca.categoryName}
                </a>
              ))} */}
            </div>
          </div>
          <section className="section">
            {posts.map((po) => (
              <div
                onClick={() => {
                  setSelectedPostSEQ(po.postSEQ);
                  // toggleModal(po.postSEQ);
                  setIsOpen(!isOpen);
                }}
                className="board"
                key={po.postSEQ}
              >
                {/* 이 부분에서 게시물 클릭 시 toggleModal 함수 호출, postSEQ를 전달 */}
                <div className="board-header">
                  <div className="board-header-time">
                    <Date postDate={po.postDate} />
                  </div>
                  <div className="titleNickname">
                    <div className="title">{po.postTitle}</div>
                  </div>
                  <div className="board-header-main">
                    <div className="profile">
                      <a href="" className="profileImg">
                        <img src="" alt="프로필 이미지" />
                      </a>
                      <div>
                        <UserRating rating={po.userInfo.rating} />
                      </div>
                    </div>
                    <span className="nickname">{po.userInfo.userNickname}</span>
                    <div className="board-image-main">
                      <div className="board-image">
                        <img src="" />
                        <img src="" />
                        <img src="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="write-board">
                  <div className="write">
                    {po.postContent}
                    <a href="#" className="comment-count">
                      <FontAwesomeIcon icon={faMessage} />
                      <div className="count">0</div>
                    </a>
                  </div>
                </div>
                <div className="board-foot">
                  <div className="foot-place-detail">
                    <p>{po.place.placeName}</p>
                    <p>{po.place.placeType.placeTypeName}</p>
                  </div>
                </div>
              </div>
            ))}
            {isOpen && (
              <div className="Matching-modal-main">
                <div className="Matching-modal-overlay">
                  <div className="Matching-modal">
                    <div className="close-button" onClick={closeModal}>
                      &times;
                    </div>
                    <DetailView selectedPostSEQ={selectedPostSEQ} />
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
};
export default MatchingBoard;
