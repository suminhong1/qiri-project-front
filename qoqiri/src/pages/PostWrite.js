import React, { useState, useEffect } from 'react';
import '../css/PostWrite.css';
import axios from 'axios';
import { navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../api/user';
import { addPostAPI, getBoards, getPlace, getPlaceType, getThema } from '../api/post';

const PostWrite = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // const [url, setUrl] = useState('');
    // const [userInfo, setUserInfo] = useState([]);
    const [thema, setThema] = useState([]);
    const [place, setPlace] = useState([]);
    const [placeType, setPlaceType] = useState([]);
    // const [boards, setBoards] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(1);
    const [selectedPlaceType, setSelectedPlaceType] = useState(1);
    const [selectlike, setSelectlike] = useState([]);
    const [categoryTypes, setCategoryTypes] = useState([]); // Initialize as an array
    const [categories, setCategories] = useState([]); // Initialize as an array

    const maxCharacterCount = 100000; // 게시판 글자 제한

    const navigate = useNavigate();

    // 제목 입력 핸들러
    const onChangeTitle = (e) => {
        const currentTitle = e.target.value;
        setTitle(currentTitle);
    };

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

const getCategoriesByType = (ctSEQ) => {
    return categories.filter((category) => category.categoryType && category.categoryType.ctSEQ === ctSEQ);
};
    // UserInfo API
    // const UserInfoAPI = async () => {
    //     const result = await getUser();
    //     setUserInfo(result.data);
    // };

    // thema API
    // const themaAPI = async () => {
    //     const result = await getThema();
    //     setThema(result.data);
    // };
    // place 리스트 불러오기
    const placeAPI = async () => {
        const result = await getPlace();
        setPlace(result.data);
    };

    // placeType 리스트 불러오기
    const placeTypeAPI = async () => {
        const result = await getPlaceType();

        setPlaceType(result.data);
    };

    // const boardsAPI = async () => {
    //     const result = await getBoards();
    //     setBoards(result.data);
    // };
    useEffect(() => {
        placeAPI();
        placeTypeAPI();
        // boardsAPI();
        // themaAPI();
    }, []);

    useEffect(() => {
        console.log(selectedPlace);
    }, [selectedPlace]);
    useEffect(() => {
        console.log(selectedPlaceType);
    }, [selectedPlaceType]);

    //dto 방식으로 서버에 전송
    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault(); // 폼 기본 제출 방지
        } // 첨부파일도 올릴수있게해야함 + URL
        const PostDTO = {
            token: localStorage.getItem('token'),
            postTitle: title,
            postContent: content,
            placeSeq: selectedPlace,
            placeTypeSeq: selectedPlaceType,

            // postThema: thema,
            // board: selectedBoard,
        };
        console.log(localStorage.getItem('token'));
        console.log('PostDTO:', PostDTO);

        try {
            console.log(PostDTO);
            const postResponse = await addPostAPI(PostDTO); //addPostAPI를 이용해 서버로 전달  //api 사용 쓰는 명령어 기억하기

            if (postResponse.data) {
                alert('글쓰기 성공');
                navigate('/');
            } else {
                alert('글쓰기 실패');
            }
        } catch (error) {
            console.error(error);
            alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <>
            <form method="POST">
            <div className="interest-section">
                            <div className="form-el">
                                <br />
                                <div className="selectlike-box">
                                    {categoryTypes.map((categoryType) => (
                                        <div key={categoryType.ctSEQ}>
                                            <h3>{categoryType.ctName}</h3>
                                            <div className="box-options">
                                                {getCategoriesByType(categoryType.ctSEQ).map((category) => (
                                                    <div
                                                        key={category.categorySEQ}
                                                        className={`selectlike-box-item ${
                                                            selectlike.includes(category.categoryName) ? 'selected' : ''
                                                        }`}
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
                <div id="postTitle">
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={onChangeTitle}
                        placeholder="제목"
                        maxLength="100"
                    />

                    <div id="place-types">
                        <select
                            onChange={(e) => {
                                setSelectedPlaceType(e.target.value); // 사용자가 선택한 placeTypeName을 placeTypeSEQ로 setSelectedPlaceType에 저장
                            }}
                        >
                            {placeType?.map((placeType) => (
                                <option key={placeType?.placeTypeSEQ} value={placeType?.placeTypeSEQ}>
                                    {/* value에 선택한 placeType name을 placeTypeSEQ로 할당*/}
                                    {placeType?.placeTypeName}
                                    {/*getPlaceTypeAPI로 불러온 placeType 리스트를  select 바에서 이름으로 보여줌*/}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div id="place-select">
                        <select
                            onChange={(e) => {
                                setSelectedPlace(e.target.value); // 사용자가 선택한 placeName을 placeSEQ로 setSelectedPlace에 저장
                            }}
                        >
                            {place?.map((place) => (
                                <option key={place?.placeSeq} value={place?.placeSeq}>
                                    {/* value에 선택한 place name을 placeSEQ로 할당*/}
                                    {place?.placeName}
                                    {/*getPlaceAPI로 불러온 place 리스트를  select 바에서 이름으로 보여줌*/}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* <div id="board-types">
                        <select value={selectedBoard} onChange={(e) => setSelectedBoard(e.target.value)}>
                            {boards?.map((board) => (
                                <option key={boards?.boardSEQ}>{board?.boardName}</option>
                            ))}
                        </select>
                    </div> */}

                    {/* <div id="post-thema">
                        <select>
                            {thema?.map((postThema) => (
                                <option>{postThema?.PtName}</option>
                            ))}
                        </select>
                    </div> */}
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
                        등록 취소버튼도 ㄱㄱ
                    </button>
                </div>
                <div className="updateButton">
                    <button type="submit" onClick={handleSubmit}>
                        수정
                    </button>
                </div>
                <div className="deleteButton">
                    <button type="submit" onClick={handleSubmit}>
                        삭제
                    </button>
                </div>
            </form>
        </>
    );
};
export default PostWrite;
