import React, { useState, useEffect,useRef } from 'react';
import '../css/PostEdit.css';
import {
    getPlace,
    getPlaceType,
    getPost,
    getMatchCate,
    getAttach,
    editPostAPI,
    editMatchingAPI,
    editAttachmentsAPI,
    getSelectPlace,
    getSelectPlaceType,
    getSelectAttach
} from '../api/post';
import { getCategories } from '../api/category';
import { getCategoryTypes } from '../api/categoryType';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const PostEdit = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const [post, setPost] = useState(0);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [attachmentImg, setAttachmentImg] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [selectAttach, setSelectAttach] = useState([]);
    const [boards, setBoards] = useState([]);
    const [selectedBoard, setSelectedBoard] = useState(1);
    const fileInputRef = useRef(null); // 미리보기

    const [place, setPlace] = useState([]);
    const [placeType, setPlaceType] = useState([]);

    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const [selectedPlace, setSelectedPlace] = useState();
    const [selectedPlaceType, setSelectedPlaceType] = useState(null);

    const [selectedPlaceName, setSelectedPlaceName] = useState('');
    const [selectedPlaceTypeName, setSelectedPlaceTypeName] = useState('');

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
       
        // 선택한 상세 지역 정보 불러오기    
        const selectedPlaceData = await getSelectPlace(postData.place.placeSEQ); 
        setSelectedPlaceName(selectedPlaceData.data.placeName);

        // 선택한 지역 타입 정보 불러오기
        const selectedPlaceTypeData = await getSelectPlaceType(postData.place.placeType.placeTypeSEQ);
        setSelectedPlaceTypeName(selectedPlaceTypeData?.data?.placeTypeName);

        setSelectedPlace(postData?.place?.placeSEQ);
        setSelectedPlaceType(postData?.place?.placeType?.placeTypeSEQ);
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

    // 첨부한 첨부파일 불러오기
    const getSelectAttachAPI = async () =>{
        const selectedAttachData = await getSelectAttach(id);
        setSelectAttach(selectedAttachData.data)
    };

    useEffect(() => {
        getPostAPI();
        selectCategoryAPI();
        selectAttachAPI();
        getSelectAttachAPI();
    }, [id]);

    // 불러온 첨부파일 미리보기
    const selectAttachAPI = async () => {
        const result = await getAttach(id);
        setImagePreviews(result.data);
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
    const maxFileCount = 3;
    // 첨부파일 핸들러
    const handleUploadImage = async (e) => {
        const files = e.target.files;

        if (files.length === 0) {
            // 파일이 선택되지 않았을 때 아무 동작도 하지 않음
            return;
        }
        console.log(files);

        const maxFileSize = 10 * 1024 * 1024; // 사진 용량 제한 10mb
        const newAttachmentImg = [];

        for (let i = 0; i < files.length; i++) { // 사진 3장까지만 제한
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

        setAttachmentImg(newAttachmentImg); // 변경된 첨부 파일 배열을 상태로 설정
        if (newAttachmentImg.length > 0) {
            updateImagePreviews(newAttachmentImg);
        }
    
        // 파일 업로드 필드 초기화
       fileInputRef.current.value = '';
    };

    // 첨부파일 미리보기
    const updateImagePreviews = (newAttachmentImg) => {
        const previews = [];
    
        for (let i = 0; i < newAttachmentImg.length && i < maxFileCount; i++) {
            previews.push(URL.createObjectURL(newAttachmentImg[i]));
        }
        setImagePreviews(previews); // 새로운 미리보기 이미지 URL 설정
    };

    // 첨부파일 미리보기 중복방지
    useEffect(() => {
        setImagePreviews([]);
    }, [attachmentImg]);

    // 첨부파일 제거
    const removeImage = async (index) => {
        const newAttachmentImg = [...attachmentImg];
        newAttachmentImg.splice(index, 1);
        setAttachmentImg(newAttachmentImg);
        updateImagePreviews(newAttachmentImg);
  };
    // 카테고리 선택 핸들러
    const handleInterestClick = (categorySEQ, TypeSEQ) => {
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

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault(); // 폼 기본 제출 방지
        }
        const PostDTO = {      
            token: localStorage.getItem('token'),  
            postTitle: title, 
            postContent: content,     
            placeSEQ: selectedPlace,
            placeTypeSEQ: selectedPlaceType,   
            boardSEQ: selectedBoard,
        };

       let postResponse;

        try {
            postResponse = await editPostAPI(PostDTO);  
            console.log(postResponse); 
            console.log('Server response data:', postResponse.data);// 빈 문자열 찍힘 형변환 에러 해결하기
            console.log('config.data:', postResponse.config.data);
            console.log(selectlike); // 확인용 로그 출력 
            const MatchingDTO = {

                // categoryList: selectlike.map(item => isNaN(item) ? 0 : Number(item)), // 얘만 자꾸 Nan이 떠버리네
                // categoryTypeList: selectSeq.map(Number),

                categoryList: selectlike, // 얘를 문자열에서 정수형으로 바꿔서 데이터를 전송해야함 얘가 카테고리 seq
                categoryTypeList: selectSeq,
            };
                console.log(MatchingDTO);

                // 첨부파일 업로드 부분 

                if (attachmentImg.length > 0) {
                    const formData = new FormData();
                    formData.append('postId', postResponse.data.postSEQ);
                    attachmentImg.forEach((image) => {
                        formData.append('files', image);
                    });
                    const attachmentResponse = await editAttachmentsAPI(formData);
                    console.log(attachmentResponse);// 여기도 안찍히고
                }

                // editMatchingAPI 호출
                const matchingResponse = await editMatchingAPI({ // 콘솔에 여기 오류 찍힘
                    postSEQ: postResponse.data.postSEQ, 
                    categories: MatchingDTO.categoryList.map(categorySEQ => ({ categorySEQ })), 
                    // 이걸 어떤식으로 보내야 허냐..
                });   
               
                console.log(matchingResponse);  
                console.log(matchingResponse.data);    
                if (postResponse.data) {
                    alert('글쓰기 성공');
                    navigate('/');
                } else {
                    alert('글쓰기/수정 중 오류가 발생했습니다.');
                    console.log('Error response:', postResponse); 
                }
            } catch (error) {
                console.error('Error adding/editing post:', error);
                alert('글쓰기/수정 중 오류가 발생했습니다.');
            }
    };

    return (
        <>
            <div id="form-container">
                <div id="form">
                    <form method="PUT">
                        <div id="interest-section">
                            <div className="form-el">
                                <br />
                                <div className="edit-categoryLike-box">
                                    {categoryTypes.map((categoryType) => (
                                        <div key={categoryType.ctSEQ}>
                                            <h3>{categoryType.ctName}</h3>
                                            <div className="edit-box-options">                                      
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
                                <select onChange={handlePlaceTypeChange} style={{ background: 'antiquewhite', color: '#ff9615', fontWeight: 'bold', borderRadius: '5px', border: 'none', marginLeft:'10px'}} >
                                    <option className= 'place-option'>{selectedPlaceTypeName}</option>
                                    {placeType.map((type) => (
                                        <option key={type.placeTypeSEQ} value={type.placeTypeSEQ}>
                                            {type.placeTypeName}
                                        </option>
                                    ))}
                                </select>

                                {selectedPlaceType && (
                                    <div className='select-place'>
                                        <h2>상세 지역</h2>
                                        <select onChange={handlePlaceChange} style={{ background: 'antiquewhite', color: '#ff9615', fontWeight: 'bold',  borderRadius: '5px', border: 'none', marginLeft:'10px' }}>
                                            <option className= 'place-option'>{selectedPlaceName}</option>
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
                        <div>
                                <div className="board-image-main">
                                    <div className="board-image">
                                        {attachmentImg.map((attachment, index) => (
                                            <div key={index}>
                                       <img                                                
                                            src={URL.createObjectURL(attachment)}
                                            alt={`사진 ${index + 1}`}
                                        />
                                                <button id='remove-image' onClick={() => removeImage(index)}>삭제</button>
                                            </div>     
                                        ))}
                                    </div>
                                </div>
                                {imagePreviews.map((preview, index) => (
                                    <img
                                        key={index}
                                        src={preview}
                                        alt={`${index + 1}`}
                                        style={{ width: '150px', height: '150px' }}
                                    />
                                ))}
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
