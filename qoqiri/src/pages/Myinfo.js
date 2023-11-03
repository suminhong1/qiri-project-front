import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../css/Myinfo.css";
import Paging from "../components/Paging";

const UserInfoPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const categories = [
    "가입 정보",
    "회원정보 변경",
    "내가 쓴 글",
    "내가 쓴 댓글",
    "차단한 사용자",
  ];
  const [categoryData, setCategoryData] = useState([]);
  const [userCategoryData, setUserCategoryData] = useState([]);
  const userId = useSelector((state) => state.user.id);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (category === "가입 정보") {
      navigate("/SignupInfo");
    }
    if (category === "회원정보 변경") {
      navigate("/EditProfile");
    }
    if (category === "내가 쓴 댓글") {
      navigate("/Mycomments");
      return;
    }

    setSelectedCategory(category);
    setCurrentPage(1);
    const filteredData = categoryData.filter((item) => item.includes(category));
    setUserCategoryData(filteredData);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userCategoryData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="category-page">
      <div className="category-buttons">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(category)}
            style={{
              backgroundColor:
                selectedCategory === category ? "#FF9615" : "white",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="pagination">
          <Paging
            totalItems={userCategoryData.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default UserInfoPage;
