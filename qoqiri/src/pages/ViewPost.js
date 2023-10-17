import "../css/ViewPost.css";
import logo from "../assets/logo.png";
import Counter from "../components/Counter";
import RightModal from "../components/RightModal";
import NavBtn from "../components/NavBtn";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPost, getSearch } from "../api/post";
import { getBoards, getPostList } from "../api/post";
import kkorang from "../assets/kkorang3.jpg";
import Paging from "../components/Paging";
import styled from "styled-components";

const ViewPost = () => {
  const [bookMark, setBookMark] = useState(false);
  const [selectedPostSEQ, setSelectedPostSEQ] = useState(null);
  // const [likeCount, setLikeCount] = useState(0);
  const [post, setPost] = useState(null);
  const [postList, setPostList] = useState([]);
  const [board, setBoard] = useState(null);
  const [boards, setBoards] = useState([]);
  const [page, setPage] = useState(1);
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

  //댓글 관련 추가해야됨

  // 프론트단에서 보여질수있게 하는것
  // post API에서 getBoards랑 getPosts를 둘다써야함 강사님 유튜브 home.js랑 watch.js참고

  const handlePostClick = (id) => {
    console.log(id, post?.postSEQ, selectedPostSEQ);
    if (id === selectedPostSEQ) {
      setSelectedPostSEQ(null);
    } else {
      setSelectedPostSEQ(id);
    }
  };

  const getPostAPI = async () => {
    const result = await getPost(id);
    setPost(result.data);
  };

  const boardAPI = async () => {
    const result = await getBoards();
    setBoards(result.data);
  };

  const getPostListAPI = async () => {
    const result = await getPostList(page, board);
    setPostList([...postList, ...result.data]);
  };

  const boardFilterAPI = async () => {
    const result = await getPostList(page, board);
    setPostList(result.data);
  };

  const filterBoard = (e) => {
    e.preventDefault();
    const href = e.target.href.split("/");
    console.log(href[href.length - 1]);
    setBoard(parseInt(href[href.length - 1]));
    setPage(1);
    setPostList([]);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("keyword", e.target.keyword.value);

    getSearch(formData.get("keyword"));
  };

  useEffect(() => {
    boardAPI();
    getPostListAPI();
  }, []);

  useEffect(() => {
    getPostAPI();
  }, [id]);

  useEffect(() => {
    handlePostClick(id);
  }, [post]);

  useEffect(() => {
    if (board != null) {
      console.log(board);
      getPostListAPI();
    }
  }, [board]);

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
              <a href="/bestPost">
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
                  <div className="dateTime">
                    {post?.postDate.substr(5, 5)}일
                  </div>
                  <div className="dot"></div>
                  <div className="viewCount">{post?.postView}</div>
                  <div className="dot"></div>
                  <div className="likeCount">
                    👍{/*여기도 카운팅 올라가는건 나중에 생각하자*/}
                  </div>
                </div>
                <div className="right">
                  <RightModal />
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
                <a href="/bestPost"> 목록</a>
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
                <a href="/bestPost">목록</a>
              </div>
            </div>
            <div className="right"></div>
          </div>
        </div>
        <h2 className="bottomBoardListHeader"> 전체글</h2>
        <section id="boardList" className="simple">
          <div className="item listHeader">
            <div className="info2">
              <div className="titleContainer">
                <div className="categoryContainer">
                  <span className="underListCategory">카테고리</span>
                </div>
                <span className="title">
                  <span className="text1">제목</span>
                </span>
              </div>
              <div className="etc1">
                <div className="nickName">글쓴이</div>
                <div className="datetime field">날짜</div>
                <div className="viewCount number">조회</div>
                <div className="likeCount number">추천</div>
              </div>
            </div>
          </div>

          {postList.map((post) => (
            <a
              key={post.postSEQ}
              href={`/viewpost/${post?.postSEQ}`}
              className={`underList ${
                selectedPostSEQ === post?.postSEQ ? "clicked" : ""
              }`}
              style={{
                backgroundColor:
                  selectedPostSEQ === post?.postSEQ ? "black" : "transparent",
              }}
            >
              <div className="info3">
                <div className="titleContainer">
                  <span className="title">
                    <span className="category">{post?.category}</span>
                    <span className="PostListTitle">{post?.postTitle}</span>
                    <span className="commentCount">{post?.commentCount}</span>
                  </span>
                </div>
                <div className="etc1">
                  {console.log(post)}
                  <div className="bestImage">
                    {/*백단 도메인의 필드명이랑 이름맞춰줘야함 */}
                    {/* 여기 이제 url 방식으로 Blob써서 넣어야함 */}
                    <img
                      src={kkorang}
                      style={{
                        maxWidth: "100%",
                        height: "30px",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        borderRadius: "3px",
                      }}
                    />
                  </div>
                  <div className="nickName">{post?.userInfo.userNickname}</div>
                  <div className="dot"></div>
                  <div className="datetime field">
                    {post?.postDate.substr(5, 5)}
                  </div>
                  <div className="dot"></div>
                  <div className="viewCount number">
                    <i className="view">{post?.postView}</i>
                  </div>
                  <div className="dot"></div>
                  <div className="likeCount number">
                    <i className="like">{post?.likeCount}👍</i>
                  </div>
                  <div className="dot"></div>
                </div>
              </div>
            </a>
          ))}
        </section>
        <NavBtn />
        <Paging />
        <div className="searchAndWrite">
          <div></div>
          <div>
            <form onSubmit={searchHandler}>
              <div className="search">
                <select name="searchType">
                  <option value={"title"}>제목</option>
                  <option value={"titleAndContent"}>제목+내용</option>
                  <option value={"nickName"}>글쓴이</option>
                </select>
                <input type="text" name="keyword" maxLength={50} />
                <button type="submit">검색</button>
              </div>
            </form>
          </div>
          <div className="write"> </div>
        </div>
      </main>
    </>
  );
};
export default ViewPost;
