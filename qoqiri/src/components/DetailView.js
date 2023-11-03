import React, { useEffect, useState } from "react";
import "../css/MatchingBoard.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Date from "../components/Date";
import { getPost, getPosts } from "../api/post";
import UserRating from "../components/UserRating";
import { viewComments } from "../store/commentSlice";
import { useSelector, useDispatch } from "react-redux";
import AddComment from "../components/AddComment";
import Comment from "../components/Comment";
import { ApplyUserInfo } from "../api/matching"; // 신청버튼테스트용
import { createChatRoom, joinChatRoom } from "../api/chat";

const DetailView = ({ selectedPostSEQ, attachments }) => {
  console.log("attachments in DetailView:", attachments); // attachments 값을 콘솔에 출력
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [post, setPost] = useState({});
  const [commentsCount, setCommentsCount] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
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

  const postsAPI = async () => {
    const result = await getPosts();
    setPosts(result.data);
  };
  const getPostAPI = async () => {
    const result = await getPost(selectedPostSEQ);
    setPost(result.data);
  };

  const ChatDTO = {
    id: user.id,
    postSEQ: selectedPostSEQ,
  };

  const handleApplyClick = async () => {
    // 현재 선택한 게시물을 찾기. (게시물 정보 가져오기)
    const currentPost = posts.find((po) => po.postSEQ === selectedPostSEQ);

    if (!user.id || !user.token) {
      // user.id 또는 user.token이 없다면 로그인되지 않은 것으로 간주
      alert("로그인해주세요");
      return;
    }
    console.log("아이디 가져오기", user.id);
    console.log("작성자 " + currentPost?.userInfo?.userId);
    console.log("커랜트" + currentPost);
    console.log("커랜트유저인포" + currentPost?.userInfo);
    console.log("posts" + posts.find((po) => po.postSEQ === selectedPostSEQ));

    // 작성자의 ID와 로그인한 사용자의 ID가 동일한지 확인
    if (currentPost?.userInfo?.userId === user.id) {
      alert("본인이 작성한 게시물에는 신청할 수 없습니다.");
      return;
    }

    try {
      const response = await saveData(user, selectedPostSEQ);
      joinChatRoom(ChatDTO);

      if (response) {
        console.log("신청 성공 및 채팅방 생성!");
      }
    } catch (error) {
      console.error("신청 중 오류 발생:", error);
    }
  };

  const saveData = async () => {
    // 토큰 가져오기
    const dataToSend = {
      token: user.token, // 토큰 추가
      postSEQ: selectedPostSEQ,
    };
    console.log(dataToSend);

    try {
      const response = await ApplyUserInfo(dataToSend);

      if (response.status === 200) {
        console.log("데이터 저장 성공");
        alert("신청 성공 및 채팅방 생성!");
        window.location.reload();
        return response.data;
      } else {
        console.error("데이터 저장 실패");
      }
    } catch (error) {
      alert("이미 신청한 게시물입니다.", error);
    }
  }; // 신청버튼테스트용

  useEffect(() => {
    getPostAPI();
    postsAPI();
  }, []);

  useEffect(() => {
    dispatch(viewComments(selectedPostSEQ));
  }, [dispatch]);

  const attachment = attachments.attachmentURL || []; // 이미지 정보를 포함하는 배열
  console.log(attachment);
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
              <div className="profileFlex">
                <a href="" className="profileImg">
                  <img
                    src={`/upload/${post?.userInfo?.profileImg}`}
                    alt="프로필 이미지"
                  />
                </a>
              </div>
              {/* <UserRating rating={post?.userInfo?.rating} /> */}
            </div>
            <span className="nickname">{post?.userInfo?.userNickname}</span>
            <div className="board-image-main">
              <div className="board-image">
                {attachments.map((attachment, index) => (
                  <img
                    key={index}
                    src={attachment.attachmentURL}
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
          <button className="play" onClick={handleApplyClick}>
            같이놀자!
          </button>
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
              {attachments.map((imageSrc, index) => (
                <div key={index}>
                  <img src={imageSrc} alt={`이미지 ${index + 1}`} />
                </div>
              ))}
            </Carousel>

            <div
              onClick={() => {
                if (selectedImageIndex < attachment.length - 1) {
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
export default DetailView;
