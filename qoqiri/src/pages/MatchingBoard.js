import React, { useEffect, useState } from "react";
import "../css/MatchingBoard.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Date from "../components/Date";
import {
  getPosts,
  getPostsByCategoryType,
  getSearchResults,
} from "../api/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { getCategoryTypes } from "../api/categoryType";
import { getCategories } from "../api/category";
import UserRating from "../components/UserRating";
import { getAttachments } from "../api/post";
import DetailView from "../components/DetailView";
import { useParams } from "react-router-dom";

const MatchingBoard = () => {
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPostSEQ, setSelectedPostSEQ] = useState(0);
  const [category, setCategory] = useState([]);
  const [categoryType, setCategoryType] = useState([]);
  const [selectedCatSEQ, setSelectedCatSEQ] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState(""); // 키워드 검색
  const [attachments, setAttachments] = useState([]);
  const { id } = useParams();

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const PostsByCategoryTypeAPI = async () => {
    const result = await getPostsByCategoryType(id);
    setPosts(result.data);
  };

  const getPostsAPI = async () => {
    const result = await getPosts();
    setPosts(result.data);
  };

  const getSearchResultsAPI = async () => {
    const result = await getSearchResults(searchKeyword);
    setPosts(result.data);
  };

  const handleSearchClick = async () => {
    try {
      getSearchResultsAPI();
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };

  const categoryAPI = async () => {
    const result = await getCategories();
    setCategory(result.data);
  };

  const categoryTypeAPI = async () => {
    const result = await getCategoryTypes();
    setCategoryType(result.data);
  };

  const attachmentsAPI = async () => {
    const result = await getAttachments(selectedPostSEQ);
    setAttachments(result.data);
  };

  const toggleModal = (postSEQ) => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getPostsAPI();
  }, []);

  useEffect(() => {
    if (id == null) {
      getPostsAPI(); // id가 없을 때는 postsAPI 실행
    } else {
      PostsByCategoryTypeAPI(); // id가 있을 때는 PostsByCategoryTypeAPI 실행
    }
    console.log(posts);
  }, [id]);

  useEffect(() => {
    categoryTypeAPI();
    categoryAPI();
    attachmentsAPI(selectedPostSEQ);
  }, [selectedCatSEQ]);

  return (
    <div className="real-main">
      <div className="main-content">
        <main className="main">
          <div className="select-bar">
            <div className="active-button">
              <a href="/matchingBoard" className="active">
                전체보기
              </a>
              {categoryType.map((cat) => (
                <a
                  href={`/matchingBoard/${cat?.ctSEQ}`}
                  className="active"
                  key={cat?.ctSEQ}
                >
                  {cat?.ctName}
                </a>
              ))}
            </div>
          </div>
          <section className="section">
            {posts?.map((po) => (
              <div
                onClick={() => {
                  setSelectedPostSEQ(po?.postSEQ);

                  setIsOpen(!isOpen);
                }}
                className="board"
                key={po?.postSEQ}
              >
                <div className="board-header">
                  <div className="board-header-time">
                    <Date postDate={po?.postDate} />
                  </div>
                  <div className="titleNickname">
                    <div className="title">{po?.postTitle}</div>
                  </div>
                  <div className="board-header-main">
                    <div className="profile">
                      <div className="profileFlex">
                        <a href="" className="profileImg">
                          <img
                            src={`/upload/${po?.userInfo?.profileImg}`}
                            alt="프로필 이미지"
                          />
                        </a>
                      </div>
                      <div>
                        <UserRating rating={po?.userInfo?.rating} />
                      </div>
                    </div>
                    <span className="nickname">
                      {po?.userInfo?.userNickname}
                    </span>
                    <div className="board-image-main">
                      {attachments.map((attachments) => (
                        <div className="board-image">
                          <img
                            src={`http://localhost:8080/qiri/public/upload/${attachments?.attachmentURL}`}
                          />
                        </div>
                      ))}
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
                    <p>{po?.place?.placeName}</p>
                    <p>{po?.place?.placeType?.placeTypeName}</p>
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
