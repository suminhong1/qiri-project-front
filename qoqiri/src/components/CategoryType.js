import { useState, useEffect } from "react";
import "../css/CategoryType.css";
import { getCategoryTypes } from "../api/categoryType";

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
        ))}
      </div>
    </div>
  );
};

export default CategoryType;
