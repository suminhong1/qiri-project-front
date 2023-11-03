import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ApplyForm from "../components/ApplyForm";
import "../css/Apply.css";
import { getMatchingUserInfoByPostSEQ } from "../api/matching";
import { useNavigate } from "react-router-dom"; // 추가
import { useParams } from "react-router-dom"; // useParams 추가

const Apply = () => {
  const [userIds, setUserIds] = useState([]);
  const [hiddenUserIds, setHiddenUserIds] = useState([]);
  const navigate = useNavigate();
  const { postSEQ } = useParams();

  const handleBack = () => {
    navigate("/myMatching");
  };

  useEffect(() => {
    const storedHiddenIds = localStorage.getItem("hiddenUserIds");
    if (storedHiddenIds) {
      setHiddenUserIds(JSON.parse(storedHiddenIds));
    }
  }, []);

  // 모든 ApplyForm이 숨겨졌는지 여부를 계산하는 함수
  const isEveryFormHidden = () => {
    // userIds 배열의 모든 원소가 hiddenUserIds에 포함되어 있는지 검사
    return (
      userIds.length > 0 &&
      userIds.every((userId) => hiddenUserIds.includes(userId))
    );
  };

  const handleHideSection = (userId) => {
    setHiddenUserIds((prevIds) => {
      const updatedIds = [...prevIds, userId];
      localStorage.setItem("hiddenUserIds", JSON.stringify(updatedIds)); // 로컬 스토리지에 저장
      return updatedIds;
    });
  };

  useEffect(() => {
    const fetchAppliedUserIds = async () => {
      const response = await getMatchingUserInfoByPostSEQ(postSEQ);
      setUserIds(response.data.map((info) => info.id));
    };

    fetchAppliedUserIds();
  }, [postSEQ]);

  return (
    <div className="ApplyMain">
      <div className="AC">
        <legend className="Applytag">궁금해요</legend>
        <button className="backButton" onClick={handleBack}>
          뒤로가기
        </button>
        {isEveryFormHidden() ? ( // 모든 ApplyForm이 숨겨진 경우
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
    </div>
  );
};

export default Apply;
