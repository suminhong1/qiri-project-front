import '../css/UnderPostList.css';
import kkorang from '../assets/kkorang3.jpg';
import axios from 'axios';
import { useEffect, useState } from 'react';

const instance = axios.create({
    baseURL: 'http://localhost:8080/qiri/',
});
// export const getPosts = async () => {
//     return await instance.get('posts');
//  백단 오류 해결돼야함
// };

const UnderPostList = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get('posts');
                console.log('Response Data: ', response.data);
                setPosts(response.data);
            } catch (error) {
                console.error('Error : ', error);
            }
        };
        fetchData();
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
                    <a key={post.postSeq} className="underList" href="#">
                        <div className="info3">
                            <div className="titleContainer">
                                <div className="bestImage">
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
                                    <span className="text2">{post.title}</span>
                                    <span className="commentCount">{post.commentCount}</span>
                                </span>
                            </div>
                            <div className="etc1">
                                <div className="nickName">{post.writer}</div>
                                <div className="dot"></div>
                                <div className="datetime field">{post.date}</div>
                                <div className="dot"></div>
                                <div className="viewCount number">
                                    <i className="view">{post.viewCount}</i>
                                </div>

                                <div className="dot"></div>
                                <div className="likeCount number">
                                    <i className="like">{post.likeCount}</i>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </section>
        </>
    );
};

export default UnderPostList;
