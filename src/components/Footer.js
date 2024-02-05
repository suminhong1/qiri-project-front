import { Link } from "react-router-dom";
import styled from "styled-components";

const StyleFooter = styled.div`
  border-top: 1px solid #e5e5e5;
  width: 100%;
  min-width: 1250px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  left: 0;
  right: 0;
  .footer {
    width: 700px;
    min-width: 700px;
  }

  .topline {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 20px;
    font-weight: bold;
  }
  .middleline {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .bottomline {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .copyright {
    display: flex;
    .title {
      font-weight: bold;
    }
  }
`;

const Footer = () => {
  return (
    <StyleFooter>
      <div className="footer">
        <div className="topline">
          <Link>공지사항</Link>
        </div>
        <div className="middleline">
          <div>회사소개</div>
          <div>개인정보처리방침</div>
          <div>서비스약관</div>
          <div>광고문의</div>
        </div>
        <div className="bottomline">
          <div className="copyright">
            Copyright<div className="title">&nbsp;©코끼리끼리&nbsp;</div>All
            rights reserved.
          </div>
        </div>
      </div>
    </StyleFooter>
  );
};
export default Footer;
