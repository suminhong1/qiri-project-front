import alarm from "../assets/alarm.gif";
import { useState, useEffect } from "react";
import "../css/Navbar.css";
import { GrHomeRounded } from "react-icons/gr";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { getChatRoomList } from "../api/chat";

function OffCanvasExample({ show, handleClose, ...props }) {

    const [chatRoomList, setChatRoomList] = useState([]);
    const user = useSelector((state) => state.user);

    const chatRoomListAPI = async () => {
      const result = await getChatRoomList(user.id);
      setChatRoomList(result.data);
    };
  
    useEffect(() => {
      chatRoomListAPI();
    }, []);

    useEffect(() => {
      chatRoomListAPI();
    }, [user]);


  return (
    <Offcanvas show={show} onHide={handleClose} {...props}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          내 소식
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="notice">
        {chatRoomList?.map((chatRoomList) => (
          <Link className="notice-link" key={chatRoomList?.userChatRoomInfoSeq}>
            <div className="notice-top">
              <span className="notice-exp">댓글이 달렸습니다!</span>
              <span className="notice-time">몇분전</span>
            </div>
            <div span className="notice-addr">
            {chatRoomList?.chatRoom.post.postTitle}
            </div>
          </Link>
        ))}
          {/* <Link className="notice-link">
            <div className="notice-top">
              <span className="notice-exp">댓글이 달렸습니다!</span>
              <span className="notice-time">몇분전</span>
            </div>
            <div span className="notice-addr">
              홍박사님을 아세요 홍홍홍홍박사님을 아세요 홍홍홍홍박사님을 아세요
              홍홍홍홍박사님을 아세요 홍홍홍홍박사님을 아세요 홍홍홍
            </div>
          </Link>
          <Link className="notice-link">
            <div className="notice-top">
              <span className="notice-exp">댓글이 달렸습니다!</span>
              <span className="notice-time">몇분전</span>
            </div>
            <div span className="notice-addr">
              홍박사님을 아세요 홍홍홍홍박사님을 아세요 홍홍홍홍박사님을 아세요
              홍홍홍홍박사님을 아세요 홍홍홍홍박사님을 아세요 홍홍홍
            </div>
          </Link>
          <Link className="notice-link">
            <div className="notice-top">
              <span className="notice-exp">댓글이 달렸습니다!</span>
              <span className="notice-time">몇분전</span>
            </div>
            <div span className="notice-addr">
              홍박사님을 아세요 홍홍홍홍박사님을 아세요 홍홍홍홍박사님을 아세요
              홍홍홍홍박사님을 아세요 홍홍홍홍박사님을 아세요 홍홍홍
            </div>
          </Link>
          <Link className="notice-link">
            <div className="notice-top">
              <span className="notice-exp">댓글이 달렸습니다!</span>
              <span className="notice-time">몇분전</span>
            </div>
            <div span className="notice-addr">
              홍박사님을 아세요 홍홍홍홍박사님을 아세요 홍홍홍홍박사님을 아세요
              홍홍홍홍박사님을 아세요 홍홍홍홍박사님을 아세요 홍홍홍
            </div>
          </Link>
          <Link className="notice-link">
            <div className="notice-top">
              <span className="notice-exp">댓글이 달렸습니다!</span>
              <span className="notice-time">몇분전</span>
            </div>
            <div span className="notice-addr">
              홍박사님을 아세요 홍홍홍홍박사님을 아세요 홍홍홍홍박사님을 아세요
              홍홍홍홍박사님을 아세요 홍홍홍홍박사님을 아세요 홍홍홍
            </div>
          </Link>
          <Link className="notice-link">
            <div className="notice-top">
              <span className="notice-exp">댓글이 달렸습니다!</span>
              <span className="notice-time">몇분전</span>
            </div>
            <div span className="notice-addr">
              홍박사님을 아세요 홍홍홍홍박사님을 아세요 홍홍홍홍박사님을 아세요
              홍홍홍홍박사님을 아세요 홍홍홍홍박사님을 아세요 홍홍홍
            </div>
          </Link>
          <Link className="notice-link">
            <div className="notice-top">
              <span className="notice-exp">댓글이 달렸습니다!</span>
              <span className="notice-time">몇분전</span>
            </div>
            <div span className="notice-addr">
              홍박사님을 아세요 홍홍홍홍박사님을 아세요 홍홍홍홍박사님을 아세요
              홍홍홍홍박사님을 아세요 홍홍홍홍박사님을 아세요 홍홍홍
            </div>
          </Link> */}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

const Navbar = () => {
  const location = useLocation();
  const [bell, setBell] = useState([false]);
  const user = useSelector((state) => state.user);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  useEffect(() => {}, [bell]);

  if (location.pathname === "/Login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <>
      <div className="navbar2">
        <div className="navbar-home">
          <a href="/" className="homeButton">
            <GrHomeRounded/>
          </a>
        </div>
        <div className="navbar-menu">
          <a href="/postWrite" className="matchingPost">
            끼리모집
          </a>
          <a href="/matchingBoard" className="matchingSearch">
            끼리찾기
          </a>
          <a href="/review" className="review">
            끼리후기
          </a>
          <a href="/bestPost" className="community">
            커뮤니티
          </a>
        </div>
        <div
          className="navbar-alarm"
          onClick={handleShow}
          style={{
            visibility: Object.keys(user).length === 0 ? "hidden" : "visible",
          }}
        >
          <img
            src={alarm}
            style={{ height: "40px", width: "auto" }}
            alt="alarm"
          />
        </div>
      </div>
      <OffCanvasExample show={show} handleClose={handleClose} placement="end" />
    </>
  );
};
export default Navbar;
