import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ApplyForm from "../components/ApplyForm";
import "../css/Apply.css";
import { getMatchingUserInfoByPostSEQ } from "../api/matching";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createGroupChat } from "../api/chat";

const Apply = () => {
  const [appliedUsers, setAppliedUsers] = useState([]);
  const navigate = useNavigate();
  const { postSEQ } = useParams();
  const user = useSelector((state) => state.user);

  const handleBack = () => {
    navigate("/myMatching");
  };

  // 모든 ApplyForm이 숨겨졌는지 여부를 계산하는 함수
    // userIds 배열의 모든 원소가 hiddenUserIds에 포함되어 있는지 검사
      userIds.length > 0 &&
      localStorage.setItem("hiddenUserIds", JSON.stringify(updatedIds)); // 로컬 스토리지에 저장
      return updatedIds;
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

  const groupChat = () => {
    alert("승락한 사람들이 모두 포함된 채팅방이 생성되었습니다!");
    createGroupChat(ChatDTO);
  };

  const matchingEnd = () => {
    alert("이제 즐겁게 노시길 바랍니다!");
    navigate("/myMatching");
  };

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
              <ApplyForm userId={userInfo.id} />
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
    </div>
  );
};

export default Apply;
