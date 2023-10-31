import CategoryType from "../components/CategoryType";
import React, { useEffect } from "react";
import styled from "styled-components";

const StyledHome = styled.div`
  width: 100%;
  white-space: nowrap;

  .billboard {
    width: 100%;
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(220, 245, 255);
  }
  .content {
    width: 1400px;
    min-width: 1400px;
    height: 450px;
    font-weight: bold;
    .title {
      font-size: 7rem;
      margin-bottom: 40px;
    }
    .sub1 {
      font-size: 4rem;
      margin-bottom: 20px;
    }
    .sub2 {
      font-size: 6rem;
      margin-bottom: 20px;
    }
    .sub3 {
      font-size: 6rem;
    }
  }
`;

const Home = () => {
  return (
    <StyledHome>
      <section className="billboard">
        <div className="content">
          <div className="title">같이 놀고싶다면 들어와!</div>
          <div className="sub1">ㄴㅇㅁ </div>
          <div className="sub2">함께 놀며 더 행복해지세요 </div>
          <div className="sub3">PLAY WITH US </div>
        </div>
      </section>
      <CategoryType />
    </StyledHome>
  );
};

export default Home;
