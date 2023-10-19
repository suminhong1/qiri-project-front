import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Myinfo.css';
import Paging from '../components/Paging';

const UserInfoPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const categories = [
    '내 모든 정보',
    '회원정보 변경',
    '내가 쓴 글',
    '내가 쓴 댓글',
    '좋아요 한 글',
    '좋아요 한 댓글',
    '스크랩 한 글',
    '차단한 사용자',
  ];
  const [categoryData, setCategoryData] = useState([]);
  const [userCategoryData, setUserCategoryData] = useState([]);
  const navigate = useNavigate();

  // 사용자 정보를 담을 state 추가 
  const [userInfo, setUserInfo] = useState(null);
  const [loadingUserInfo, setLoadingUserInfo] = useState(false);

  // 로컬 스토리지에서 사용자 정보 가져오기
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('user');
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(parsedUserInfo);
    }
  }, []);

  const getUserInfo = async () => {
    setLoadingUserInfo(true);
    try {
      const response = await fetch("http://localhost:8080/qiri/userInfo"); 
      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
      } else {
        console.error('씨발');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingUserInfo(false);
    }
  };

  const handleCategoryClick = (category) => {
    if (category === '회원정보 변경') {
      navigate('/EditProfile');
      return;
    }
    if (category === '내 정보') {
      getUserInfo();
    }
    setSelectedCategory(category);
    setCurrentPage(1);
    const filteredData = categoryData.filter((item) => item.includes(category));
    setUserCategoryData(filteredData);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userCategoryData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="category-page">
      <div className="category-buttons">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(category)}
            style={{
              backgroundColor: selectedCategory === category ? '#FF9615' : 'white',
            }}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="selected-category">
        {loadingUserInfo ? (
          <p>Loading user info...</p>
        ) : userInfo ? (
          <table className="user-info-table">
            <thead>
              <tr>
                <th>항목</th>
                <th>내용</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>아이디</td>
                <td>{userInfo.id}</td>
              </tr>
              <tr>
                <td>비밀번호</td>
                <td>표시되지 않습니다. 모르면 그냥 새로 가입하세요</td>
              </tr>
              <tr>
                <td>이름</td>
                <td>{userInfo.name}</td>
              </tr>
              <tr>
                <td>닉네임</td>
                <td>{userInfo.nickname}</td>
              </tr>
              <tr>
                <td>지역</td>
                <td>{userInfo.placeTypeName}</td>
              </tr>
              <tr>
                <td>나이</td>
                <td>{userInfo.age}</td>
              </tr>
              <tr>
                <td>성별</td>
                <td>{userInfo.gender}</td>
              </tr>
              <tr>
                <td>휴대전화번호</td>
                <td>{userInfo.phone}</td>
              </tr>
              <tr>
                <td>이메일</td>
                <td>{userInfo.email}</td>
              </tr>
              <tr>
                <td>상태메시지</td>
                <td>{userInfo.statusMessage}</td>
              </tr>
              <tr>
                <td>애인여부</td>
                <td>{userInfo.hasPartner}</td>
              </tr>
              <tr>
                <td>혈액형</td>
                <td>{userInfo.bloodType}</td>
              </tr>
              <tr>
                <td>MBTI</td>
                <td>{userInfo.mbti}</td>
              </tr>
              <tr>
                <td>생일</td>
                <td>{userInfo.birthday}</td>
              </tr>
            </tbody>
          </table>
        ) : null}
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
