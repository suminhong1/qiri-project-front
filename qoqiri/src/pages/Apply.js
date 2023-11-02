import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ApplyForm from "../components/ApplyForm";
import "../css/Apply.css";
import { getMatchingUserInfoByPostSEQ } from "../api/matching";
import { useNavigate } from "react-router-dom"; // 추가
import { useParams } from "react-router-dom"; // useParams 추가
import { useSelector } from "react-redux";

const Apply = () => {
  const [userIds, setUserIds] = useState([]);
  const [hiddenUserIds, setHiddenUserIds] = useState([]);
  const navigate = useNavigate();
  const { postSEQ } = useParams();
  const user = useSelector((state) => state.user);

  const handleBack = () => {
    navigate("/myMatching");
  };

  const handleHideSection = (userId) => {
    setHiddenUserIds((prevIds) => [...prevIds, userId]);
  };

  useEffect(() => {
    const fetchAppliedUserIds = async () => {
      const response = await getMatchingUserInfoByPostSEQ(postSEQ);
      setUserIds(response.data.map((info) => info.id));
    };

    fetchAppliedUserIds();
  }, [postSEQ]);

  const groupChat = () => {
    alert("승락한 사람들이 모두 포함된 채팅방이 생성되었습니다!");
  };

  const matchingEnd = () => {
    alert("이제 즐겁게 노시길 바랍니다!");
    navigate("/myMatching");
  };

  const ChatDTO = {
    id: user.id,
    postSEQ: postSEQ,
    // idList: ㅇㄴ,
  };

  return (
    <div className="ApplyMain">
      <div className="AC">
        <legend className="Applytag">궁금해요</legend>
        <button className="backButton" onClick={handleBack}>
          뒤로가기
        </button>
        {userIds.length === 0 ? (
          <p className="ap-empty-p">터엉...ㅠㅠ</p>
        ) : (
          userIds.map(
            (userId) =>
              userId &&
              !hiddenUserIds.includes(userId) && (
                <section className="ap-section" key={userId}>
                  <button
                    className="closeButton"
                    onClick={() => handleHideSection(userId)}
                  >
                    잠깐 가릴게요
                  </button>
                  <ApplyForm userId={userId} />
                </section>
              )
          )
        )}
      </div>
      <button onClick={groupChat}>승락한 사람 모두와 떠들기</button>
      <button onClick={matchingEnd}>같이 놀 사람을 모두 구했어요!</button>
    </div>
  );
};

export default Apply;
