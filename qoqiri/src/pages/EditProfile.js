import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Signup.css';
import { getCategoryTypes } from '../api/categoryType';
import { getCategories } from '../api/category';
import { getPlaceTypes } from '../api/placeType';
import { useNavigate } from 'react-router-dom';
import { EditProfile } from '../api/user';
import { useContext } from 'react';
import { useDispatch } from "react-redux";
import { asyncEditProfile } from "../store/userSlice";

const EditMyInfo = () => {
  // 상태 변수들
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [isIdAvailable, setIsIdAvailable] = useState(true);
  const [isNameAvailable, setIsNameAvailable] = useState(true);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [age, setAge] = useState("");
  const [selectedGender, setSelectedGender] = useState('');
  const [hasPartner, setHasPartner] = useState("없음");
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [placeType, setPlaceType] = useState('');
  const [mbti, setMbti] = useState('');
  const [statusMessage, setStatusMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState(""); // 상태 메시지 글자수 경고
  const [profilePictureUrl, setProfilePictureUrl] = useState(""); // 현재 프사 URL
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null); // 새로 선택한 프사
  const [selectlike, setSelectlike] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]);

  // 알림창(에러 메시지)
  const [idMessage, setIdMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [birthMessage, setBirthMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");

  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 아이디 중복 확인 함수
  const checkIdDuplicate = (currentId) => {
    fetch(`/api/checkDuplicate?id=${currentId}`)
      .then(response => response.json())
      .then(data => {
        if (data.isAvailable) {
          setIsIdAvailable(true);
          setIdMessage("사용 가능한 아이디입니다.");
        } else {
          setIsIdAvailable(false);
          setIdMessage("이미 사용 중인 아이디입니다.");
        }
      })
      .catch(error => console.error(error));
  };

  // 이름 중복 확인 함수
  const checkNameDuplicate = (currentName) => {
    fetch(`/api/checkNameDuplicate?name=${currentName}`)
      .then(response => response.json())
      .then(data => {
        if (data.isAvailable) {
          setIsNameAvailable(true);
          setNameMessage("사용 가능한 이름입니다.");
        } else {
          setIsNameAvailable(false);
          setNameMessage("이미 사용 중인 이름입니다.");
        }
      })
      .catch(error => console.error(error));
  };


  // 닉네임 중복 확인 함수
  const checkNicknameDuplicate = (currentNickname) => {
    fetch(`/api/checkNicknameDuplicate?nickname=${currentNickname}`)
      .then(response => response.json())
      .then(data => {
        if (data.isAvailable) {
          setIsNicknameAvailable(true);
          setNicknameMessage("사용 가능한 닉네임입니다.");
        } else {
          setIsNicknameAvailable(false);
          setNicknameMessage("이미 사용 중인 닉네임입니다.");
        }
      })
      .catch(error => console.error(error));
  };

  // 아이디 입력 핸들러
  const onChangeId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;

    if (!idRegExp.test(currentId)) {
      setIsId(false);
      setIdMessage("4-12사이 대소문자 또는 숫자만 입력해 주세요.");
    } else {
      setIsId(true);
      setIdMessage("");
      checkIdDuplicate(currentId);
    }
  };

  {/* 이름 입력 핸들러 */ }
  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);

    if (currentName.length < 2 || currentName.length > 8) {
      setNameMessage("이름은 2글자 이상 8글자 이하로 입력해주세요.");
      setIsName(false);
    } else {
      setNameMessage("");
      setIsName(true);
      checkNameDuplicate(currentName);
    }
  };

  {/* 닉네임 입력 핸들러 */ }
  const onChangeNickname = (e) => {
    const currentNickname = e.target.value;
    setNickname(currentNickname);

    if (currentNickname.length < 2 || currentNickname.length > 8) {
      setNicknameMessage("닉네임은 2글자 이상 8글자 이하로 입력해주세요.");
      setIsNickname(false);
    } else {
      setNicknameMessage("");
      setIsNickname(true);
      checkNicknameDuplicate(currentNickname);
    }
  };


  // 비밀번호 입력 핸들러
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

  // 비밀번호 확인 입력 핸들러
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

  // 비밀번호 보이기 토글 핸들러
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // 이메일 입력 핸들러
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

  // 휴대전화번호 입력 핸들러
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

  // 휴대전화번호 입력 핸들러 (자동으로 하이픈 추가)
  const addHyphen = (e) => {
    const currentNumber = e.target.value;
    setPhone(currentNumber);
    if (currentNumber.length === 3 || currentNumber.length === 8) {
      setPhone(currentNumber + "-");
      onChangePhone(currentNumber + "-");
    } else {
      onChangePhone(currentNumber);
    }
  };

  // 생일 입력 핸들러
  const onChangeBirth = (e) => {
    const currentBirth = e.target.value;
    setBirth(currentBirth);

    // 생일 기반 나이 계산
    const birthDate = new Date(currentBirth);
    const today = new Date();
    const ageDiff = today.getFullYear() - birthDate.getFullYear();
    // 현재 월과 생일 월 비교
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // 만약 현재 월이 생일 월보다 이전이거나, 현재 월과 생일 월이 같지만 현재 날짜가 생일보다 전일 경우 1 빼기
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      setAge(ageDiff - 1);
    } else {
      setAge(ageDiff);
    }
  };

  // 나이 입력 핸들러
  const onChangeAge = (e) => {
    const currentAge = e.target.value;
    setAge(currentAge);
  };

  // 성별 변경 핸들러
  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  // 애인 여부 선택 핸들러
  const handleHasPartnerChange = (e) => {
    setHasPartner(e.target.value);
  };

  // 혈액형 변경 핸들러
  const handleBloodTypeChange = (e) => {
    setSelectedBloodType(e.target.value);
  };

  // 지역 변경 핸들러
  const handlePlaceChange = (e) => {
    const selectedPlaceTypeName = e.target.value;
    const selectedPlaceTypeObj = placeTypes.find((placeType) => placeType.placeTypeName === selectedPlaceTypeName);

    setSelectedPlaceType({
      placeTypeSEQ: selectedPlaceTypeObj ? selectedPlaceTypeObj.placeTypeSEQ : "",
      placeTypeName: selectedPlaceTypeName,
    });
  };

  // MBTI 변경 핸들러
  const handleMbtiChange = (e) => {
    setMbti(e.target.value);
  };

  // 상태 메시지 입력 핸들러
  const onChangeStatusMessage = (e) => {
    const currentStatusMessage = e.target.value;
    if (currentStatusMessage.length > 20) {
      setWarningMessage("최대 20자까지 입력 가능합니다.");
    } else {
      setStatusMessage(currentStatusMessage);
      setWarningMessage("");
    }
  };

  // 프로필 사진 파일 업로드 핸들러
  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("profileImg", file);

        const response = await axios.post(
          "http://localhost:8080/qiri/uploadProfilePicture",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const imageUrl = URL.createObjectURL(file);
        setProfilePictureUrl(imageUrl);
      } catch (error) {
        console.error(error);
        alert("프로필 사진 업로드 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  // 관심 주제 선택 핸들러
  const handleInterestClick = (interest) => {
    if (selectlike.includes(interest)) {
      setSelectlike(selectlike.filter((item) => item !== interest));
    } else {
      setSelectlike([...selectlike, interest]);
    }
  };

  useEffect(() => {
    const fetchCategoryTypes = async () => {
      const result = await getCategoryTypes();
      setCategoryTypes(result.data);
    };

    const fetchCategories = async () => {
      const result = await getCategories();
      console.log(result.data);
      setCategories(result.data);
    };

    fetchCategoryTypes();
    fetchCategories();
  }, []);

  const getCategoriesByType = (ctSEQ) => {
    return categories.filter((category) => category.categoryType && category.categoryType.ctSEQ === ctSEQ
    );
  };

  const [placeTypes, setPlaceTypes] = useState([]);

  const placeTypeAPI = async () => {
    const result = await getPlaceTypes();
    setPlaceTypes(result.data);
  };

  useEffect(() => {
    placeTypeAPI();
  }, []);

  const [selectedPlaceType, setSelectedPlaceType] = useState({
    placeTypeSEQ: "",   // 선택한 placeType의 placeTypeSEQ
    placeTypeName: "", // 선택한 placeType의 placeTypeName
  });



  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      setUser(parsedUserInfo);
      setId(parsedUserInfo.id);
      setName(parsedUserInfo.name);
      setNickname(parsedUserInfo.nickname);
      setPassword('');
      setEmail(parsedUserInfo.email);
      setPhone(parsedUserInfo.phone);
      if (parsedUserInfo.birthday) {
        setBirth(parsedUserInfo.birthday.substring(0, 10)); // YYYY-MM-DD 형식으로 자르기
      }
      setAge(parsedUserInfo.age);
      setSelectedGender(parsedUserInfo.gender);
      setHasPartner(parsedUserInfo.hasPartner);
      setSelectedBloodType(parsedUserInfo.bloodType);
      setMbti(parsedUserInfo.mbti);
      setStatusMessage(parsedUserInfo.statusMessage);
      setProfilePictureUrl(parsedUserInfo.profileImg);

      const userPlaceType = parsedUserInfo.placeType;
      if (userPlaceType) {
        setSelectedPlaceType({
          placeTypeSEQ: userPlaceType.placeTypeSEQ,
          placeTypeName: userPlaceType.placeTypeName
        });
      }

      axios.get(`/api/userCategories/${parsedUserInfo.id}`)
        .then(response => {
          const userCategories = response.data;
          setSelectlike(userCategories.map(category => category.categoryName));
        })
        .catch(error => console.error(error));
    }
  }, []);


  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault(); // 폼 기본 제출 방지
    }


    const updatedInfo = {
      id,
      pwd: password,
      name,
      nickname,
      placeType: selectedPlaceType,
      age,
      gender: selectedGender,
      phone,
      email,
      hasPartner,
      birthday: birth,
      bloodType: selectedBloodType,
      mbti,
      statusMessage,
      profileImg: profilePictureUrl,
      // userCategories: selectlike.map((categoryName) => ({ categoryName })),
    };


    try {
      const updateResponse = await axios.put("http://localhost:8080/qiri/userInfo/editProfile", updatedInfo, {
        headers: {
          Authorization: `Bearer ${user.token}`
        },
      });

      if (updateResponse.status === 200) {

        dispatch(asyncEditProfile(updatedInfo));

        alert('회원정보 수정 완료.');
        navigate('/');
      } else {
        alert('회원정보 수정 실패. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error(error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <div className="form-container">
        <div className="form">
          <div className="form-el">
            <label htmlFor="id">아이디</label> <br />
            <input id="id" name="id" value={id} onChange={onChangeId} />
            <br></br>
            {!isNameAvailable && <p>이미 사용 중인 아이디입니다.</p>}
            <p className="message">{idMessage}</p>
          </div>

          {/* 이름 입력 양식 */}
          <div className="form-el">
            <label htmlFor="name">이름</label> <br />
            <input id="name" name="name" value={name} onChange={onChangeName} />
            <br />
            {!isNameAvailable && <p>이미 사용 중인 이름입니다.</p>}
            <p className="message">{nameMessage}</p>
          </div>

          {/* 닉네임 입력 양식 */}
          <div className="form-el">
            <label htmlFor="nickname">닉네임</label> <br />
            <input id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
            <br></br>
            {!isNicknameAvailable && <p>이미 사용 중인 닉네임입니다.</p>}
            <p className="message">{nicknameMessage}</p>
          </div>

          {/* 비밀번호 입력 양식 */}
          <div className="form-el">
            <label htmlFor="password">비밀번호</label> <br />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"} // 비밀번호 보이기 입력에 따라 변경
              value={password}
              onChange={onChangePassword} />
            <br></br>
            <button
              type="button"
              onClick={toggleShowPassword}
              className="show-password-button"
            >
              {showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            </button>
            <p className="message">{passwordMessage}</p>
          </div>

          {/* 비밀번호 확인 입력 양식 */}
          <div className="form-el">
            <label htmlFor="passwordConfirm">비밀번호 확인</label> <br />
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type={showPassword ? "text" : "password"}
              value={passwordConfirm}
              onChange={onChangePasswordConfirm} />
            <br></br>
            <button
              type="button"
              onClick={toggleShowPassword}
              className="show-password-button"
            >
              {showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            </button>
            <p className="message">{passwordConfirmMessage}</p>
          </div>

          {/* 이메일 입력 양식 */}
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

          {/* 휴대전화번호 입력 양식 */}
          <div className="form-el">
            <label htmlFor="phone">휴대전화번호</label> <br />
            <input id="phone" name="phone" value={phone} onChange={addHyphen} />
            <p className="message">{phoneMessage}</p>
          </div>

          {/* 생일 입력 양식 */}
          <div className="form-el">
            <label htmlFor="birth">생일</label> <br />
            <input
              id="birth"
              name="birth"
              type="Date"
              value={birth}
              onChange={onChangeBirth}
            />
            <p className="message">{birthMessage}</p>
          </div>

          {/* 나이 입력 양식 */}
          <div className="form-el">
            <label htmlFor="age">나이 (생일 선택시 자동 선택. 만나이)</label> <br />
            <input
              id="age"
              name="age"
              type="number"
              value={age}
              onChange={onChangeAge}
            />
          </div>

          {/* 성별 입력 양식 */}
          <div className="form-el">
            <label>성별</label> <br />
            <div className="gender-options">
              <div className="gender-option">
                <label htmlFor="남">
                  <input
                    type="radio"
                    id="남"
                    name="gender"
                    value="남"
                    checked={selectedGender === "남"}
                    onChange={handleGenderChange}
                  />
                  남
                </label>
              </div>
              <br></br>
              <div className="gender-option">
                <label htmlFor="여">
                  <input
                    type="radio"
                    id="여"
                    name="gender"
                    value="여"
                    checked={selectedGender === "여"}
                    onChange={handleGenderChange}
                  />여
                </label>
              </div>
            </div>
            <br></br>
            {/* 애인 여부 입력 양식 */}
            <div className="form-el">
              <label>애인 여부</label> <br />
              <div className="gender-options">
                <div className="gender-option">
                  <input
                    type="radio"
                    id="hasPartnerYes"
                    name="hasPartner"
                    value="Y"
                    checked={hasPartner === "Y"}
                    onChange={handleHasPartnerChange}
                  />
                  <label htmlFor="hasPartnerYes">있음</label>
                </div>
                <br></br>
                <div className="gender-option">
                  <input
                    type="radio"
                    id="hasPartnerNo"
                    name="hasPartner"
                    value="N"
                    checked={hasPartner === "N"}
                    onChange={handleHasPartnerChange}
                  />
                  <label htmlFor="hasPartnerNo">없음</label>
                </div>
              </div>
            </div>
            <br></br>


            {/* 혈액형 입력 양식 */}
            <div className="blood-type">
              <label>혈액형</label> <br />
              <select
                id="bloodType"
                name="bloodType"
                type="String"
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

          {/* 지역 입력 양식 */}
          <div className="form-el select-for-place">
            <label htmlFor="place">지역</label> <br />
            <select
              id="place"
              name="place"
              value={selectedPlaceType.placeTypeName}
              onChange={handlePlaceChange}
            >
              <option value="">선택하세요</option>
              {placeTypes.map((placeType) => (
                <option value={placeType.placeTypeName} key={placeType.placeTypeSEQ}>{placeType.placeTypeName}</option>
              ))}
            </select>
          </div>

          {/* MBTI 입력 양식 */}
          <div className="form-el select-for-mbti">
            <label htmlFor="mbti">MBTI</label> <br />
            <select
              id="mbti"
              name="mbti"
              type="String"
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

          {/* 상태 메시지 입력 양식 */}
          <div className="form-el">
            <label htmlFor="statusMessage">상태 메시지 (최대 20자)</label> <br />
            <input
              id="statusMessage"
              name="statusMessage"
              value={statusMessage}
              onChange={onChangeStatusMessage}
              maxLength={20}
            />
            <p className="message">{warningMessage}</p>
          </div>

          {/* 프로필 사진 입력 양식 */}
          <div className="form-el">
            <label htmlFor="profilePicture">프로필 사진</label> <br />
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleProfilePictureUpload}
            />
            <br />
            {profilePictureUrl && (
              <img
                src={profilePictureUrl}
                alt="프로필 사진 미리보기"
                className="profile-picture-preview"
              />
            )}
          </div>

          {/* 관심 주제 선택 양식 */}
          <div className="interest-section">
            <div className="form-el">
              <label>관심 주제를 선택해주세요</label>
              <br />
              <div className="selectlike-box">
                {categoryTypes.map(categoryType => (
                  <div key={categoryType.ctSEQ}>
                    <h3>{categoryType.ctName}</h3>
                    <div className="box-options">
                      {getCategoriesByType(categoryType.ctSEQ).map((category) => (
                        <div
                          key={category.categorySEQ}
                          className={`selectlike-box-item ${selectlike.includes(category.categoryName) ? 'selected' : ''}`}
                          onClick={() => handleInterestClick(category.categoryName)}
                        >
                          {category.categoryName}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <br />
          <br />
          <form onSubmit={handleSubmit} className="signup-form">
            <button type="submit">프로필 수정</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditMyInfo;
