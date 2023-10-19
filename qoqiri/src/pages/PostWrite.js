import React, { useState, useEffect } from "react";
import BuildedEditor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor as Editor } from "@ckeditor/ckeditor5-react";
import "../css/PostWrite.css";
import { getCategories } from "../api/category";
import { getCategoryTypes } from "../api/categoryType";
import axios from "axios"; // axios 모듈 가져오기
import { navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getBoard } from "../api/board";
import { getUser } from "../api/user";
import { getPlaceTypes } from "../api/placeType";

const PostWrite = () => {
  const [content, setContent] = useState(""); // State variable to store the content of the editor
  const maxCharacterCount = 100000; // Maximum character count
  const [firstSelectOption, setFirstSelectOption] = useState("");
  const [secondSelectOption, setSecondSelectOption] = useState("");
  const [subOptions, setSubOptions] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]); // Initialize as an array
  const [categories, setCategories] = useState([]); // Initialize as an array
  const [title, setTitle] = useState(""); // Initialize as a string
  const [selectlike, setSelectlike] = useState([]);

  const navigate = useNavigate();

  const handleFirstSelectChange = (event) => {
    const selectedValue = event.target.value;
    setFirstSelectOption(selectedValue);

    if (selectedValue === "categoryType") {
      setSubOptions(getCategoriesByType(categoryTypes.ctSEQ)); // Use the correct array
    } else {
      setSubOptions([]); // Reset the subOptions
    }

    setSecondSelectOption("");
  };

  // 제목 입력 핸들러
  const onChangeTitle = (e) => {
    const currentTitle = e.target.value;
    setTitle(currentTitle);
  };

  // const handleButtonClick = () => {
  //   console.log("첫 번째 선택: ", firstSelectOption);
  //   console.log("두 번째 선택: ", secondSelectOption);
  // };

  const handleEditorChange = (event) => {
    const newContent = event.target.value;
    setContent(newContent);
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
    return categories.filter(
      (category) =>
        category.categoryType && category.categoryType.ctSEQ === ctSEQ
    );
  };

  const [placeTypes, setPlaceTypes] = useState([]);

  const placeTypeAPI = async () => {
    const result = await getPlaceTypes();
    setPlaceTypes(result.data);
  };

  const [userInfo, setUserInfo] = useState([]);

  const UserInfoAPI = async () => {
    const result = await getUser();
    setUserInfo(result.data);
  };

  const [board, setBoard] = useState([]);

  const boardAPI = async () => {
    const result = await getBoard();
    setBoard(result.data);
  };

  useEffect(() => {
    placeTypeAPI();
    boardAPI();
    UserInfoAPI();
  }, []);

  const [selectedPlaceType, setSelectedPlaceType] = useState({
    placeTypeSEQ: "", // 선택한 placeType의 placeTypeSEQ
    placeTypeName: "", // 선택한 placeType의 placeTypeName
  });

  const [selectedBoard, setSelectedBoard] = useState({
    boardSeq: "", // 선택한 placeType의 placeTypeSEQ
    boardName: "", // 선택한 placeType의 placeTypeName
  });

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    const PostWriteDTO = {
      title,
      content,
      placeType: selectedPlaceType,
      board: selectedBoard,
    };

    const PostDTO = {
      PostWriteDTO,
      userCategories: selectlike.map((categoryName) => ({ categoryName })),
    };

    console.log("PostWriteDTO:", PostWriteDTO);

    try {
      const postResponse = await axios.post(
        "http://localhost:8080/qiri/post",
        PostDTO
      );

      if (postResponse.data) {
        alert("글쓰기 성공");
        navigate("/");
      } else {
        alert("글쓰기 실패");
      }
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div className="postWrite-main">
        <div className="postWrite">
          <form method="POST">
            {/* 관심 주제 선택 양식 */}
            <div className="interest-section">
              <div className="form-el">
                <br />
                <div className="selectlike-box">
                  {categoryTypes.map((categoryType) => (
                    <div key={categoryType.ctSEQ}>
                      <h3>{categoryType.ctName}</h3>
                      <div className="box-options">
                        {getCategoriesByType(categoryType.ctSEQ).map(
                          (category) => (
                            <div
                              key={category.categorySEQ}
                              className={`selectlike-box-item ${
                                selectlike.includes(category.categoryName)
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() =>
                                handleInterestClick(category.categoryName)
                              }
                            >
                              {category.categoryName}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="title">
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={onChangeTitle}
                placeholder="제목"
                maxLength="100"
              />
            </div>
            <div className="post-content">
              <div className="textareaContainer">
                <textarea
                  name="post-content"
                  id="editor"
                  maxLength={maxCharacterCount}
                  onChange={handleEditorChange}
                  value={content}
                ></textarea>
                <div className="wordCount">
                  내용: {content.length} / {maxCharacterCount}
                </div>
              </div>
            </div>
            <div className="button">
              <button type="submit" onClick={handleSubmit}>
                등록
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default PostWrite;
