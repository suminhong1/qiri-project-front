import logo from "../assets/logo.png";
import title from "../assets/title.JPG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell as solidBell,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faBell as regularBell } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userSave, userLogout } from "../store/userSlice";
import { useLocation } from "react-router-dom";
import { asyncChatRooms } from "../store/chatRoomSlice";
import { asyncSearchResult } from "../store/postSlice";

const StyledHeader = styled.header`
  * {
    white-space: nowrap;
  }

  .header {
    background-color: white;
    width: 100%;
    z-index: 1;
    display: flex;
    height: 130px;
    justify-content: space-between;
    min-width: 1250px;
  }

  .header-logo {
    display: flex;
    align-items: center;
    margin: 10px;
    margin-left: 150px;
  }

  .header-search {
    flex: 1;
    display: flex;
    align-items: end;
    justify-content: start;
    padding: 10px;
    margin-bottom: 15px;
    margin-left: 20px;
  }

  .header-search input {
    font-weight: bold;
    font-size: 1.2rem;
    display: block;
    width: 80%;
    max-width: 1000px;
    height: 50px;
    padding: 10px;
    border-bottom: 3px solid #ff7f38;
    border-top: 3px solid #ff7f38;
    border-left: 3px solid #ff7f38;
    border-right: none;
    outline: none;
  }

  .header-search button {
    padding: 10px;
    height: 50px;
    border-bottom: 3px solid #ff7f38;
    border-top: 3px solid #ff7f38;
    border-left: none;
    border-right: 3px solid #ff7f38;
    background-color: white;
    outline: none;
  }

  .header-user {
    display: flex;
    justify-content: center;
    margin-right: 30px;
    margin-top: 15px;
    height: 35px;
    background-color: transparent;
    border: none;
    color: gray;
    font-size: 1rem;
  }

  .header-user .login,
  .header-user .join,
  .header-user .myInfo,
  .header-user .logout {
    color: gray;
  }

  .header-user :hover {
    color: black;
  }
`;

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    dispatch(asyncChatRooms(user.id));
  }, [user]);

  useEffect(() => {
    const save = localStorage.getItem("user");
    if (Object.keys(user).length === 0 && save !== null) {
      dispatch(userSave(JSON.parse(save)));
    }
  }, [user]);

  if (location.pathname === "/Login" || location.pathname === "/signup") {
    return null; // 로그인, 회원가입 페이지일때 헤더 숨김
  }

  const logout = () => {
    console.log("logout!");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(userLogout());
    window.location.reload(); // 현재 페이지를 새로고침
  };

  return (
    <StyledHeader>
      <div className="header">
        <div className="header-logo">
          <a href="/" className="logo">
            <img
              src={logo}
              className="App-logo"
              alt="logo"
              style={{ height: "80px", width: "auto" }}
            />
            <img
              src={title}
              className="App-title"
              alt="title"
              style={{ height: "50px", width: "auto" }}
            />
          </a>
        </div>

        <div className="header-search">
          <input
            type="search"
            id="search"
            className="search"
            placeholder="원하는 끼리를 검색해보세요"
            name="search"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />

          <button
            className="searchBtn"
            onClick={() => {
              dispatch(asyncSearchResult(keyword));
            }}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ height: "20px", width: "auto" }}
            />
          </button>
        </div>
        {/* 로그인이 되어 있지 않은 경우 */}
        {Object.keys(user).length === 0 && (
          <>
            <button className="header-user">
              <Link to="/Login" className="login">
                로그인
              </Link>
            </button>
            <button className="header-user">
              <Link to="/signup" className="join">
                회원가입
              </Link>
            </button>
          </>
        )}

        {/* 로그인이 되어 있는 경우 */}
        {Object.keys(user).length !== 0 && (
          <>
            <button className="header-user">
              <div className="notify">
                <FontAwesomeIcon
                  icon={regularBell}
                  style={{
                    height: "15px",
                    color: "#000000",
                  }}
                />
                알림
              </div>
            </button>
            <button className="header-user">
              <Link to="/myinfo" className="myInfo">
                내정보
              </Link>
            </button>
            <button onClick={logout} className="header-user">
              <div className="logout">로그아웃</div>
            </button>
          </>
        )}
      </div>
    </StyledHeader>
  );
};
export default Header;
