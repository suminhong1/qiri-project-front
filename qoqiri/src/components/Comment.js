import styled from "styled-components";
import AddComment from "./AddComment";
import { useState, useRef } from "react";
import Reply from "./Reply";
import { useDispatch } from "react-redux";
import { deleteComment, updateComment } from "../store/commentSlice";

const Box = styled.div`
  width: 95%;
  margin: 10px auto;
  margin-bottom: 30px;

  h2 {
    font-weight: bold;
    margin-bottom: 5px;
  }
  button {
    background: black;
    color: white;
    border-radius: 5px;
    margin: 10px;
    padding: 5px 10px;
  }
`;

const Comment = ({ comment }) => {
  const [isActive, setIsActive] = useState(true);
  const [content, setContent] = useState(comment.commentDesc);
  const contentRef = useRef(null);
  const dispatch = useDispatch();
  const onClick = () => {
    setIsActive(!isActive);
  };

  const handleBlur = () => {
    setContent(contentRef.current.innerText);
  };

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
      <div>
        <span
          contentEditable="true"
          suppressContentEditableWarning
          ref={contentRef}
          onBlur={handleBlur}
        >
          {content}
        </span>
        <button onClick={onClick}>답글</button>
        <button onClick={onUpdate}>수정</button>
        <button onClick={onDelete}>삭제</button>
      </div>
      <AddComment
        active={isActive}
        parent={comment.commentsSEQ}
        code={comment.post}
      />
      {comment.replies?.map((reply) => (
        <Reply reply={reply} key={reply.commentsSEQ} />
      ))}
    </Box>
  );
};
export default Comment;
