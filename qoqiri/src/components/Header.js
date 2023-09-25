import logo from "../assets/logo.png";
import title from "../assets/title.JPG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

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
    min-width: 1400px;
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
    justify-content: center;
    padding: 10px;
    margin-bottom: 15px;
  }

  .header-search input {
    font-weight: bold;
    font-size: 1.2rem;
    display: block;
    width: 80%;
    max-width: 600px;
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

  .header-sign {
    display: flex;
    justify-content: center;
    margin-right: 30px;
    margin-top: 15px;
  }

  .header-sign :hover {
    color: #ff7f38;
  }

  .header-sign a {
    padding: 5px;
    color: gray;
  }
`;

const Header = () => {
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
    </StyledHeader>
  );
};
export default Header;
