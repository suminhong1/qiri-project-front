import { useState, useEffect } from "react";
import "../css/Navbar.css";
import { GrHomeRounded } from "react-icons/gr";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import OffCanvas from "./Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <a href="/postWrite" className="matchingPost">
            끼리모집
          </a>
          <a href="/matchingBoard" className="matchingSearch">
            끼리찾기
          </a>
          <a href="/myMatching" className="myMatching">
            나의끼리
          </a>
          <a href="/review" className="review">
            끼리후기
          </a>
        </div>
        <div
          className="navbar-alarm"
          onClick={handleShow}
          style={{
            visibility: Object.keys(user).length === 0 ? "hidden" : "visible",
          }}
        >
          <FontAwesomeIcon
            icon={faComment}
            size="lg"
            style={{ color: "#ff7f38" }}
          />
        </div>
      </div>
      <OffCanvas show={show} handleClose={handleClose} placement="end" />
    </>
  );
};
export default Navbar;
