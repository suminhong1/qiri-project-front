import React, { useEffect, useState } from "react";
import "../css/MatchingBoard.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Test from "../components/Date";
// import black from "../assets/black.gif";

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/qiri",
});

export const getPost = async () => {
  return await instance.get("/public/post");
};

export const getComments = async () => {
  return await instance.get("/comments");
};

const DetailView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [comments, setComments] = useState([]);

  const openModal = (imageIndex) => {
    setSelectedImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImageIndex(0);
    setIsModalOpen(false);
  };

  const commentsAPI = async () => {
    const result = await getComments();
    setComments(result.data);
  };

  useEffect(() => {
    commentsAPI();
  }, []);

  const images = ["", "", ""];
  return (
    <>
      <div className="board-detail">
        <div className="board-header">
          <div className="board-header-time">3분전</div>
          <div className="titleNickname">
            <div className="title">솔로랭크 상관없이 구해요</div>
          </div>
          <div className="board-header-main">
            <div className="profile">
              <img src="" alt="프로필 이미지" className="profileImg" />
              <img src="" alt="유저 인기도" className="profileLike" />
            </div>
            <span className="nickname">냐오잉</span>
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
        <div className="write-board">
          <div className="write">
            글 작성 내용글 작성 내용글 작성 내용글 작성 내용글 작성 내용글 작성
            내용글 작성 내용글 작성 내용글 작성 내용글 작성 내용글 작성 내용글
            작성 내용글 작성 내용글 작성 내용글 작성 내용글 작성 내용글 작성
            내용글 작성 내용글 작성 내용글 작성 내용글 작성 내용글 작성 내용글
            작성 내용글 작성 내용글 작성 내용글 작성 내용글 작성 내용글 작성
            내용글 작성 내용글 작성 내용글 작성 내용글 작성 내용글 작성 내용글
            작성 내용글 작성 내용글 작성 내용글 작성 내용글 작성 내용글 작성
            내용글 작성 내용글 작성 내용글 작성 내용글 작성 내용글 작성 내용글
            작성 내용
            <a href="#" className="comment-count">
              <img src="" alt="comment" />
              <div className="count">0</div>
            </a>
          </div>
        </div>
        <div className="board-foot">
          <div className="board-foot-tag">
            <p className="foot-tag-type">#빡겜지향</p>
            <p className="foot-tag-type">#외향적</p>
            <p className="foot-tag-type">#직장인</p>
          </div>
          <div className="foot-place-detail">
            <p>서울특별시</p> <p>강남구</p>
          </div>
        </div>
        <hr />
        <div className="comment">
          <textarea placeholder="댓글달기"></textarea>
          <button>
            <img alt="댓글달기 버튼" />
          </button>
        </div>
        <hr />
        {comments.map((co) => (
          <div className="commentList">
            <div comment-profile>
              <img alt="프로필 이미지" />
              <div comment-profile-nickname>닉네임</div>
            </div>
            <div className="comment-content" key={co.commentsSeq}>
              {co.commentDesc}
            </div>
            <hr />
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
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
  const [post, setPost] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const postAPI = async () => {
    const result = await getPost();
    setPost(result.data);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    postAPI();
  }, []);
  return (
    <>
      <div className="main-content">
        <main className="main">
          <div className="select-bar">
            <div className="active-button">
              <a href="#" className="active">
                전체
              </a>
            </div>
          </div>
          <section className="section">
            {post.map((po) => (
              <div onClick={toggleModal} className="board">
                <div className="board-header">
                  <div className="board-header-time" key={po.postSEQ}>
                    <Test postDate={po.postDate} />
                  </div>
                  <div className="titleNickname">
                    <div className="title" key={po.postSEQ}>
                      {po.postTitle}
                    </div>
                  </div>
                  <div className="board-header-main">
                    <div className="profile">
                      <img src="" alt="프로필 이미지" className="profileImg" />
                      <img src="" alt="유저 인기도" className="profileLike" />
                    </div>
                    <span className="nickname" key={po.postSEQ}>
                      {po.postNickName}
                    </span>
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
                  <div className="write" key={po.postSEQ}>
                    {po.postContent}
                    <a href="#" className="comment-count">
                      <img src="" alt="comment" />
                      <div className="count">0</div>
                    </a>
                  </div>
                </div>
                <div className="board-foot">
                  <div className="board-foot-tag">
                    <p className="foot-tag-type">#빡겜지향</p>
                    <p className="foot-tag-type">#외향적</p>
                    <p className="foot-tag-type">#직장인</p>
                  </div>
                  <div className="foot-place-detail" key={po.postSEQ}>
                    <p key={po.postSEQ}>{po.placeSeq.placeName}</p>
                    <p key={po.postSEQ}>
                      {po.placeSeq.placeType.placeTypeName}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isOpen && (
              <div className="modal-main">
                <div className="modal-overlay">
                  <div className="modal">
                    <div className="close-button" onClick={closeModal}>
                      &times;
                    </div>
                    <DetailView />
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
