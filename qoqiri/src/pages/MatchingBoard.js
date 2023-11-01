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
import { ApplyUserInfo } from "../api/matching"; // 신청버튼테스트용

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
  };

  useEffect(() => {
    postAPI();
  }, []);

  useEffect(() => {
    dispatch(viewComments(selectedPostSEQ));
  }, [dispatch]);

  const images = ["", "", ""];
  return (
    <>
      <div className="board-detail" key={post?.postSEQ}>
        <div className="board-header">
          <div className="board-header-time">
            <Date postDate={post?.postDate} />
          </div>
          <div className="titleNickname" style={{ marginBottom: "70px" }}>
            <div className="title">{post?.postTitle}</div>
          </div>
          <div
            className="board-header-main"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
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
          <div className="Detail-write">{post?.postContent}</div>
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
          .filter((comment) => comment.commentDelete === "N")
          .map((comment) => (
            <Comment key={comment.commentsSEQ} comment={comment} />
          ))}
      </div>
      {isModalOpen && (
        <div className="Matching-modal-overlay">
          <div className="Matching-modal">
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
              showArrows={false}
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
  const [selectedPostSEQ, setSelectedPostSEQ] = useState(0);
  const [category, setCategory] = useState([]);
  const [categoryType, setCategoryType] = useState([]);
  const [selectedCatSEQ, setSelectedCatSEQ] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(""); // 현재 로그인된 사용자 정보를 가져옴(신청버튼테스트용)

  const [searchKeyword, setSearchKeyword] = useState(""); // 키워드 검색
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchClick = async () => {
    try {
      // 검색어를 백엔드로 전달하고 검색 결과를 요청
      const response = await instance.get(
        `/public/post?keyword=${searchKeyword}`
      );

      // 검색 결과를 setSearchResults로 업데이트
      setSearchResults(response.data);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    // 페이지가 로드될 때 전체 게시물 목록을 불러오는 API 호출
    const fetchAllPosts = async () => {
      try {
        const response = await instance.get("/public/post");
        // 전체 게시물을 setSearchResults로 업데이트
        setSearchResults(response.data);
      } catch (error) {
        console.error("게시물 불러오기 중 오류 발생:", error);
      }
    };

    fetchAllPosts();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setLoggedInUser(user);
    }
  }, []); // 신청버튼테스트용

  const handleApplyClick = async () => {
    // 현재 선택한 게시물을 찾기. (게시물 정보 가져오기)
    const currentPost = posts.find((po) => po.postSEQ === selectedPostSEQ);
    console.log("아이디 가져오기", loggedInUser?.id);
    // 작성자의 ID와 로그인한 사용자의 ID가 동일한지 확인
    if (currentPost?.userInfo?.userId === loggedInUser?.id) {
      alert("본인이 작성한 게시물에는 신청할 수 없습니다.");
      return;
    }

    try {
      const response = await saveData(loggedInUser, selectedPostSEQ);

      if (response) {
        console.log("신청 성공");
      }
    } catch (error) {
      console.error("신청 중 오류 발생:", error);
    }
  };

  const saveData = async () => {
    // 토큰 가져오기
    const dataToSend = {
      token: loggedInUser.token, // 토큰 추가
      postSEQ: selectedPostSEQ,
    };
    console.log(dataToSend);

    try {
      const response = await ApplyUserInfo(dataToSend);

      if (response.status === 200) {
        console.log("데이터 저장 성공");
        alert("신청 완료!!");
        return response.data;
      } else {
        console.error("데이터 저장 실패");
      }
    } catch (error) {
      alert("이미 신청한 게시물입니다.", error);
    }
  }; // 신청버튼테스트용

  useEffect(() => {}, [selectedPostSEQ]);

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
    <div className="real-main">
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
                    setSelectedCatSEQ(cat.ctSEQ);
                  }}
                >
                  {cat.ctName}
                </a>
              ))}
            </div>
          </div>
          <section className="section">
            {searchResults.map((po) => (
              <div
                onClick={() => {
                  setSelectedPostSEQ(po.postSEQ);

                  setIsOpen(!isOpen);
                }}
                className="board"
                key={po.postSEQ}
              >
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

            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchKeyword}
              onChange={handleSearchChange}
            />
            <button onClick={handleSearchClick}>검색</button>
            {isOpen && (
              <div className="Matching-modal-main">
                <div className="Matching-modal-overlay">
                  <div className="Matching-modal">
                    <div className="close-button" onClick={closeModal}>
                      &times;
                    </div>
                    <DetailView selectedPostSEQ={selectedPostSEQ} />
                    <button onClick={handleApplyClick}>리뷰버튼테스트용</button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};
export default MatchingBoard;
