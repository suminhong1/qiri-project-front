import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getCategoryTypes } from "../api/categoryType";
import Carousel from "react-bootstrap/Carousel";

const StyledHome = styled.div`
  width: 100%;
  min-width: 1250px;

  .billboard {
    width: 100%;
    min-width: 1250px;
    height: 660px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    background-color: rgb(220, 245, 255);
  }

  .main-body {
    width: 100%;
    min-width: 1250px;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  .cTypeSelect {
    width: 100%;
    height: 100%;

    padding: 20px;
    overflow-x: scroll;
    scrollbar-width: none; /* Firefox 용 스크롤바를 숨깁니다 */
    -ms-overflow-style: none; /* IE/Edge 용 스크롤바를 숨깁니다 */
    display: -webkit-inline-box;
  }

  .cTypeSelect::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .cTypeCard {
    width: 700px;
    height: 500px;
    background-position: center center;
    background-size: cover;
    border-radius: 20px;
    margin: 15px;
    position: relative;
  }

  .overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 20px;
    background: linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.6));
    transition: opacity 0.2s ease;
    z-index: 1;
  }

  .cTypeCard:hover .overlay {
    opacity: 0;
  }

  .cTypeText {
    filter: none;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.5rem;
    font-weight: bold;
    -webkit-text-stroke: 0.8px white;
    z-index: 2; /* 추가 */
    position: relative; /* 추가 */
  }

  .content {
    width: 100%;
    min-width: 1250px;
    height: 200px;
    font-weight: bold;
    font-size: 3rem;
  }
`;

const Home = () => {
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const categoryTypeAPI = async () => {
    const result = await getCategoryTypes();
    setCategoryTypes(result.data);
  };

  useEffect(() => {
    categoryTypeAPI();
  }, []);

  return (
    <StyledHome>
      <section className="billboard">
        <div className="main-body">
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {/* <div className="cTypeSelect"> */}
            {categoryTypes.map((categoryType) => (
              <Carousel.Item>
                <section
                  className="cTypeCard"
                  key={categoryType.ctSEQ}
                  onMouseEnter={() => setHoveredCard(categoryType.ctSEQ)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    backgroundImage: `url(/categoryType_logo/${categoryType.ctSEQ}.jpg)`,
                  }}
                >
                  <div
                    className="overlay"
                    style={{
                      opacity: hoveredCard === categoryType.ctSEQ ? 0 : 1,
                    }}
                  ></div>
                  <a href="/" className="cTypeText">
                    <p>{categoryType.ctName}</p>
                  </a>
                </section>
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
            ))}
            {/* </div> */}
          </Carousel>
        </div>
        <div className="content"></div>
      </section>
    </StyledHome>
  );
};

export default Home;
