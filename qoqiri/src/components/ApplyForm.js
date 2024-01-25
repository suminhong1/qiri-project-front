import React, { useState, useEffect } from "react";
import Imgmodal from "./imgmodal";
import { getUser } from "../api/user";
import defaultimg from "../assets/defaultimg.png";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { matchingAccept, hideMachingUser } from "../api/matching";
import styled from "styled-components";
import { getUserCategory } from "../api/category";
import { formatBirthday } from "../utils/TimeFormat";

const StyledApplyForm = styled.div`
  .ap_container {
    margin-top: 20px;
  }

  .ap_custom_card {
    width: 300px;
    height: 600px;
    border-radius: 35px;
    position: relative;
    font-weight: bold;
  }

  .ap_front_info {
    width: 100%;
    height: 100%;
    background-color: rgb(231, 240, 252);
    border-radius: 30px;
    border: 2px solid rgb(93, 156, 235);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), 0 6px 6px rgba(0, 0, 0, 0.23);
    transition: transform 0.5s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
    position: absolute;
    backface-visibility: hidden;
  }

  .ap_hide {
    margin-left: auto;
    margin-right: 10px;
    margin-top: 6px;
    border: none;
    font-size: 0.9rem;
    font-weight: bold;
    background-color: rgb(231, 240, 252);
  }

  .ap_main_image {
    margin-bottom: 10px;
    width: 250px;
    height: 250px;
    border-radius: 100%;
    object-fit: cover;
    box-sizing: border-box;
    cursor: pointer;
  }

  .ap_front_nickname {
    font-size: 2rem;
    margin-bottom: 5px;
    color: rgb(49, 49, 49);
  }

  .ap_front_mbti_popular {
    color: rgb(49, 49, 49);
    width: 50%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  .ap_front_text {
    width: 80%;
    height: 120px;
    color: rgb(49, 49, 49);
    white-space: pre-line;
  }

  .ap_front_Btn {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: auto;
  }

  .ap_front_infoBtn,
  .ap_front_applyBtn {
    border: none;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    background-color: rgb(93, 156, 235);
    width: 50%;
    height: 50px;
  }

  .ap_front_infoBtn {
    border-right: 0.5px solid rgb(231, 240, 252);
    border-bottom-left-radius: 26px;
  }
  .ap_front_applyBtn {
    border-left: 0.5 solid rgb(231, 240, 252);
    border-bottom-right-radius: 26px;
  }

  .ap_back_Btn {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: auto;
  }

  .ap_back_infoBtn,
  .ap_back_applyBtn {
    border: none;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    background-color: rgb(93, 156, 235);
    width: 50%;
    height: 50px;
  }

  .ap_back_infoBtn {
    border-right: 0.5px solid rgb(231, 240, 252);
    border-bottom-left-radius: 27px;
  }
  .ap_back_applyBtn {
    border-left: 0.5 solid rgb(231, 240, 252);
    border-bottom-right-radius: 27px;
  }

  .ap_back_info {
    width: 100%;
    height: 100%;
    background-color: rgb(231, 240, 252);
    border-radius: 30px;
    border: 2px solid rgb(93, 156, 235);
    transition: transform 0.5s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    backface-visibility: hidden;
  }

  .ap_custom_card.flipped .ap_front_info {
    transform: rotateY(180deg);
  }

  .ap_custom_card.flipped .ap_back_info {
    transform: rotateY(360deg);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
`;

const ApplyForm = ({ userId }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userCategoryList, setUserCategoryList] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userData, setUserData] = useState({ introduction: "" });
  const user = useSelector((state) => state.user);
  const { postSEQ } = useParams();

  const chatDTO = {
    id: user.id,
    postSEQ: postSEQ,
    applicantId: userId,
  };

  const getUserAPI = async () => {
    const result = await getUser(userId);
    setUserData(result.data);
  };

  const getUserCategoryAPI = async () => {
    const result = await getUserCategory(userId);
    setUserCategoryList(result.data);
  };

  useEffect(() => {
    getUserAPI();
    getUserCategoryAPI();
  }, [userId]);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };
  const handleImageClick = (index) => {
    setIsModalOpen(true);
    setCurrentImageIndex(index);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const matchingAcceptAPI = () => {
    matchingAccept(chatDTO);
    window.location.reload();
  };
  const hideMatchingUser = () => {
    hideMachingUser(chatDTO);
    window.location.reload();
  };

  return (
    <StyledApplyForm>
      <div className="ap_container">
        <div className={`ap_custom_card ${isFlipped ? "flipped" : ""}`}>
          <div className="ap_front_info">
            <button className="ap_hide" onClick={hideMatchingUser}>
              숨기기
            </button>
            <img
              className="ap_main_image"
              src={
                userData?.profileImg
                  ? `/uploadprofile/${userData?.profileImg}`
                  : defaultimg
              }
              alt="User"
              onClick={() => handleImageClick(0)}
            />
            <div className="ap_front_nickname">{userData?.userNickname}</div>
            <div className="ap_front_mbti_popular">
              <div className="ap_front_mbti">
                {userData?.mbti !== null ? userData?.mbti : "비공개"}
              </div>
              <div className="ap_front_popular">
                인기도 {userData?.popularity}
              </div>
            </div>
            <div className="ap_front_text">{userData?.statusMessage}</div>
            <div className="ap_front_Btn">
              <button className="ap_front_infoBtn" onClick={handleCardClick}>
                상세 프로필
              </button>
              <button className="ap_front_applyBtn" onClick={matchingAcceptAPI}>
                승낙
              </button>
            </div>
          </div>
          <div className="ap_back_info">
            <button className="ap_hide" onClick={hideMatchingUser}>
              숨기기
            </button>
            <div>
              <div>
                <div>나이</div>
                <div>성별</div>
                <div>지역</div>
              </div>
              <div>
                <div>관심사1</div>
                <div>관심사2</div>
                <div>관심사3</div>
              </div>
              <div>평점</div>
            </div>
            <div className="ap_back_Btn">
              <button className="ap_back_infoBtn" onClick={handleCardClick}>
                기본 프로필
              </button>
              <button className="ap_back_applyBtn" onClick={matchingAcceptAPI}>
                승낙
              </button>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <Imgmodal
            images={[
              userData?.profileImg
                ? `/uploadprofile/${userData?.profileImg}`
                : defaultimg,
            ]}
            index={currentImageIndex}
            close={handleModalClose}
          />
        )}
      </div>
    </StyledApplyForm>
  );
};
export default ApplyForm;
