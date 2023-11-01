import React, { useState, useEffect } from 'react';
import '../css/PostEdit.css';
import { getPlace, getPlaceType, getEditPost, getPost } from '../api/post';
import { getCategories } from '../api/category';
import { getCategoryTypes } from '../api/categoryType';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// import axios from "axios";

// const instance = axios.create({
//     baseURL: "http://localhost:8080/qiri",
//   });
  
//   export const getPosts = async () => {
//     return await instance.get("/public/post");
//   };

const PostEdit = () => {
    
    const {id} = useParams();
    const dispatch = useDispatch();

    // const [editPost, setEditPost] = useState(0);
    const [post, setPost]=useState(0);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [attachmentImg, setAttachmentImg] = useState([]);

    const [place, setPlace] = useState([]);
    const [placeType, setPlaceType] = useState([]);

    const [selectedPlace, setSelectedPlace] = useState(1);
    const [selectedPlaceType, setSelectedPlaceType] = useState(1);

    // const [selectedBoard, setSelectedBoard] = useState(1);

    const [categories, setCategories] = useState([]);
    const [categoryTypes, setCategoryTypes] = useState([]);

    const [selectSeq, setSelectSeq] = useState([]);
    const [selectlike, setSelectlike] = useState([]);

    const maxCharacterCount = 100000;

    useEffect(()=>{
        getPostAPI();
    },[id]);

    // 수정할 게시글 불러오기
    // const postAPI = async () => {
    //     const result = await getEditPost();
    //     setEditPost(result.data);
    // };

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
    // 첨부 파일 핸들러
    const handleUploadImage = async (e) => {
        const files = e.target.files;

        console.log(files);

        const maxFileSize = 10 * 1024 * 1024;
        const maxFileCount = 3;
        const newAttachmentImg = [...attachmentImg];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (file.size <= maxFileSize) {
                if (newAttachmentImg.length < maxFileCount) {
                    newAttachmentImg.push(file);
                } else {
                    alert('사진은 3장까지만 업로드 할 수 있습니다.');
                    break;
                }
            } else {
                alert('사진 용량이 10MB를 초과합니다.');
            }
        }
        setAttachmentImg(newAttachmentImg);
    };

    // 카테고리 선택 핸들러
    const handleInterestClick = (categorySEQ, TypeSEQ) => {
        // console.log(seq);
        setSelectlike([]);
        setSelectSeq([]);

        if (selectlike.includes(categorySEQ)) {
            setSelectlike(selectlike.filter((item) => item !== categorySEQ));
            setSelectSeq(selectSeq.filter((item) => item !== TypeSEQ));
        } else {
            setSelectlike([...selectlike, categorySEQ]);
            setSelectSeq([...selectSeq, TypeSEQ]);
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
    // 게시물 불러오기
    const getPostAPI = async ()=>{
        const result = await getPost(id);
        setPost(result.data)
    }

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

    

    useEffect(() => {
       
        placeAPI();
        placeTypeAPI();
    }, []);

    const handleCancel = (e) => {
        navigate('/');
        alert('글쓰기를 취소했습니다');
    };

    const navigate = useNavigate();
    return (
        <>
            <div id="form-container" >
                <div id="form" key={post?.postSEQ}> 
                    <form method="POST">
                        <div id="interest-section">
                            <div className="form-el">
                                <br />
                                <div className="edit-categoryLike-box">
                                    {categoryTypes.map((categoryType) => (
                                        <div key={categoryType.ctSEQ}>
                                            <h3>{categoryType.ctName}</h3>
                                            <div className="edit-box-options">
                                                {/* 여기서 한번에 묶은 카테고리 카테고리 타입을 맵으로 보여줌 */}
                                                {getCategoriesByType(categoryType.ctSEQ).map((category) => (
                                                    <div
                                                        key={category.categorySEQ}
                                                        className={`edit-categoryLike-box-item ${
                                                            selectlike.includes(category.categoryName) ? 'selected' : ''
                                                            // 선택한 카테고리 배경색 나오게함
                                                        }`}
                                                        onClick={() =>
                                                            handleInterestClick(
                                                              category.categoryName,
                                                              category.categorySEQ
                                                            )
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
                        <div id="postTitle">
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={title}
                                onChange={onChangeTitle}
                                placeholder={post?.postTitle}
                                maxLength="100"
                            />

                            <div className="place-types">
                                <select
                                    onChange={(e) => {
                                        setSelectedPlaceType(e.target.value);
                                    }}
                                >
                                    {placeType?.map((placeType) => (
                                        <option key={placeType?.placeTypeSEQ} value={placeType?.placeTypeSEQ}>
                                            {placeType?.placeTypeName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="edit-place-types">
                                <select
                                    onChange={(e) => {
                                        setSelectedPlace(e.target.value);
                                    }}
                                >
                                    {place?.map((place) => (
                                        <option key={place?.placeSeq} value={place?.placeSeq}>
                                            {place?.placeName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div id="file-update">
                            <label htmlFor="image-update">
                                <input
                                    type="file"
                                    id="image-update"
                                    className="image-update"
                                    accept="image/*"
                                    onChange={handleUploadImage}
                                    multiple
                                />
                                <span>사진첨부</span>
                            </label>
                        </div>

                        <div className="post-content">
                            <div className="textareaContainer">
                                <textarea
                                    name="post-content"
                                    id="editor"
                                    maxLength={maxCharacterCount}
                                    onChange={handleEditorChange}
                                    value={post?.postContent}
                                ></textarea>
                                <div className="wordCount">
                                    내용:                               
                                    {content.length} / {maxCharacterCount}                                
                                </div>
                            </div>
                        </div>

                        <div className="updateButton">
                            <button>
                                {/* <button type="submit" onClick={handleSubmit}> */}
                                수정
                            </button>
                        </div>
                        <div className="cancelButton">
                            <button onClick={handleCancel}>취소 </button>
                        </div>
                        {/* 
                            <div className="deleteButton">
                                <button type="submit" onClick={handleSubmit}>
                                    삭제
                                </button>
                            </div> */}
                    </form>
                </div>
            </div>
        </>
    );
};
export default PostEdit;
