import React, { useState, useEffect } from 'react';
import '../css/PostWrite.css';
import axios from 'axios';
import { navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../api/user';
import { addPostAPI, addMatchingAPI, getBoards, getPlace, getPlaceType } from '../api/post';
import { getCategories } from '../api/category';
import { getCategoryTypes } from '../api/categoryType';

const PostWrite = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // const [userInfo, setUserInfo] = useState([]);

    const [place, setPlace] = useState([]);
    const [placeType, setPlaceType] = useState([]);

    const [selectedPlace, setSelectedPlace] = useState(1);
    const [selectedPlaceType, setSelectedPlaceType] = useState(1);

    const [boards, setBoards] = useState([]);
    const [selectedBoard, setSelectedBoard] = useState(1);

    const [categories, setCategories] = useState([]);
    const [categoryTypes, setCategoryTypes] = useState([]);

    const [selectSeq, setSelectSeq] = useState([]);
    const [selectlike, setSelectlike] = useState([]);

    const maxCharacterCount = 100000; // 게시판 글자 제한

    const navigate = useNavigate();

    // 제목 입력 핸들러
    const onChangeTitle = (e) => {
        const currentTitle = e.target.value;
        setTitle(currentTitle);
    };
    // 내용 입력 핸들러
    const handleEditorChange = (event) => {
        const newContent = event.target.value;
        setContent(newContent);
    };

    // 카테고리 선택 핸들러
    const handleInterestClick = (categorySEQ, TypeSEQ) => {
        // console.log(seq);
        setSelectlike([]);
        setSelectSeq([]);

        if (selectlike.includes(categorySEQ)) {
            setSelectlike(selectlike.filter((item) => item !== categorySEQ)); // selectLike(선택할 주제들) 배열임 그 안에 interest(관심사)가 포함돼있으면 interest를 제거함
            setSelectSeq(selectSeq.filter((item) => item !== TypeSEQ)); // seq가 뭔 배열인데
        } else {
            setSelectlike([...selectlike, categorySEQ]); // selectLike(선택할 주제들) 배열에  interest 관심사가 포함돼있지 않으면 interest를 selectLike 배열에 추가하고
            setSelectSeq([...selectSeq, TypeSEQ]); // 얘도그렇고
        }
    };

    // 카테고리, 카테고리 타입
    useEffect(() => {
        const fetchCategoryTypes = async () => {
            const result = await getCategoryTypes();
            setCategoryTypes(result.data);
        };

        const fetchCategories = async () => {
            const result = await getCategories();
            // console.log(result.data);
            setCategories(result.data);
        };

        fetchCategoryTypes();
        fetchCategories();
    }, []);

    // 카테고리랑 카테고리 타입이랑 한꺼번에 묶어서 아래
    const getCategoriesByType = (ctSEQ) => {
        return categories.filter((category) => category.categoryType && category.categoryType.ctSEQ === ctSEQ);
    };

    // UserInfo API
    // const UserInfoAPI = async () => {
    //     const result = await getUser();
    //     setUserInfo(result.data);
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

    const boardsAPI = async () => {
        const result = await getBoards();
        setBoards(result.data);
    };

    useEffect(() => {
        placeAPI();
        placeTypeAPI();
        boardsAPI();
    }, []);

    useEffect(() => {
        console.log(selectedPlace);
    }, [selectedPlace]);

    useEffect(() => {
        console.log(selectedPlaceType);
    }, [selectedPlaceType]);

    // useEffect(() => {
    //     console.log(selectedBoard);
    // }, [selectedBoard]);

    const handleCancel = (e) => {
        navigate('/');
        alert('글쓰기를 취소했습니다');
    };
    //dto 방식으로 서버에 전송
    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault(); // 폼 기본 제출 방지
        }
        console.log(selectlike);
        console.log(selectSeq);
        // 첨부파일도 올릴수있게해야함
        const PostDTO = {
            token: localStorage.getItem('token'),
            postTitle: title,
            postContent: content,
            placeSeq: selectedPlace,
            placeTypeSeq: selectedPlaceType,
            boardSeq: selectedBoard,
            categoryList: selectlike,
            categoryTypeList: selectSeq,
            
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
            <div id="form-container">
                <div id="form">
                    <form method="POST">
                        <div id="interest-section">
                            <label>관심 주제를 선택하세요</label>
                            <div className="form-el">
                                <br />
                                <div className="selectlike-box">
                                    {categoryTypes.map((categoryType) => (
                                        <div key={categoryType.ctSEQ}>
                                            <h3>{categoryType.ctName}</h3>
                                            <div className="box-options">
                                                {/* 여기서 한번에 묶은 카테고리 카테고리 타입을 맵으로 보여줌 */}
                                                {getCategoriesByType(categoryType.ctSEQ).map((category) => (
                                                    <div
                                                        key={category.categorySEQ}
                                                        className={`selectlike-box-item ${
                                                            selectlike.includes(category.categoryName) ? 'selected' : ''
                                                            // 삼항연산자의 조건을 확인해서 selecLike배열에 카테고리 이름이 포함되어 있으면 selected 추가? 포함되지 않으면 빈 문자열을 반환 아 이거 내가 postList에서 내가 접속한 페이지 색깔바뀌는거랑 비슷한거임
                                                        }`}
                                                        onClick={() =>
                                                            handleInterestClick(
                                                                // 선택된 카테고리 이름과 seq를 selectLike 배열에 추가하거나 제거하는 이벤트 selectSeq도 마찬가지

                                                                category.categorySEQ,
                                                                category.categoryType.ctSEQ
                                                            )
                                                        }
                                                    >
                                                        {/* {console.log(category)} */}
                                                        {category.categoryName}
                                                        {/*페이지에서 직접 보이는 카테고리 이름*/}
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

                            <div id="place-types">
                                <select
                                    onChange={(e) => {
                                        setSelectedPlace(e.target.value); // 사용자가 선택한 placeName을 placeSEQ로 setSelectedPlace에 저장
                                    }}
                                >
                                    {place?.map((place) => (
                                        <option key={place?.placeSeq} value={place?.placeSeq}>
                                            {/* value에 선택한 place name을 placeSEQ로 할당*/}
                                            {place?.placeName}
                                            {/* getPlaceAPI로 불러온 place 리스트를  select 바에서 이름으로 보여줌*/}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div id="board-types">
                                <select
                                    onChange={(e) => {
                                        setSelectedBoard(e.target.value);
                                    }}
                                >
                                    {boards?.map((board) => (
                                        <option key={board?.boardSEQ} value={board?.boardSEQ}>
                                            {/*사용자가 선택한 board를 boardName으로 불러온 후 boardSeq값을 할당*/}
                                            {board?.boardName}
                                            {/* getBoardsAPI로 불러온 board 리스트를 select 바에서 이름으로 보여줌*/}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {/* {console.log('typeof boardSeq', typeof 'boardSeq')}; */}
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
                        <div className="updateButton">
                            <button type="submit" onClick={handleSubmit}>
                                수정
                            </button>
                        </div>
                        <div className="deleteButton">
                            <button type="submit" onClick={handleSubmit}>
                                삭제
                            </button>
                            <div className="cancelButton">
                                <button onClick={handleCancel}>취소 </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
export default PostWrite;
