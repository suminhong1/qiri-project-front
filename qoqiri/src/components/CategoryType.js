import { useState, useEffect } from "react";
import axios from "axios";
import "../css/CategoryType.css";

const instance = axios.create({
  baseURL: "http://localhost:8080/qiri/",
});

export const getCategoryTypes = async () => {
  return await instance.get("categoryType");
};

const CategoryType = () => {
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  const categoryTypeAPI = async () => {
    const result = await getCategoryTypes();
    setCategoryTypes(result.data);
  };

  useEffect(() => {
    categoryTypeAPI();
  }, []);

  return (
    <div className="main-body">
      <div className="cTypeSelect">
        {categoryTypes.map((categoryType) => (
          <section
            className="cTypeCard"
            key={categoryType.ctSeq}
            onMouseEnter={() => setHoveredCard(categoryType.ctSeq)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              backgroundImage: `url(/categoryType_logo/${categoryType.ctSeq}.jpg)`,
            }}
          >
            <div
              className="overlay"
              style={{
                opacity: hoveredCard === categoryType.ctSeq ? 0 : 1,
              }}
            ></div>
            <a href="/" className="cTypeText">
              <p>{categoryType.ctName}</p>
            </a>
          </section>
        ))}
      </div>
    </div>
  );
};

export default CategoryType;
