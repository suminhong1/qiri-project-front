import React, { useEffect, useState } from "react";
import "../css/MatchingBoard.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Date from "../components/Date";
import {
  getMatchCategoryInfo,
  getPosts,
  getPostsByCategoryType,
} from "../api/post";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { getCategoryTypes } from "../api/categoryType";
import { getCategories } from "../api/category";
import { getAttachmentsAll } from "../api/post";
import DetailView from "../components/DetailView";
import { useParams } from "react-router-dom";
import { asyncSearchResult } from "../store/postSlice";
import { getCommentCount } from "../api/post";
import defaultimg from "../assets/defaultimg.png";

const MatchingBoard = () => {
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPostSEQ, setSelectedPostSEQ] = useState(0);
  const [category, setCategory] = useState([]);
  const [categoryType, setCategoryType] = useState([]);
  const [selectedCatSEQ, setSelectedCatSEQ] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [commentCount, setCommentsCount] = useState(0);
  const [matchCate, setMatchCate] = useState([]);
  const { id } = useParams();

  const dispatch = useDispatch();
  const searchList = useSelector((state) => {
    return state.post;
  });

  useEffect(() => {
    setPosts(searchList);
  }, [searchList]);

  const PostsByCategoryTypeAPI = async () => {
    const result = await getPostsByCategoryType(id);
    setPosts(result.data);
  };

  const getPostsAPI = async () => {
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

  const attachmentsAPI = async () => {
    const result = await getAttachmentsAll();
    setAttachments(result.data);
  };

  const matchCategoryInfoAPI = async () => {
    const result = await getMatchCategoryInfo();
    setMatchCate(result.data);
  };

  const commentCountAPI = async () => {
    const counts = [];
    for (const post of posts) {
      const result = await getCommentCount(post.postSEQ);
      counts.push(result.data);
    }

    setCommentsCount(counts);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getPostsAPI();
  }, []);

  useEffect(() => {
    matchCategoryInfoAPI();
    attachmentsAPI(selectedPostSEQ);
  }, [posts]);

  useEffect(() => {
    if (posts.length > 0) {
      commentCountAPI();
    }
  }, [posts]);

  useEffect(() => {
    if (id == null) {
      getPostsAPI(); // id가 없을 때는 postsAPI 실행
    } else {
      PostsByCategoryTypeAPI(); // id가 있을 때는 PostsByCategoryTypeAPI 실행
    }
  }, [id]);

  useEffect(() => {
    categoryTypeAPI();
    categoryAPI();
  }, [selectedCatSEQ]);

  return (
    <div className="real-main">
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
          {posts?.map((po, index) => (
            <div
              onClick={() => {
                setSelectedPostSEQ(po?.postSEQ);

                setIsOpen(!isOpen);
              }}
              className="board"
              key={po?.postSEQ}
            >
              <div className="board-header-time">
                <Date postDate={po?.postDate} />
              </div>
              <div className="board-header">
                <div className="profile">
                  <img
                    src={
                      po?.userInfo?.profileImg
                        ? `/uploadprofile/${po?.userInfo?.profileImg}`
                        : defaultimg
                    }
                  />
                </div>
                <div className="titleNickname">
                  <div className="title">{po?.postTitle}</div>
                  <span className="nickname">{po?.userInfo?.userNickname}</span>
                </div>
              </div>
              <div className="board-image-main">
                {attachments
                  ?.filter(
                    (attachment) => attachment.post?.postSEQ === po.postSEQ
                  )
                  ?.map((filterattachment, index) => (
                    <div className="board-image" key={index}>
                      <img src={`/upload/${filterattachment?.attachmentURL}`} />
                    </div>
                  ))}
              </div>
              <div className="write-board">
                <div className="write">
                  {po.postContent}
                  <a href="#" className="comment-count">
                    <FontAwesomeIcon icon={faMessage} />
                    <div className="count">{commentCount[index]}</div>
                  </a>
                </div>
              </div>
              <div className="category">
                {matchCate
                  .filter((match) => match?.post?.postSEQ === po?.postSEQ)
                  ?.map((filteredMatch, index) => (
                    <span key={index}>
                      {filteredMatch?.category?.categoryName}
                    </span>
                  ))}
              </div>
              <div className="foot-place-detail">
                <p>{po?.place?.placeName}</p>
                <p>{po?.place?.placeType?.placeTypeName}</p>
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
  );
};
export default MatchingBoard;
