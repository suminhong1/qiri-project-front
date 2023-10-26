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
    const [boards, setBoards] = useState([]);
    const [placeType, setPlaceType] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState('');
    const [selectedPlaceType, setSelectedPlaceType] = useState('');
    const [selectedBoard, setSelectedBoard] = useState('');
    const [selectedPostThema, setSelectedPostThema] = useState('');

    const maxCharacterCount = 100000; // Maximum character count

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

    // 유저
    // const UserInfoAPI = async () => {
    //     const result = await getUser();
    //     setUserInfo(result.data);
    // };

    // thema API
    const themaAPI = async () => {
        const result = await getThema();
        setThema(result.data);
    };
    //place API
    const placeAPI = async () => {
        const result = await getPlace();
        setPlace(result.data);
    };

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
        // themaAPI();
    }, []);

    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault(); // 폼 기본 제출 방지
        } // 첨부파일도 올릴수있게해야함 + URL
        const PostDTO = {
            token: localStorage.getItem('token'),
            postTitle: title,
            postContent: content,
            place: selectedPlace,
            placeTypes: selectedPlaceType,
            // postThema: thema,
            board: selectedBoard,
        };
        console.log(localStorage.getItem('token'));
        console.log('PostDTO:', PostDTO);

        try {
            console.log(PostDTO);
            const postResponse = await addPostAPI(PostDTO); //api 사용 쓰는 명령어 기억하기

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
                        <select value={selectedPlaceType} onChange={(e) => setSelectedPlaceType(e.target.value)}>
                            {placeType?.map((placeType) => (
                                <option key={placeType?.placeTypeSEQ}>{placeType?.placeTypeName}</option>
                            ))}
                        </select>
                    </div>

                    <div id="place-select">
                        <select value={selectedPlace} onChange={(e) => selectedPlace(e.target.value)}>
                            {place?.map((place) => (
                                <option key={place?.placeSEQ}>{place?.placeName}</option>
                            ))}
                        </select>
                    </div>

                    <div id="board-types">
                        <select value={selectedBoard} onChange={(e) => selectedBoard(e.target.value)}>
                            {boards?.map((board) => (
                                <option key={boards?.boardSEQ}>{board?.boardName}</option>
                            ))}
                        </select>
                    </div>

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
                </div>
            </form>
        </>
    );
};
export default PostWrite;
