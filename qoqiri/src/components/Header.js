import logo from "../assets/logo.png";
import title from "../assets/title.JPG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../assets/reset.css";
import "../css/Header.css";
import "../css/Font.css";
import alarm from "../assets/alarm.gif";
import { useState, useEffect } from "react";

const Header = () => {
  const [bell, setBell] = useState([false]);
  useEffect(() => {}, [bell]);

  return (
    <div className="topbar">
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
            name="search"
            id="search"
            className="search"
            placeholder="원하는 끼리를 검색해보세요"
          />
          <button className="searchBtn">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ height: "20px", width: "auto" }}
            />
          </button>
        </div>

        <div className="header-sign">
          <a href="/" className="login">
            로그인
          </a>
        </div>

        <div className="header-sign">
          <a href="/" className="login">
            회원가입
          </a>
        </div>
      </div>

      <div className="navbar">
        <div className="navbar-menu">
          <a href="/" className="matchingPost">
            끼리모집!
          </a>
          <a href="/" className="review">
            끼리후기
          </a>
          <a href="/" className="community">
            커뮤니티
          </a>
        </div>

        <div className="navbar-alarm">
          <a href="/" className="alarm">
            <img src={alarm} style={{ height: "50px", width: "auto" }} />
          </a>
        </div>
      </div>
      <div></div>
    </div>
  );
};
export default Header;
