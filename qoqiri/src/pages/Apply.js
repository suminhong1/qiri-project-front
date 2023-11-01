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
    </div>
  );
};

export default Apply;
