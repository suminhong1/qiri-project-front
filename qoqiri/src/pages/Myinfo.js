import React, { useState, useEffect } from "react";
import "../css/Myinfo.css";
import Paging from "../components/Paging";
import axios from "axios";

const UserInfoPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const categories = [
    "회원정보 변경",
    "내가 쓴 글",
    "내가 쓴 댓글",
    "좋아요 한 글",
    "좋아요 한 댓글",
    "스크랩 한 글",
    "차단한 사용자",
  ];
  const [categoryData, setCategoryData] = useState([]);
  const [userCategoryData, setUserCategoryData] = useState([]);
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const data = Array.from({ length: 250 }, (_, i) => `데이터 ${i + 1}`);
    setCategoryData(data);
  }, []);

  const handleCategoryClick = (category) => {
    if (category === "회원정보 변경") {
      axios.get(`/qiri/userInfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCurrentUser(response.data); 
      })
      .catch((error) => {
        console.error("에러 발생", error);
      });
    } else {
      setSelectedCategory(category);
      setCurrentPage(1);
      const filteredData = categoryData.filter((item) => item.includes(category));
      setUserCategoryData(filteredData);
    }
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
      <div className="selected-category">
        {selectedCategory === "회원정보 변경" && currentUser ? (
          <div>
            <p>사용자 아이디: {currentUser.userId}</p>
            <p>사용자 이름: {currentUser.userName}</p>
            {/* 다른 사용자 정보 필드들을 추가하세요 */}
          </div>
        ) : (
          <table className="user-info-table">
            <thead>
              <tr>
                <th>항목</th>
                <th>날짜</th>
                <th>내용</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
