import "../css/Home.css";
import CategoryType from "../components/CategoryType";
import React, { useEffect } from "react";

const Home = () => {
  return (
    <>
      <section className="billboard">
        <div className="content">
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </section>
      <CategoryType />
    </>
  );
};

export default Home;
