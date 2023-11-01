import styled from "styled-components";
import AddComment from "./AddComment";
import { useState, useRef, useEffect } from "react";
import Reply from "./Reply";
import { useDispatch } from "react-redux";
import { deleteComment, updateComment } from "../store/commentSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import Date from "../components/Date";
import { getLike, postLike } from "../api/commentLike";
import axios from "axios";

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
  const onClick = () => {
    setIsActive(!isActive);
  };

  const handleBlur = () => {
    setContent(contentRef.current.innerText);
  };

  const likeAPI = async () => {
    const result = await getLike(comment.commentsSEQ);
    setLike(result.data); // 좋아요 수 설정
  };

  // Comment 컴포넌트 내부에 thumbsUp 함수 추가
  const thumbsUp = async () => {
    // 서버에 좋아요 요청을 보내고, 성공 시 화면에 반영
    try {
      // 좋아요를 누른 Comment의 ID를 서버로 전달
      const commentLikeId = comment.commentsSEQ;

      // 서버로 좋아요 정보를 전송
      const response = await postLike({
        commentLikeId,
        comments: comment,
        userInfo: comment.userInfo,
      });

      // 성공적으로 서버에서 처리되면 좋아요 수 업데이트
      if (response.status === 200) {
        setLike(like + 1); // 좋아요 수 증가
      } else {
        console.error("좋아요를 추가하는 중에 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("좋아요를 추가하는 중에 문제가 발생했습니다.", error);
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
            <FontAwesomeIcon
              icon={faThumbsUp}
              className="like"
              onClick={thumbsUp}
            />
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
        ?.filter((comment) => comment.commentDelete === "N")
        .map((reply) => (
          <Reply reply={reply} key={reply.commentsSEQ} />
        ))}
    </Box>
  );
};
export default Comment;
