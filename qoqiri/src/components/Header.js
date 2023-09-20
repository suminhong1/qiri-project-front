import logo from "../assets/logo.png";
import title from "../assets/title.JPG";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const StyledHeader = styled.header`
  font-family: "Noto Sans KR", sans-serif;

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  header {
    margin: 0;
  }

  .search {
    width: 320px;
    height: 40px;
    background-color: white;
    border-radius: 60px;
    transition: 0.5s;
    border: 3px solid #ff7f38;
    outline: none;
  }

  .searchBtn {
    height: 40px;
    background-color: white;

    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: #ff7f38;
  }
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 8px 12px;
  }

  .navbar__menu,
  .navbar__sign {
    display: flex;
    list-style: none;
    padding-left: 0;
  }

  .navbar__menu li,
  .navbar__sign li {
    font-size: larger;
    font-weight: bold;
    padding: 8px 12px;
    border-radius: 6px;
    margin-left: 15px;
    margin-right: 15px;
  }

  .navbar__menu li:hover,
  .navbar__sign li:hover {
    background-color: #ff7f38;
  }

  .navbar__menu li:hover > a,
  .navbar__sign li:hover > a {
    color: white;
  }

  @media screen and (max-width: 768px) {
    .navbar {
      flex-direction: column;
    }
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <div className="header-start">
        <a href="" className="logo">
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            style={{ height: "200px", width: "auto" }}
          />
          <img src={title} className="App-title" alt="title" />
        </a>
      </div>

      <div className="header-center">
        <nav className="navbar">
          <ul className="navbar__menu">
            <li>
              <a href="">끼리후기</a>
            </li>
            <li>
              <a href="">커뮤니티</a>
            </li>
          </ul>

          <div className="navbar__search">
            <input
              type="search"
              name="search"
              id="search"
              className="search"
              placeholder="검색"
            />
            <button className="searchBtn">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>

          <ul className="navbar__sign">
            <li>
              <a href="">로그인</a>
            </li>
            <li>
              <a href="">회원가입</a>
            </li>
          </ul>
        </nav>
      </div>
    </StyledHeader>
  );
};
export default Header;
