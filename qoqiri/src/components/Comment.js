import styled from "styled-components";
import AddComment from "./AddComment";
import { useState, useRef, useEffect } from "react";
import Reply from "./Reply";
import { useDispatch } from "react-redux";
import { deleteComment, updateComment } from "../store/commentSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as solidThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Date from "../components/Date";
import { getLike, postLike, delLike } from "../api/commentLike";

import axios from "axios";
import { faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons";

const Box = styled.div`
  width: 95%;
  margin: 10px auto;
  margin-bottom: 30px;

  h2 {
    font-weight: bold;
    margin-bottom: 10px;
  }
  .buttons {
    display: flex;
    height: 30px;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  .comment-button {
    background: orange;
    color: white;
    border-radius: 5px;
    padding: 5px 10px;
    height: 25px;
    margin-left: 10px;
    border-style: none;
    font-size: 10px;
    font-weight: 700;
  }

  .buttonFlex {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .like {
    cursor: pointer;
    color: #ff9326;
  }
  .like:hover {
    color: #ff7200;
  }
  .like-count {
    display: flex;
    gap: 6px;
  }
  .like-count {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 750;
  }

  .spanButton {
    display: flex;
  }
  .spanButton span {
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Comment = ({ comment }) => {
  const [isActive, setIsActive] = useState(true);
  const [content, setContent] = useState(comment.commentDesc);
  const [like, setLike] = useState(0);
  const contentRef = useRef(null);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [seq, setSeq] = useState(0);

  const onClick = () => {
    setIsActive(!isActive);
  };

  const handleBlur = () => {
    setContent(contentRef.current.innerText);
  };

  const likeAPI = async () => {
    // 서버에서 사용자가 현재 Comment를 좋아요 했는지 여부를 확인
    const result = await getLike(comment.commentsSEQ);
    setLiked(result.data > 0); // 사용자가 좋아요를 했으면 true, 아니면 false로 설정
    setLike(result.data); // 좋아요 수 설정
  };

  const toggleLike = async () => {
    if (liked) {
      // 이미 좋아요를 누른 상태면 좋아요 취소 API를 호출
      // console.log(comment.commentsSEQ);
      // console.log(seq);
      const response = await delLike(seq); // 좋아요 삭제 API 호출
      // console.log(response);
      if (response.status === 200) {
        setLiked(false); // 사용자의 좋아요 상태 업데이트
        setLike(like - 1); // 좋아요 수 감소
      } else {
        console.error("좋아요 취소 중에 문제가 발생했습니다.");
      }
      try {
      } catch (error) {
        console.error("좋아요 취소 중에 문제가 발생했습니다.", error);
      }
    } else {
      // 아직 좋아요를 누르지 않았으면 좋아요 API를 호출
      try {
        const commentLikeId = comment.commentsSEQ;
        const response = await postLike({
          commentLikeId,
          comments: comment,
          userInfo: comment.userInfo,
        });
        // console.log(response.data.clSEQ);
        setSeq(response.data.clSEQ);
        if (response.status === 200) {
          setLiked(true); // 사용자의 좋아요 상태 업데이트
          setLike(like + 1); // 좋아요 수 증가
        } else {
          console.error("좋아요 추가 중에 문제가 발생했습니다.");
        }
      } catch (error) {
        console.error("좋아요 추가 중에 문제가 발생했습니다.", error);
      }
    }
  };

  useEffect(() => {
    likeAPI(); // 컴포넌트 렌더링 시 좋아요 수 가져오기
  }, []);

  const onUpdate = () => {
    dispatch(
      updateComment({
        commentsSEQ: comment.commentsSEQ,
        post: comment.post,
        commentDesc: content,
      })
    );
  };
  const onDelete = () => {
    dispatch(
      deleteComment({
        commentsSEQ: comment.commentsSEQ,
        post: comment.post,
        commentsParentSeq: comment.commentsParentSeq,
        userInfo: comment.userInfo,
        commentDesc: content,
        secretComment: "N",
        commentDelete: "Y",
      })
    );
  };

  return (
    <Box>
      <h2>@{comment.userInfo.userNickname}</h2>
      <div className="buttons">
        <div className="spanButton">
          <span
            contentEditable="true"
            suppressContentEditableWarning
            ref={contentRef}
            onBlur={handleBlur}
          >
            {content}
          </span>
          <div className="buttonFlex">
            <button className="comment-button" onClick={onClick}>
              <p>답글</p>
            </button>
            <button className="comment-button" onClick={onUpdate}>
              수정
            </button>
            <button className="comment-button" onClick={onDelete}>
              삭제
            </button>
          </div>
        </div>
        <div className="like-count">
          <Date postDate={comment.commentDate} className="like-count" />
          <div className="like-count">
            {liked ? ( // liked 상태에 따라 아이콘 변경
              <FontAwesomeIcon
                icon={solidThumbsUp}
                className="like"
                onClick={toggleLike}
              />
            ) : (
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="like"
                onClick={toggleLike}
              />
            )}
            {like}
            {/* 좋아요 수 렌더링 */}
          </div>
        </div>
      </div>

      <AddComment
        active={isActive}
        parent={comment.commentsSEQ}
        code={comment.post}
      />
      {comment.replies
        ?.filter((comment) => comment.commentDelete == "N")
        .map((reply) => (
          <Reply reply={reply} key={reply.commentsSEQ} />
        ))}
    </Box>
  );
};
export default Comment;
