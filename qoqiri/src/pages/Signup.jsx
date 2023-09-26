import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function SignUp() {

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [location, setLocation] = useState('');
  const [mbti, setMbti] = useState('');

  const [selectlike, setSelectlike] = useState([]); // 관심사


  // 알림창(에러 메시지)
  const [idMessage, setIdMessage] = React.useState("");
  const [nameMessage, setNameMessage] = React.useState("");
  const [passwordMessage, setPasswordMessage] = React.useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    React.useState("");
  const [emailMessage, setEmailMessage] = React.useState("");
  const [phoneMessage, setPhoneMessage] = React.useState("");
  const [birthMessage, setBirthMessage] = React.useState("");

  // 유효성 검사
  const [isId, setIsId] = React.useState(false);
  const [isname, setIsName] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = React.useState(false);
  const [isEmail, setIsEmail] = React.useState(false);
  const [isPhone, setIsPhone] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onChangeId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;

    if (!idRegExp.test(currentId)) {
      setIdMessage("4-12사이 대소문자 또는 숫자만 입력해 주세요.");
      setIsId(false);
    } else {
      setIdMessage("");
      setIsId(true);
    }
  };

  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);

    if (currentName.length < 2 || currentName.length > 8) {
      setNameMessage("닉네임은 2글자 이상 8글자 이하로 입력해주세요.");
      setIsName(false);
    } else {
      setNameMessage("");
      setIsName(true);
    }
  };

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 사용해서 8자리 이상 입력해주세요."
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("");
      setIsPassword(true);
    }
  };
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 같지 않습니다.");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("");
      setIsPasswordConfirm(true);
    }
  };
  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage("이메일의 형식이 올바르지 않습니다.");
      setIsEmail(false);
    } else {
      setEmailMessage("");
      setIsEmail(true);
    }
  };
  const onChangePhone = (getNumber) => {
    const currentPhone = getNumber;
    setPhone(currentPhone);
    const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    if (!phoneRegExp.test(currentPhone)) {
      setPhoneMessage("올바른 형식이 아닙니다.");
      setIsPhone(false);
    } else {
      setPhoneMessage("");
      setIsPhone(true);
    }
  };

  const addHyphen = (e) => {  // 전화번호 - 자동 추가
    const currentNumber = e.target.value;
    setPhone(currentNumber);
    if (currentNumber.length == 3 || currentNumber.length == 8) {
      setPhone(currentNumber + "-");
      onChangePhone(currentNumber + "-");
    } else {
      onChangePhone(currentNumber);
    }
  };

  const onChangeBirth = (e) => {
    const currentBirth = e.target.value;
    setBirth(currentBirth);
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleBloodTypeChange = (e) => {
    setSelectedBloodType(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleMbtiChange = (e) => {
    setMbti(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const interestCategories = [
    {
      name: '엔터테인먼트 & 예술',
      options: ['영화', '드라마', '음악', '미술'],
    },

    {
      name: '스포츠',
      options: ['축구', '야구', '농구', '서핑', '수영', '볼링', '러닝 & 산책', '헬스', '클라이밍', '테니스', '스키'],
    },

    {
      name: '게임',
      options: ['롤', '피파', '스타', '메이플', '배그', '스팀 게임', '던파', '오버워치'],
    },

  ];

  const handleInterestClick = (interest) => {
    if (selectlike.includes(interest)) {
      setSelectlike(selectlike.filter((item) => item !== interest));
    } else {
      setSelectlike([...selectlike, interest]);
    }
  };

  return (
    <>
      <div className="form-container">
        <img src="/elephant.png" alt="로고이미지" style={{ width: '100px', height: 'auto' }} />
        <img src="/title.jpg" alt="타이틀" style={{ width: '150px', height: 'auto',  marginTop: '-200px' }} />

        <h3></h3>
        <div className="form">
          <div className="form-el">
            <label htmlFor="id">아이디</label> <br />
            <input id="id" name="id" value={id} onChange={onChangeId} />
            <p className="message"> {idMessage} </p>
          </div>

          <div className="form-el">
            <label htmlFor="name">닉네임</label> <br />
            <input id="name" name="name" value={name} onChange={onChangeName} />
            <p className="message">{nameMessage}</p>
          </div>
          <div className="form-el">
            <label htmlFor="password">비밀번호</label> <br />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"} // 비밀번호 보이기 여부에 따라 타입 변경
              value={password}
              onChange={onChangePassword} />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="show-password-button"
            >
              {showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            </button>
            <p className="message">{passwordMessage}</p>
          </div>

          <div className="form-el">
            <label htmlFor="passwordConfirm">비밀번호 확인</label> <br />
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={onChangePasswordConfirm}
            />
            <p className="message">{passwordConfirmMessage}</p>
          </div>
          <div className="form-el">
            <label htmlFor="email">이메일</label> <br />
            <input
              id="email"
              name="name"
              value={email}
              onChange={onChangeEmail}
            />
            <p className="message">{emailMessage}</p>
          </div>
          <div className="form-el">
            <label htmlFor="phone">휴대전화번호</label> <br />
            <input id="phone" name="phone" value={phone} onChange={addHyphen} />
            <p className="message">{phoneMessage}</p>
          </div>
          <div className="form-el">
            <label htmlFor="birth">생일</label> <br />
            <input
              id="birth"
              name="birth"
              type="date"
              value={birth}
              onChange={onChangeBirth}
            />
            <p className="message">{birthMessage}</p>
          </div>


          <div className="form-el">
            <label>성별</label> <br />
            <div className="gender-options">
              <div className="gender-option">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={selectedGender === 'male'}
                  onChange={handleGenderChange}
                />
                <label htmlFor="male">남</label>
              </div>
              <div className="gender-option">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={selectedGender === 'female'}
                  onChange={handleGenderChange}
                />
                <label htmlFor="female">여</label>
              </div>
            </div>
            <br></br>

            <div className="blood-type">
              <label>혈액형</label> <br />
              <select
                id="bloodType"
                name="bloodType"
                value={selectedBloodType}
                onChange={handleBloodTypeChange}
              >
                <option value="">선택하세요</option>
                <option value="A">A형</option>
                <option value="B">B형</option>
                <option value="AB">AB형</option>
                <option value="O">O형</option>
              </select>
            </div>
          </div>

          <div className="form-el select-for-location">
            <label htmlFor="location">지역</label> <br />
            <select
              id="location"
              name="location"
              value={location}
              onChange={handleLocationChange}
            >
              <option value="">선택하세요</option>
              <option value="서울">서울</option>
              <option value="인천">인천</option>
              <option value="경기">경기</option>
              <option value="강원">강원</option>
              <option value="충북">충북</option>
              <option value="충남">충남</option>
              <option value="대구">대구</option>
              <option value="경북">경북</option>
              <option value="부산">부산</option>
              <option value="울산">울산</option>
              <option value="광주">광주</option>
              <option value="대전">대전</option>
              <option value="전북">전북</option>
              <option value="전남">전남</option>
              <option value="제주">제주</option>
              <option value="기타">기타(해외 등)</option>
            </select>
          </div>

          <div className="form-el select-for-mbti">
            <label htmlFor="mbti">MBTI</label> <br />
            <select
              id="mbti"
              name="mbti"
              value={mbti}
              onChange={handleMbtiChange}
            >
              <option value="">선택하세요</option>
              <option value="ISTJ">ISTJ</option>
              <option value="ISFJ">ISFJ</option>
              <option value="INFJ">INFJ</option>
              <option value="INTJ">INTJ</option>
              <option value="ISTP">ISTP</option>
              <option value="ISFP">ISFP</option>
              <option value="INFP">INFP</option>
              <option value="INTP">INTP</option>
              <option value="ESTP">ESTP</option>
              <option value="ESFP">ESFP</option>
              <option value="ENFP">ENFP</option>
              <option value="ENTP">ENTP</option>
              <option value="ESTJ">ESTJ</option>
              <option value="ESFJ">ESFJ</option>
              <option value="ENFJ">ENFJ</option>
              <option value="ENTJ">ENTJ</option>
            </select>
          </div>
          <br></br>

          <div class="interest-section">
          <div className="form-el">
            <label>관심 주제 설정</label>
            <br />
            {interestCategories.map((category) => (
              <div key={category.name}>
                <div className="interest-category">{category.name}</div>
                <div className="selectlike-box">
                  {category.options.map((interest) => (
                    <div
                      key={interest}
                      className={`selectlike-box-item ${selectlike.includes(interest) ? 'selected' : ''
                        }`}
                      onClick={() => handleInterestClick(interest)}
                    >
                      {interest}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          </div>



          <br />
          <br />
          <button type="submit">가입하기</button>
        </div>
      </div>
    </>
  );
};

export default SignUp;