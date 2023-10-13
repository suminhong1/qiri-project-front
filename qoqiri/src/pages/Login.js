import React, { useEffect, useState } from 'react';
import '../css/login.css';
import axios from 'axios';
import logo from "../assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  useEffect(() => {
    if (emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  
  const handlePw = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const onClickConfirmButton = async () => {
    try {
        const response = await axios.post("http://localhost:8080/qiri/userInfo/signin", { 
            id: email, 
            pwd: pw 
        });

        const data = response.data;

        if (response.status === 200) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify({ id: data.id, nickname: data.nickname }));
            alert('로그인 성공.');
        } else {
            alert(data.message || '로그인 실패');
        }
    } catch (error) {
        alert('로그인 중 오류 발생');
    }
};

  return (
    <div className="login-page">
      <div className="image">
        <img src={logo} style={{height: "150px"}} alt="로고" />
      </div>
      <div className="contentWrap">
        <div className="titleWrap">
          <br/>
        </div>

        <div className="inputTitle">이메일 주소</div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="test@gmail.com"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="errorMessageWrap">
          {!emailValid && email.length > 0 && (
            <div>올바른 이메일을 입력해주세요.</div>
          )}
        </div>

        <div style={{ marginTop: '26px' }} className="inputTitle">
          비밀번호
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="password"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            value={pw}
            onChange={handlePw}
          />
        </div>
        <div className="errorMessageWrap">
          {!pwValid && pw.length > 0 && (
            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
          )}
        </div>

        <div className="linksWrap">
          <a href="/find-password">비밀번호 찾기</a>
          <span> ㅣ </span>
          <a href="/find-id">아이디 찾기</a>
          <span> ㅣ </span>
          <a href="/signup">회원가입</a>
        </div>
        <br></br>

        <div>
          <button
            onClick={onClickConfirmButton}
            disabled={notAllow} // 빈 칸 & 잘못 입력한 경우에도 로그인버튼 활성화 방지 
            className="bottomButton"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
    
  );
}
