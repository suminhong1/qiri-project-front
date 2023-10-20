import "../css/Home.css";
import CategoryType from "../components/CategoryType";
import React from "react";

const Home = () => {
  return (
    <>
      <section className="billboard">
        <div className="content">
          <p>즐기자, 씨발</p>
          <p>누구든, 언제든</p>
          <p>함께, 가볍게</p>
          <p>놀 자지 금 바로</p>
        </div>
      </section>
      <CategoryType />
    </>
  );
};

export default Home;
