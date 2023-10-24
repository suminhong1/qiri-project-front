import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostList, getBoards } from '../api/post';
import logo from '../assets/logo.png';
import '../css/Board.css';

const BoardBar = () => {
    const [boards, setBoards] = useState([]);
    const [postList, setPostList] = useState([]);
    const [page, setPage] = useState(1);

    const { id } = useParams();

    const boardAPI = async () => {
        const result = await getBoards();
        setBoards(result.data);
    };

    const PostListAPI = async () => {
        const result = await getPostList(page, boards);
        setPostList(result.data);
        // setPostList([...postList, ...result.data])
    };
    // const boardFilterAPI = async () => {
    //     const result = await getPostList(page, boards);
    //     setPostList(result.data);
    // };

    useEffect(() => {
        boardAPI();
    }, []);

    useEffect(() => {
        if (boards != null) {
            PostListAPI();
        }
    }, [boards]);

    // const filterBoard = (e) => {
    //     e.preventDefault();
    //     const href = e.target.href.split('/');
    //     console.log(href[href.length - 1]);
    //     setBoards(parseInt(href[href.length - 1]));
    //     setPage(1);
    //     setPostList([]); // 게시물 목록을 빈 배열로 초기화 해서 새로운 게시물 목록을 받아오거나 수정된 게시물을 가져오려고
    // };

    return (
        <>
            <div id="boardbar">
                <div id="board">
                    <div id="board-menu">
                        <div id="board-logo">
                            <a href="/">
                                <img src={logo} id="qiri-logo" />
                            </a>
                        </div>
                        {boards.map((board) => {
                            if (board.boardSEQ > 2) {
                                return (
                                    <div id="boardKey" key={board.boardSEQ}>
                                        <a href={`/board/${board.boardSEQ}`} id="boardList">
                                            {board.boardName}
                                        </a>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BoardBar;
