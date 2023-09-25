import alarm from "../assets/alarm.gif";
import { useState, useEffect } from "react";
import "../css/Navbar.css";
import { GrHomeRounded } from "react-icons/gr";

const Navbar = () => {
  const [bell, setBell] = useState([false]);
  useEffect(() => {}, [bell]);

  return (
    <>
      <div className="navbar">
        <div className="navbar-home">
          <a href="/" className="homeButton" style={{ marginLeft: "20px" }}>
            <GrHomeRounded />
          </a>
        </div>
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
            <img
              src={alarm}
              style={{ height: "50px", width: "auto" }}
              alt="alarm"
            />
          </a>
        </div>
      </div>
    </>
  );
};
export default Navbar;
