import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DetailView from "../components/DetailView";
import ApplyForm from "../components/ApplyForm";
import Date from "../components/Date";
import { getCategoryTypes } from "../api/categoryType";
import { getCategories } from "../api/category";
import { getAttachmentsAll } from "../api/post";
import { getCommentCount, getPlace, getPlaceType } from "../api/post";
import { getUserCategory } from "../api/category";
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
  const [userCategory, setUserCategory] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryType, setCategoryType] = useState([]);
  const [selectedCatSEQ, setSelectedCatSEQ] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [commentCount, setCommentsCount] = useState(0);
  const [matchCate, setMatchCate] = useState([]);
  const [page, setPage] = useState(1); // 페이지 번호 추가
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const { id } = useParams();
  const [place, setPlace] = useState([]);
  const [placeType, setPlaceType] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState();
  const [selectedPlaceType, setSelectedPlaceType] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const user = useSelector((state) => state.user);
  const [blockUser, setBlockUser] = useState([]);
  const [blockUserFetched, setBlockUserFetched] = useState(false); // 계속 가져와서 한번만 가져오도록 조건 걸음
  const [applyFormUserId, setApplyFormUserId] = useState(null); // Add this line
  const [isApplyFormModalOpen, setIsApplyFormModalOpen] = useState(false);

  const openApplyFormModal = (userId) => {
    setApplyFormUserId(userId);
    setIsApplyFormModalOpen(true);
  };

  // 게시물 불러오는 API
  const getPostsAPI = async () => {
    const result = await getPosts();
    setPosts(result.data);
  };

  // 검색기능
  const searchList = useSelector((state) => {
    return state.post;
  });

  useEffect(() => {
    setPosts(searchList);
  }, [searchList]);

  // 카테고리 타입 SEQ받아서 해당하는 POST가져오기
  const PostsByCategoryTypeAPI = async () => {
    const result = await getPostsByCategoryType(id);
    setPosts(result.data);
  };

  // 카테고리 불러오는 API
  const categoryAPI = async () => {
    const result = await getCategories();
    setCategory(result.data);
  };

  // 카테고리 타입 불러오는 API
  const categoryTypeAPI = async () => {
    const result = await getCategoryTypes();
    setCategoryType(result.data);
  };

  // 카테고리, 카테고리 타입 PostSEQ로 불러오는 useEffect
  useEffect(() => {
    categoryTypeAPI();
    categoryAPI();
  }, [selectedCatSEQ]);

  // 매칭 카테고리 인포 불러오는 API
  const matchCategoryInfoAPI = async () => {
    const result = await getMatchCategoryInfo();
    setMatchCate(result.data);
  };

  // 첨부한 첨부파일 불러오는 API
  const attachmentsAPI = async () => {
    const result = await getAttachmentsAll();
    setAttachments(result.data);
  };

  useEffect(() => {
    matchCategoryInfoAPI();
    attachmentsAPI(selectedPostSEQ);
  }, [posts]);

  const commentCountAPI = async () => {
    const counts = [];
    for (const post of posts) {
      const result = await getCommentCount(post.postSEQ);
      counts.push(result.data);
    }

    setCommentsCount(counts);
  };

  useEffect(() => {
    if (posts.length > 0) {
      commentCountAPI();
    }
  }, [posts]);

  // 내가 선택한 관심사 불러오는 API
  const getUserCategoryAPI = async () => {
    const result = await getUserCategory(user.id);
    setUserCategory(result.data);
  };

  useEffect(() => {
    getUserCategoryAPI();
  }, [user]);

  // 내 관심사 만 보기
  const viewCategory = () => {
    const filteredPosts = posts.filter((post) => {
      const matchingCategory = matchCate.find(
        (match) => match.post.postSEQ === post.postSEQ
      );
      return (
        matchingCategory &&
        userCategory.some(
          (userCat) =>
            userCat.category.categorySEQ ===
            matchingCategory.category.categorySEQ
        )
      );
    });

    setFilteredPosts(filteredPosts);
  };

  // 차단유저
  const blockUserAPI = async () => {
    try {
      if (!blockUserFetched) {
        const result = await getBlockUser(user.id);
        setBlockUser(result.data);
        setBlockUserFetched(true);
      }
    } catch (error) {}
  };

  const blockUserPost = () => {
    // 차단 유저 필터링
    // if (blockUser.length > 0) {
    const filteredBlock = posts.filter(
      (post) =>
        !blockUser.some(
          (blockedUser) =>
            post.userInfo.userId === blockedUser.blockInfo.userId &&
            blockedUser.unblock !== "N"
        )
    );
    setPosts(filteredBlock);
    // }
  };

  useEffect(() => {
    blockUserAPI();
    blockUserPost();
  }, [user, blockUserFetched]);

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

  useEffect(() => {
    placeAPI();
    placeTypeAPI();
  }, []);

  // 지역으로 게시물 검색하기
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

  useEffect(() => {
    filterPosts(selectedPlaceType, selectedPlace);
  }, [selectedPlaceType, selectedPlace, posts]);

  useEffect(() => {
    if (id == null) {
      getPostsAPI(); // id가 없을 때는 postsAPI 실행
    } else {
      PostsByCategoryTypeAPI(); // id가 있을 때는 PostsByCategoryTypeAPI 실행
    }
  }, [id]);

  const loadMorePosts = async () => {
    setLoading(true);

    const nextPage = page + 1;
    const result = await getPosts(nextPage);

    if (result.data.length > 0) {
      // 새로운 페이지에 게시물이 있을 경우
      setPosts([...posts, ...result.data]);
      setPage(nextPage);
    } else {
      // 마지막 페이지인 경우, 모든 게시물을 가져옴
      setPosts([...posts, ...result.data]);
    }

    setLoading(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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
        <div className="search-box">
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
                <h1>상세 지역</h1>
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
          </div>
          <div className="userCategory">
            <button onClick={viewCategory}>내 관심사만 보기</button>
          </div>
        </div>
        <section className="section">
          {filteredPosts.length === 0 ? (
            <p className="noContent">검색 결과가 없습니다.</p>
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
                      onClick={openApplyFormModal}
                    />
                  </div>
                  <div className="titleNickname">
                    <div className="title">{po?.postTitle}</div>
                    <span className="nickname" onClick={openApplyFormModal}>
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

          {loading && <p>Loading...</p>}

          {!loading && posts.length > 0 && (
            <button
              onClick={loadMorePosts}
              style={{
                background: "antiquewhite",
                color: "#ff9615",
                fontWeight: "bold",
                borderRadius: "5px",
                border: "none",
                marginLeft: "10px",
              }}
            >
              더 보기
            </button>
          )}

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
          {/* ApplyForm Modal */}
          {isApplyFormModalOpen && (
            <div className="Matching-modal-main">
              <div className="Matching-modal-overlay">
                <div className="Matching-modal">
                  <div className="close-button" onClick={closeModal}>
                    &times;
                  </div>
                  <ApplyForm userId={applyFormUserId} />
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
