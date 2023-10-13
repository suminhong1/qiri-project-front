import "../css/ViewPost.css";
import logo from "../assets/logo.png";
import PostList from "../components/PostList";
import PageNation from "../components/PageNation";
import Counter from "../components/Counter";
import RightModal from "../components/RightModal";
import NavBtn from "../components/NavBtn";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../api/post";

const ViewPost = () => {
  const [bookMark, setBookMark] = useState(false);
  // const [likeCount, setLikeCount] = useState(0);
  const handleBookMark = () => {
    setBookMark(!bookMark);
    if (bookMark) {
      alert("게시물이 저장됐습니다.");
    } else {
      alert("게시물 저장이 해제됐습니다.");
    }
  };

  const { id } = useParams();
  const dispatch = useDispatch();

  const [post, setPost] = useState(null);
  //댓글 관련 추가해야됨

  const getPostAPI = async () => {
    const result = await getPost(id);
    setPost(result.data);
  };

  useEffect(() => {
    getPostAPI();
  }, []);

  //댓글관련 유즈이펙트 추가해야됨

  return (
    <>
      <main id="main">
        <div className="body" key={post?.postSEQ}>
          {/* <input type="hidden" className="title" value="수민이의 은퇴식" />
                    <input type="hidden" className="ogContent" value />
                    <input type="hidden" className="ogImage" value />
                    <input type="hidden" className="url" value /> */}
          <div className="back">
            <div className="bestBox">
              {/*홈버튼 쪼끔 수정 */}
              <a href="http://localhost:3000/">
                {/*Link to로 수정할거*/}
                <span className="gobest">Best</span>
                <img
                  src={logo}
                  className="ViewPost-logo"
                  alt="logo"
                  style={{ height: "30px", width: "auto" }}
                />
              </a>
            </div>
          </div>
          <div className="item">
            <div className="info">
              <div className="titleContainer">
                <div className="category" title="게시판에 맞는 카테고리">
                  <span>
                    <a href="#">게시판에 맞는 카테고리</a>
                  </span>
                </div>
                <span>
                  <h1>{post?.postTitle}</h1>
                </span>
              </div>
              <div className="etc">
                <div className="left">
                  <div className="userImage"></div>
                  <div className="nickName">{post?.userInfo.userNickname}</div>
                  <div className="dot"></div>
                  <div className="dateTime">{post?.postDate.substr(0, 10)}</div>
                  <div className="dot"></div>
                  <div className="viewCount">{post?.postView}</div>
                  <div className="dot"></div>
                  <div className="likeCount">
                    👍{/*여기도 카운팅 올라가는건 나중에 생각하자*/}
                  </div>
                </div>
                <div className="right">
                  <RightModal></RightModal>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="customField">
          출처 :<a href="#" target="_blank"></a>
        </div> */}
          <div className="customHtml"></div>
          <div className="bestContent">
            <p>{post?.postContent} 이게 지금 업로드한 컨텐츠 내용임</p>
          </div>
          <div className="html"></div>
          <div className="customHtml"></div>

          <div className="likeContainer">
            <div id="like" className="like">
              <Counter></Counter>{" "}
              {/*count={likeCount} setCount={setLikeCount}*/}
            </div>
            <div
              onClick={() => {
                handleBookMark();
              }}
            >
              <div>
                <div type="button" className="scrap">
                  <div className="scp">스크랩</div>
                  {bookMark ? (
                    <FontAwesomeIcon
                      icon={faBookmark}
                      style={{ color: "thistle" }}
                      className="sc"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faBookmark}
                      style={{ color: "#ff7f38" }}
                      className="sc"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="listAndEdit">
            <div className="left">
              <div className="button">
                <a href="#"> ☜ 이전 글 </a>
              </div>
            </div>
            <div className="center">
              <div className="button">
                <a href="#"> 목록 </a>
              </div>
            </div>
            <div className="right">
              <div className="button">
                <a href="#">다음 글 ☞</a>
              </div>
            </div>
          </div>
          <div className="commentTitle">댓글</div>
          <div className="comments" id="comments">
            여러 이용자들이 댓글쓴거랑 베댓 나오게해야함
          </div>
          <div className="commentContainer" id="newComment">
            <div className="contentContainer">
              <div className="commentInput">
                <div className="commentContent">
                  <textarea
                    disabled
                    name="content"
                    placeholder="로그인 해주세요"
                  ></textarea>
                </div>
                <div className="submit">
                  <button type="button">
                    {/*로그인 폼뜨게*/}
                    로그인
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="listAndEdit">
            <div className="left">
              <div className="button">
                <a href="#">목록</a>
              </div>
            </div>
            <div className="right"></div>
          </div>
        </div>
        <NavBtn />
        <PostList />
        <PageNation />
      </main>
    </>
  );
};
export default ViewPost;
