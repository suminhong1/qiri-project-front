import styled from "styled-components";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, updateComment } from "../store/commentSlice";

const Box = styled.div`
  width: 95%;
  margin: 0 auto;
  margin-bottom: 15px;

  h2 {
    font-weight: bold;
    margin-bottom: 5px;
  }
  button {
    background: #ff7f38;
    border-style: none;
    color: white;
    border-radius: 5px;
    padding: 5px 10px;
    height: 25px;
    margin-left: 10px;
    font-size: 10px;
    font-weight: 700;
  }
  span {
    font-weight: 700;
  }
`;

const Reply = ({ reply }) => {
  const [content, setContent] = useState(reply.commentDesc);
  const contentRef = useRef(null);
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(
      deleteComment({
        commentsSEQ: reply.commentsSEQ,
        post: reply.post,
        commentsParentSeq: reply.commentsParentSeq,
        userInfo: reply.userInfo,
        commentDesc: content,
        secretComment: "N",
        commentDelete: "Y",
      })
    );
    alert("댓글 삭제 완료!");
    window.location.reload();
  };
  const handleBlur = () => {
    setContent(contentRef.current.innerText);
  };
  const onUpdate = () => {
    dispatch(
      updateComment({
        commentsSEQ: reply.commentsSEQ,
        post: reply.post,
        commentDesc: content,
        commentsParentSeq: reply.commentsParentSeq,
      })
    );
    alert("댓글 수정 완료!");
    window.location.reload();
  };
  return (
    <Box>
      <h2>@{reply.userInfo.userNickname}</h2>
      <div>
        <span
          contentEditable="true"
          suppressContentEditableWarning
          ref={contentRef}
          onBlur={handleBlur}
        >
          {content}
        </span>
        <button onClick={onUpdate}>수정</button>
        <button onClick={onDelete}>삭제</button>
      </div>
    </Box>
  );
};
export default Reply;
