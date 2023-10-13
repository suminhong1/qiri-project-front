import '../css/UnderPostList.css';
import kkorang from '../assets/kkorang3.jpg';
import { useEffect, useState } from 'react';
import { getBoards, getPosts } from '../api/post';
import { Link } from 'react-router-dom';
//import { useInView } from 'react-intersection-observer';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [boards, setBoards] = useState([]);
    const [page, setPage] = useState(1);
    const [board, setBoard] = useState(null);

    // 프론트단에서 보여질수있게 하는것
    // post API에서 getBoards랑 getPosts를 둘다써야함 강사님 유튜브 home.js랑 watch.js참고

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

    // useEffect API는 좀더 공부해야함
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
            <h2 className="bottomBoardListHeader"> 전체글</h2>
            {/*map 처리 아래 수정해야함*/}
            <section id="boardList" className="simple" key={posts?.postSEQ}>
                <div className="item listHeader">
                    <div className="info2">
                        <div className="titleContainer">
                            <div className="categoryContainer">
                                <span className="underListCategory">카테고리</span>
                            </div>
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
                    <a key={post?.postSEQ} className="underList" href="#">
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

                                <span className="title">
                                    <span className="category">{post.category}</span>
                                    <span className="underPostListTitle">{post.postTitle}</span>
                                    {/* <span className="commentCount">{post.commentCount}</span> */}
                                </span>
                            </div>
                            <div className="etc1">
                                {console.log(post)}
                                <div className="nickName">{post.userInfo.userNickname}</div>
                                <div className="dot"></div>
                                <div className="datetime field">{post.postDate}</div>
                                <div className="dot"></div>
                                <div className="viewCount number">
                                    <i className="view">{post.postView}</i>
                                </div>

                                <div className="dot"></div>
                                {/* <div className="likeCount number"><i className="like">{post.likeCount}</i></div> */}
                            </div>
                        </div>
                    </a>
                ))}
            </section>
        </>
    );
};

export default PostList;
