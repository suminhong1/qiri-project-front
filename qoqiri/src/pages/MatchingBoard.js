// import React, { useEffect, useState } from "react";
import "../css/MatchingBoard.css";
// import { getCategories } from "../api/video";

const MatchingBoard = () => {
  // const [categories, setCategories] = useState([]);

  // const categoryAPI = async () => {
  //   const result = await getCategories();
  //   setCategories(result.data);
  // };
  // useEffect(() => {
  //   categoryAPI();
  // }, []);
  return (
    <>
      <div className="main-content">
        <nav>
          <a href="#" className="active">
            전체
          </a>
          {/* {categories.map((category) => (
            <a href={category.categoryCode} key={category.categoryCode}>
              {category.categoryName}
            </a>
          ))} */}
        </nav>
        <section>
          <div className="board">
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
                    <img src="" />
                    <img src="" />
                    <img src="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="write-board">
              <div className="write">
                글 작성 내용글 작성 내용글 작성 내용글 작성 내용글 작성 내용글
                작성 내용글 작성 내용글 작성 내용글 작성 내용글 작성 내용글 작성
                내용글 작성 내용글 작성 내용글 작성 내용글 작성 내용글 작성
                내용글 작성 내용글 작성 내용글 작성 내용글 작성 내용글 작성
                내용글 작성 내용글 작성 내용글 작성 내용글 작성 내용글 작성
                내용글 작성 내용글 작성 내용글 작성 내용글 작성 내용글 작성
                내용글 작성 내용글 작성 내용글 작성 내용글 작성 내용글 작성
                내용글 작성 내용글 작성 내용글 작성 내용글 작성 내용글 작성
                내용글 작성 내용글 작성 내용글 작성 내용글 작성 내용
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
          </div>
        </section>
      </div>
    </>
  );
};
export default MatchingBoard;
