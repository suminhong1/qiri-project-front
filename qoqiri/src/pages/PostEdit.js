import React, { useState, useEffect } from 'react';
import '../css/PostEdit.css';
import {
    getPlace,
    getPlaceType,
    getEditPost,
    getPost,
    getMatchCate,
    getAttach,
    editPostAPI,
    editMatchingAPI,
    editAttachmentsAPI,
    deletePost,
} from '../api/post';
import { getCategories } from '../api/category';
import { getCategoryTypes } from '../api/categoryType';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { wait } from '@testing-library/user-event/dist/utils';

const PostEdit = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const [post, setPost] = useState(0);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [attachmentImg, setAttachmentImg] = useState([]);

    const [place, setPlace] = useState([]);
    const [placeType, setPlaceType] = useState([]);

    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const [selectedPlace, setSelectedPlace] = useState();
    const [selectedPlaceType, setSelectedPlaceType] = useState(null);

    const [categories, setCategories] = useState([]);
    const [categoryTypes, setCategoryTypes] = useState([]);

    const [selectSeq, setSelectSeq] = useState([]);
    const [selectlike, setSelectlike] = useState([]);

    const maxCharacterCount = 100000;
    // 편집에서 필요한건 기존 정보 불러오는 것! 테이블 3개 정보 다
    // 그 중 카테고리 정보 가지고 온 것! <-- 내가 선택한 카테고리들 얘랑 비교!

    // 게시물 불러오기
    const getPostAPI = async () => {
        const result = await getPost(id);
        console.log(result);

        const postData = result.data;

        setTitle(postData.postTitle);
        setContent(postData.postContent);
        setSelectedPlace(postData.place.placeSEQ);
    };

    const handlePlaceTypeChange = (event) => {
        const selectedType = event.target.value;
        setSelectedPlaceType(selectedType);

        const filtered = place.filter((place) => place.placeType.placeTypeSEQ == selectedType);
        setFilteredPlaces(filtered);

        setSelectedPlace(null);
    };

    const handlePlaceChange = (event) => {
        const selectedPlace = event.target.value;
        setSelectedPlace(selectedPlace);
    };

    // 선택한 category 리스트 불러오기
    const selectCategoryAPI = async () => {
        const selectedCategoriesData = await getMatchCate(id);
        const selectedCategorySEQs = selectedCategoriesData.data.map((item) => item.category.categorySEQ);
        setSelectSeq(selectedCategorySEQs);

        const selectedCategoryTypesData = await getCategoryTypes(selectedCategorySEQs);
        setCategoryTypes(selectedCategoryTypesData.data);
    };

    useEffect(() => {
        getPostAPI();
        selectCategoryAPI();
        selectAttachAPI();
    }, [id]);

    // 첨부파일 불러오기
    const selectAttachAPI = async () => {
        const result = await getAttach(id);
        setAttachmentImg(result.data);
    };

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
    }, [id]);

    const handleCancel = (e) => {
        navigate('/');
        alert('글쓰기를 취소했습니다');
    };
    const handleDelete = async () => {
        try {
            const response = await editPostAPI(id); // id는 게시물의 postSeq

            if (response.status === 200) {
                alert(response);
                navigate(-1);
            } else {
                alert('게시물 삭제에 실패했습니다.');
            }
        } catch (error) {
            alert('게시물 삭제에 실패했습니다.');
        }
    };

    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault(); // 폼 기본 제출 방지
        }
        console.log(selectlike);

        const PostDTO = {
            token: localStorage.getItem('token'), // 유저 정보
            postTitle: title, // 제목
            postContent: content, // 내용
            placeSEQ: selectedPlace, // 선택한 세부 지역
        };
        console.log(localStorage.getItem('token'));
        console.log('PostDTO: ', PostDTO);

        // 선택한 카테고리 seq MatchingCategoryInfo 테이블로 보냄
        const MatchingDTO = {
            categoryList: selectlike,
            categoryTypeList: selectSeq,
        };
        console.log('MatchingDTO: ', MatchingDTO);

        console.log(PostDTO);

        const postResponse = await editPostAPI(PostDTO);

        console.log(postResponse);
        // 첨부 파일
        const formData = new FormData();

        formData.append('postId', postResponse.data.postSEQ);

        console.log(attachmentImg);
        console.log(attachmentImg.length);

        attachmentImg.forEach((image) => {
            formData.append('files', image);
        });

        console.log(MatchingDTO.categoryList);
        console.log(MatchingDTO.categoryList.map((categorySEQ) => ({ categorySEQ })));

        const matchingResponse = await editMatchingAPI({
            postSEQ: postResponse.data.postSEQ,
            categories: MatchingDTO.categoryList.map((categorySEQ) => ({ categorySEQ })), // 이게 map으로 카테고리랑 카테고리 타입 SEQ묶어서 보내는 것
        });
        console.log(matchingResponse);

        const attachmentResponse = await editAttachmentsAPI(formData);
        console.log(attachmentResponse);
        console.log(postResponse.data.postSEQ);

        if (postResponse.data) {
            alert('글쓰기 성공');

            navigate('/');
        } else {
            alert('글쓰기 실패');
        }
    };

    const navigate = useNavigate();
    return (
        <>
            <div id="form-container">
                <div id="form">
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
                                                            selectSeq.includes(category.categorySEQ) ? 'selected' : ''
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
                        </div>
                            <div className='select-place'>
                                <h1>지역 선택</h1>
                                <select onChange={handlePlaceTypeChange} style={{ background: 'antiquewhite', color: '#ff9615', fontWeight: 'bold' }}>
                                    <option className= 'place-option'value="">지역을 선택해주세요</option>
                                    {placeType.map((type) => (
                                        <option key={type.placeTypeSEQ} value={type.placeTypeSEQ}>
                                            {type.placeTypeName}
                                        </option>
                                    ))}
                                </select>

                                {selectedPlaceType && (
                                    <div className='select-place'>
                                        <h2>상세 지역</h2>
                                        <select onChange={handlePlaceChange} style={{ background: 'antiquewhite', color: '#ff9615', fontWeight: 'bold' }}>
                                            <option className= 'place-option' value="">상세 지역을 선택해주세요</option>
                                            {filteredPlaces.map((place) => (
                                                <option key={place.placeSEQ} value={place.placeSEQ}>
                                                    {place.placeName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
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
                                    value={content}
                                    // key={post?.postSEQ}
                                ></textarea>
                                <div className="wordCount">
                                    내용:
                                    {content.length} / {maxCharacterCount}
                                </div>
                            </div>
                        </div>

                        <div className="updateButton">
                            <button type="submit" onClick={handleSubmit}>
                                수정
                            </button>
                        </div>
                        <div className="cancelButton">
                            <button onClick={handleCancel}>취소 </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
export default PostEdit;
