import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ApplyForm from "../components/ApplyForm";
import "../css/Apply.css";
import { getMatchingUserInfoByPostSEQ } from "../api/matching";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createGroupChat } from "../api/chat";
import ChatRoomModal from "../components/ChatRoomModal";
import { asyncChatRooms } from "../store/chatRoomSlice";
import styled from "styled-components";
import { matchedPost } from "../api/post";

const StyledApply = styled.div`
  padding-left: 240px;
  width: 100%;
  .ApplyMain {
    width: 90%;
    min-width: 1100px;
    height: 800px;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: 30px;
    border-radius: 20px;
    background-color: rgb(247, 242, 235);
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-x: auto;
  }
`;

const Apply = () => {
  const [appliedUsers, setAppliedUsers] = useState([]);
  const [chatRoomSEQ, setChatRoomSEQ] = useState(null);
  const navigate = useNavigate();
  const { postSEQ } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchAppliedUserIds = async () => {
      const response = await getMatchingUserInfoByPostSEQ(postSEQ);

      setAppliedUsers(
        response.data.filter((info) => info.matchingAccept !== "H")
      );
    };
    if (user.id) {
      fetchAppliedUserIds();
    }
  }, [postSEQ, user.id]);

  const groupChat = async () => {
    alert("그룹채팅방이 생성되었습니다!");
    const result = await createGroupChat(ChatDTO);
    await setChatRoomSEQ(result.data.chatRoomSEQ);
    await dispatch(asyncChatRooms(user.id));
  };

  const matchingEnd = () => {
    alert("즐겁게 노시길 바래요!");
    matchedPost(postSEQ);
    navigate("/matchingBoard");
  };

  // ChatRoom 모달을 닫기 위한 함수
  const handleCloseChatRoom = () => {
    setChatRoomSEQ(null);
  };

  // ChatRoom 모달이 열려 있는지 확인
  const isChatRoomModalOpen = chatRoomSEQ !== null;

  const ChatDTO = {
    id: user.id,
    postSEQ: postSEQ,
  };

  return (
    <StyledApply>
      <div className="ApplyMain">
        <div className="AC">
          {appliedUsers.length === 0 ? (
            <p className="ap-empty-p">터엉...ㅠㅠ</p>
          ) : (
            appliedUsers.map((userInfo) => (
              <section className="ap-section" key={userInfo.id}>
                <div className=".apply-form">
                  <ApplyForm userId={userInfo.id} />
                </div>
              </section>
            ))
          )}
        </div>
        <button className="ap-left-bottom-button" onClick={groupChat}>
          승락한 사람 모두와 떠들기! Click!
        </button>
        <button className="ap-right-bottom-button" onClick={matchingEnd}>
          같이 놀 사람을 모두 구했어요! Click!
        </button>
        <ChatRoomModal
          show={isChatRoomModalOpen}
          handleClose={handleCloseChatRoom}
          chatRoomSEQ={chatRoomSEQ}
        />
      </div>
    </StyledApply>
  );
};

export default Apply;
