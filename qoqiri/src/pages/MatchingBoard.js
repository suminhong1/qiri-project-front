import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DetailView from "../components/DetailView";
import Date from "../components/Date";
import { getCategoryTypes } from "../api/categoryType";
import { getCategories } from "../api/category";
import { getAttachmentsAll } from "../api/post";
import { getCommentCount, getPlace, getPlaceType } from "../api/post";
import { userCategoryInfo } from "../api/category";
import { getBlockUser } from "../api/blockuser";
import {
  getMatchCategoryInfo,
  getPosts,
  getPostsByCategoryType,
} from "../api/post";
import "../css/MatchingBoard.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
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
  const [place, setPlace] = useState([]);
  const [placeType, setPlaceType] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [selectedPlace, setSelectedPlace] = useState();
  const [selectedPlaceType, setSelectedPlaceType] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [userCategories, setUserCategories] = useState([]);

  const user = useSelector((state) => state.user);

  const [blockUser, setBlockUser] = useState([]);

  const blockUserAPI = async () => {
    const result = await getBlockUser(user.id);
    setBlockUser(result.data);
  };

  useEffect(() => {
    blockUserAPI();
    blockUserPost();
  }, [user]);

  const userCategoryAPI = async () => {
    const result = await userCategoryInfo();
    setUserCategories(result.data);
  };

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

  const handleShowOnlyUserCategories = () => {
    // 사용자 카테고리를 기반으로 게시물 필터링
    const filtered = posts.filter((post) => {
      return userCategories.some((category) =>
        post.categories.some(
          (postCategory) =>
            postCategory.categoryType.ctSEQ === category.categoryType.ctSEQ
        )
      );
    });

    setFilteredPosts(filtered);
  };

  const blockUserPost = () => {
    const filteredBlock = posts.filter(
      (post) => post?.userInfo?.userId !== blockUser?.blockInfo?.userId
    );
    setPosts(filteredBlock);
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

  // 지역으로 게시물 검색하기

  // place 리스트 불러오기
  const placeAPI = async () => {
    const result = await getPlace();
    setPlace(result.data);
  };

  // placeType 리스트 불러오기
  const placeTypeAPI = async () => {
    const result = await getPlaceType();
    setPlaceType(result.data);
  };

  const handlePlaceTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedPlaceType(selectedType);

    // 선택한 장소 유형에 따라 장소 필터링
    const filtered = place.filter(
      (place) => place.placeType.placeTypeSEQ == selectedType
    );
    setFilteredPlaces(filtered);

    // 장소 유형이 변경될 때 선택한 장소를 재설정합니다.
    setSelectedPlace(null);

    // 선택한 장소 유형 및 장소에 따라 게시물 필터링
    filterPosts(selectedType, null);
  };

  const handlePlaceChange = (event) => {
    const selectedPlace = event.target.value;
    setSelectedPlace(selectedPlace);

    // 선택한 장소 유형 및 장소에 따라 게시물 필터링
    filterPosts(selectedPlaceType, selectedPlace);
  };

  const filterPosts = (placeType, place) => {
    // 장소 유형과 장소가 모두 선택된 경우, 해당하는 게시물을 필터링합니다.
    if (placeType && place) {
      const filtered = posts.filter(
        (post) =>
          post.place?.placeType?.placeTypeSEQ == placeType &&
          post.place?.placeSEQ == place
      );
      setFilteredPosts(filtered);
    } else {
      // 장소 유형이나 장소 중 하나가 선택되지 않은 경우 모든 게시물을 표시합니다.
      setFilteredPosts(posts);
    }
  };

  const handleSearch = () => {
    filterPosts(selectedPlaceType, selectedPlace);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // 선택한 장소 및 장소 유형에 따라 게시물을 가져옵니다.
    filterPosts(selectedPlaceType, selectedPlace);
  }, [selectedPlaceType, selectedPlace, posts]);

  useEffect(() => {
    placeAPI();
    placeTypeAPI();
    userCategoryAPI();
  }, []);

  useEffect(() => {
    matchCategoryInfoAPI();
    attachmentsAPI(selectedPostSEQ);
    console.log(blockUser);
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
        <div className="place-box">
          <h1>지역 선택</h1>
          <select onChange={handlePlaceTypeChange}>
            <option value="">지역을 선택해주세요</option>
            {placeType.map((type) => (
              <option key={type.placeTypeSEQ} value={type.placeTypeSEQ}>
                {type.placeTypeName}
              </option>
            ))}
          </select>

          {selectedPlaceType && (
            <div className="place-box">
              <h2>상세 지역</h2>
              <select onChange={handlePlaceChange}>
                <option value="">상세 지역을 선택해주세요</option>
                {filteredPlaces.map((place) => (
                  <option key={place.placeSEQ} value={place.placeSEQ}>
                    {place.placeName}
                  </option>
                ))}
              </select>
            </div>
          )}
          {/* <button onClick={handleSearch}>검색하기</button> */}
        </div>
        <div className="userCategory">
          <button onClick={handleShowOnlyUserCategories}>
            내 관심사만 보기
          </button>
        </div>
        <section className="section">
          {filteredPosts.length === 0 ? (
            <p>검색 결과가 없습니다.</p>
          ) : (
            filteredPosts?.map((po, index) => (
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
                    <span className="nickname">
                      {po?.userInfo?.userNickname}
                    </span>
                  </div>
                </div>
                <div className="board-image-main">
                  {attachments
                    ?.filter(
                      (attachment) => attachment.post?.postSEQ === po.postSEQ
                    )
                    ?.map((filterattachment, index) => (
                      <div className="board-image" key={index}>
                        <img
                          src={`/upload/${filterattachment?.attachmentURL}`}
                        />
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
            ))
          )}
          {isOpen && (
            <div className="Matching-modal-main">
              <div className="Matching-modal-overlay">
                <div className="Matching-modal">
                  <div className="close-button" onClick={closeModal}>
                    &times;
                  </div>
                  <DetailView
                    selectedPostSEQ={selectedPostSEQ}
                    attachments={attachments}
                  />
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
