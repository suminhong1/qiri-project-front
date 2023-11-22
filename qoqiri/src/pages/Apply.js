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

const Apply = () => {
  const [appliedUsers, setAppliedUsers] = useState([]);
  const [chatRoomSEQ, setChatRoomSEQ] = useState(null);
  const navigate = useNavigate();
  const { postSEQ } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleBack = () => {
    navigate("/myMatching");
  };

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
    const result = await createGroupChat(ChatDTO);
    await setChatRoomSEQ(result.data.chatRoomSEQ);
    await dispatch(asyncChatRooms(user.id));
  };

  const matchingEnd = () => {
    alert("즐겁게 노시길 바랍니다!");
    navigate("/myMatching");
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
    <div className="ApplyMain">
      <div className="AC">
        <div className="Applytag">궁금해요</div>
        <button className="ap-backButton" onClick={handleBack}>
          뒤로가기
        </button>
        {console.log("보이니?" + appliedUsers)}

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
  );
};

export default Apply;
