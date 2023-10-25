import React, { useState, useEffect } from 'react';
import '../css/PostWrite.css';
import axios from 'axios'; 
import { navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../api/user';
import { addPost, getThema } from '../api/post';

const PostWrite = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // const [url, setUrl] = useState('');
    // const [userInfo, setUserInfo] = useState([]);
    const [thema, setThema] = useState([]);
    const maxCharacterCount = 100000; // Maximum character count

    // const handleSubmit = ()=>{
    //     console.log(title);
    //     console.log(content);

    //     const postDTO = new FormData();
    //     postDTO.append("title",title)
    //     postDTO.append("content",content)

    //     addPost(postDTO);

    // }

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
 
    // 테마 API
    // const themaAPI = async () => {
    //     const result = await getThema();
    //     setThema(result.data);
    // };

    // useEffect(() => {
        
    //     themaAPI();
       
    // }, []);

    
    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault(); // 폼 기본 제출 방지
        }

        // const PostWriteDTO = {
        //     title,
        //     content,
        //     // postThemaSeq,
           
        // };
       

        const PostDTO = {
            token: localStorage.getItem('token'),
            postTitle: title,
            postContent: content,        
        //     postThemaSeq: thema,
        
        };
        console.log(localStorage.getItem('token'));
        console.log('PostDTO:', PostDTO);

        try {
            console.log(PostDTO);
            const postResponse = await axios.post('http://localhost:8080/qiri/post', PostDTO);

            if (postResponse.data) {
                alert('글쓰기 성공');
                // navigate('/');
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
        </>
    );
};
export default PostWrite;
