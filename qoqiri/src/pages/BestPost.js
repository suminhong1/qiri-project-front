import '../css/BestPost.css';
import Paging from '../components/Paging';
import NavBtn from '../components/NavBtn';
import kkorang from '../assets/kkorang3.jpg';
import { getPostList, getBoards, getSearch } from '../api/post';
import { useState, useEffect } from 'react';
import Date from '../components/Date';
import BoardBar from '../components/BoardBar';
import { useParams } from 'react-router-dom';

const PostList = () => {
    const [postList, setPostList] = useState([]);
    const [boards, setBoards] = useState([]);
    const [page, setPage] = useState(1);
    const [board, setBoard] = useState(null);
    const [userInput, setUserInput] = useState('');

    const { id } = useParams();
    // const searched = posts.filter((item) => item.name.toLowerCase().includes(userInput));

    const boardAPI = async () => {
        const result = await getBoards();
        setBoards(result.data);
    };

    // 게시물 리스트에서 useParams값이 없는건 추천수 20이상 값이 있는건 boardSEQ와 일치시켜서 나오게하는거 게시물 등록이랑 좋아요 기능 끝나면 만들면됨
    // const PostListAPI = async () => {
    //     let result;
    //     if (useParams) {
    //         result = await getPostList(page, board);
    //     } else {
    //         const bestPostList = postList.filter((post) => post.likeCount >= 20);
    //         result = { data: bestPostList };
    //     }
    //     // console.log('List 호출 시작');
    //     // const result = await getPostList(page, board);
    //     setPostList([...postList, ...result.data]);
    // };

    const PostListAPI = async () => {
        const result = await getPostList(page, board);
        console.log(result.data);
        setPostList([...postList, ...result.data]);
    };

    // const boardFilterAPI = async () => {
    //     const result = await getPostList(page, board);
    //     setPostList(result.data);
    // };
    useEffect(() => {
        boardAPI();
        PostListAPI();
    }, []);

    useEffect(() => {
        if (board != null) {
            console.log(board);

            PostListAPI();
        }
    }, [board]);

    // const filterBoard = (e) => {
    //     e.preventDefault();
    //     const href = e.target.href.split('/');
    //     console.log(href[href.length - 1]);
    //     setBoard(parseInt(href[href.length - 1]));
    //     setPage(1);
    //     setPostList([]);
    // };

    const searchHandler = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('keyword', e.target.keyword.value);

        getSearch(formData.get('keyword'));
    };

    return (
        <>
            <article id="list">
                <section id="bestList" className="bestPost" key={postList?.postSEQ}>
                    <div className="item bestlistHeader">
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

                    {postList.map((post) => (
                        // if((useParams && post.board.boardSEQ === useParams) || (!useParams && post.likeCount > 20)){

                        // } 추천수 조건문
                        <div className="item" key={post.postSEQ}>
                            <a href={`/viewpost/${post.postSEQ}`} className="post">
                                <div className="best">
                                    <div className="titleContainer">
                                        <div className="bestImage">
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
                                        <div className="category">[베스트글 카테고리]</div>
                                        <div className="title"></div>{' '}
                                        <div className="text">
                                            <div className="pre">{post?.postTitle}</div>
                                            {post?.postContent}
                                        </div>
                                        <div className="commentCount">0</div>
                                    </div>

                                    <div className="etc">
                                        <div className="nickName">
                                            {post?.userInfo.userNickname}
                                            <i className="nicknameIcon"></i>
                                        </div>
                                        <div className="dot"></div>
                                        <Date postDate={post?.postDate} />
                                        <div className="dot"></div>
                                        <div className="viewCount">
                                            {/* <i className="viewIcon"></i> */}
                                            {post?.postView}
                                        </div>
                                        <div className="dot"></div>
                                        <div className="likeCount">
                                            <i className="like Icon"></i>
                                            👍
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </section>
                <NavBtn />
            </article>
            <Paging />

            <div className="searchAndWrite">
                <div></div>
                <div>
                    <form onSubmit={searchHandler}>
                        <div className="search">
                            <select name="searchType">
                                <option value={'title'}>제목</option>
                                <option value={'titleAndContent'}>제목+내용</option>
                                <option value={'nickName'}>글쓴이</option>
                            </select>
                            <input type="text" name="keyword" maxLength={50} />
                            <button type="submit"> 검색</button>
                        </div>
                    </form>
                </div>
                <div className="write">
                    <a href="/postWrite">글쓰기</a>
                </div>
            </div>
            <BoardBar />
        </>
    );
};

export default PostList;
