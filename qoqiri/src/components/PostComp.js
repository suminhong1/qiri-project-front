import '../css/PostComp.css';
import PageNation from '../components/PageNation';
import NavBtn from './NavBtn';
import { useState, useEffect } from 'react';
import { getBoards, getPosts } from '../api/post';
import kkorang from '../assets/kkorang3.jpg';
import { Link } from 'react-router-dom';

const PostComp = () => {
    const [posts, setPosts] = useState([]);
    const [boards, setBoards] = useState([]);
    const [page, setPage] = useState(1);
    const [board, setBoard] = useState(null);

    const boardAPI = async () => {
        const result = await getBoards();
        setBoards(result.data);
    };

    const PostAPI = async () => {
        const result = await getPosts(page, board);
        console.log(result.data);
        setPosts([...posts, ...result.data]);
    };

    const boardFilterAPI = async () => {
        const result = await getPosts(page, board);
        setPosts(result.data);
    };
    useEffect(() => {
        boardAPI();
        PostAPI();
    }, []);

    useEffect(() => {
        if (board != null) {
            console.log(board);
            PostAPI();
        }
    }, [board]);

    const filterBoard = (e) => {
        e.preventDefault();
        const href = e.target.href.split('/');
        console.log(href[href.length - 1]);
        setBoard(parseInt(href[href.length - 1]));
        setPage(1);
        setPosts([]);
    };

    return (
        <>
            <article id="list">
                <section id="postList" className="justPost" key={posts?.postSEQ}>
                    <div className="item listHeader">
                        <div className="info2">
                            <div className="titleContainer">
                                {/* <div className="categoryContainer">
                                    <span className="ListCategory">카테고리</span>
                                </div> */}
                                <span className="title">
                                    <span className="text1">제목</span>
                                </span>
                            </div>
                            <div className="etc1">
                                <div className="nickName">글쓴이</div>
                                <div className="dot"></div>
                                <div className="datetime field">날짜</div>
                                <div className="dot"></div>
                                <div className="viewCount number">조회</div>
                                <div className="dot"></div>
                                <div className="likeCount number">추천</div>
                            </div>
                        </div>
                    </div>
                    {posts.map((post) => (
                        <div className="item">
                            <Link to={`/viewpost/${post.postSEQ}`} className="post">
                                <div className="titleContainer">
                                    <div className="postThumbnail">
                                        {/* 여기 이제 url 방식으로 Blob써서 넣어야함 css도 수정 지금 이미지 사이즈랑 베스트글 카테고리 사이즈랑 같이커짐*/}
                                        <img
                                            src={kkorang}
                                            style={{
                                                maxWidth: '100%',
                                                height: '30px',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                                borderRadius: '3px',
                                            }}
                                        />
                                    </div>
                                    <div className="category">{post?.category}</div>
                                    <div className="dot"></div>
                                    <div className="title">{post?.postTitle}</div>
                                    <div className="dot"></div>
                                    {/* <div className="text">
                                        <div className="pre"></div>
                                        {post?.postContent}
                                    </div> */}
                                    <div className="commentCount">0</div>
                                </div>

                                <div className="etc">
                                    <div className="nickName">
                                        {post?.userInfo.userNickname}
                                        <i className="nicknameIcon">{/* ::before */}</i>
                                    </div>
                                    <div className="dot"></div>
                                    <div className="datetime">n일전</div>
                                    <div className="dot"></div>
                                    <div className="viewCount">
                                        <i className="viewIcon"></i>
                                        {/* ::before */}뷰{/* 아이콘*/}
                                    </div>
                                    <div className="dot">{/* :: after */}</div>
                                    <div className="likeCount">
                                        <span className="like Icon">👍</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </section>
                <NavBtn />
            </article>
            <PageNation />
        </>
    );
};

export default PostComp;
