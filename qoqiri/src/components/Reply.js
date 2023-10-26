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
    background: black;
    color: white;
    border-radius: 5px;
    margin: 10px;
    padding: 5px 10px;
  }
`;

const Reply = ({ reply }) => {
  const [content, setContent] = useState(reply.commentDesc);
  const contentRef = useRef(null);
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(deleteComment(reply.commentsSeq));
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
        commentParentSeq: reply.commentsParentSeq,
      })
    );
  };
  return (
    <Box>
      <h2>@{reply.userInfo.userId}</h2>
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
