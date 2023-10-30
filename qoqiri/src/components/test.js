import { useParams } from "react-router-dom";
import { createChatRoom, requestMatching } from "../api/chat";

//매칭신청버튼 누를때 동작할 함수
const test = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.user.token);

  const matchingButton = (postSEQ, id) => {
    requestMatching(postSEQ, id);

    const chatDTO = {
      postSEQ: postSEQ,
    };
  };
};

//게시글
