import alarm from "../assets/alarm.gif";
import { useState, useEffect } from "react";
import "../css/Navbar.css";
import { GrHomeRounded } from "react-icons/gr";
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [bell, setBell] = useState([false]);
  useEffect(() => {}, [bell]);

  // 회원가입, 로그인 페이지일때 네비바 숨김
  if (location.pathname === "/Login" || location.pathname === "/signup") {
    return null;
  }


  return (
    <>
      <div className="navbar2">
        <div className="navbar-home">
          <a href="/" className="homeButton">
            <GrHomeRounded />
          </a>
        </div>
        <div className="navbar-menu">
          <a href="/" className="matchingPost">
            끼리모집
          </a>
          <a href="/" className="matchingSearch">
            끼리찾기
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
            <img
              src={alarm}
              style={{ height: "40px", width: "auto" }}
              alt="alarm"
            />
          </a>
        </div>
      </div>
    </>
  );
};
export default Navbar;
