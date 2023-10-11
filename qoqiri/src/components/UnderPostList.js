import '../css/UnderPostList.css';
import kkorang from '../assets/kkorang3.jpg';
import axios from 'axios';
import { useEffect, useState } from 'react';

const instance = axios.create({
    baseURL: 'http://localhost:8080/qiri/',
});

// 백단 서버에 요청하는거
export const getPosts = async () => {
    return await instance.get('post');
};

const UnderPostList = () => {
    const [posts, setPosts] = useState([]);

    // 프론트단에서 보여질수있게 하는것
    const postAPI = async () => {
        const result = await getPosts();
        setPosts(result.data);
    };
    // useEffect API는 좀더 공부해야함
    useEffect(() => {
        postAPI();
    }, []);

    return (
        <>
            <h2 className="bottomBoardListHeader"> 전체글</h2>

            <section id="boardList" className="simple">
                <div className="item listHeader">
                    <div className="info2">
                        <div className="titleContainer">
                            <span className="title">
                                <span className="text1">제목</span>
                            </span>
                        </div>
                        <div className="etc1">
                            <div className="nickName">글쓴이</div>
                            <div className="datetime field">날짜</div>
                            <div className="viewCount number">조회</div>
                            <div className="likeCount number">추천</div>
                        </div>
                    </div>
                </div>

                {posts.map((post) => (
                    <a key={post.postSEQ} className="underList" href="#">
                        <div className="info3">
                            <div className="titleContainer">
                                <div className="bestImage">
                                    {/*백단 도메인의 필드명이랑 이름맞춰줘야함 */}
                                    {/* 여기 이제 url 방식으로 Blob써서 넣어야함 */}
                                    {/* <img
                                        src={kkorang}
                                        style={{
                                            maxWidth: '100%',
                                            height: '30px',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            borderRadius: '3px',
                                        }}
                                    /> */}
                                </div>
                                {/* <span className="category">{post.category}</span> */}
                                <span className="title">
                                    {/* <span className="text">[기타취미] &nbsp;</span> */}
                                    <span className="text2">{post.postTitle}</span>
                                    {/* <span className="commentCount">{post.commentCount}</span> */}
                                </span>
                            </div>
                            <div className="etc1">
                                <div className="nickName">{post.userInfo}</div>
                                <div className="dot"></div>
                                <div className="datetime field">{post.postDate}</div>
                                <div className="dot"></div>
                                <div className="viewCount number">
                                    <i className="view">{post.postView}</i>
                                </div>

                                <div className="dot"></div>
                                <div className="likeCount number">{/* <i className="like">{post.likeCount}</i> */}</div>
                            </div>
                        </div>
                    </a>
                ))}
            </section>
        </>
    );
};

export default UnderPostList;
