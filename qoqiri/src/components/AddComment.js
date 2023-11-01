import { addComment } from "../store/commentSlice";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useState } from "react";

const Form = styled.form`
  text-align: center;
  margin: 20px;

  &.active {
    display: none;
  }

  input[type="text"] {
    width: 90%;
    border: none;
    border-bottom: 1px solid #ddd;
    height: 4vh;
    font-size: 1rem;
    font-weight: 700;
    border-radius: 5px;
  }

  input[type="submit"] {
    background: orange;
    border-style: none;
    color: white;
    border-radius: 5px;
    margin: 10px;
    padding: 5px 10px;
    height: 25px;
    margin-left: 10px;
    font-size: 10px;
    font-weight: 700;
  }
`;

const AddComment = ({ code, active, parent }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const data = { post: code, commentDesc: comment };
    if (parent !== undefined) {
      data.commentsParentSeq = parent;
    }
    // console.log("댓글 추가 테스트!");
    // console.log(data);
    dispatch(addComment(data));
    setComment("");
  };
  return (
    <Form onSubmit={onSubmit} className={active ? "active" : ""}>
      <input
        type="text"
        value={comment}
        placeholder="댓글을 달아 원하는 끼리를 찾아보세요."
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <input type="submit" value="댓글" />
    </Form>
  );
};
export default AddComment;
