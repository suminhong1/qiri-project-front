import React, { useState } from 'react';
import Pagination from 'react-js-pagination';
import styled from 'styled-components';
import '../css/PageNation.css';

const StyledPaging = styled.div`
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    margin-bottom: 40px;

    & .pagination li {
        margin: 0 5px;
        font-size: 15px;
    }

    & .pagination li a {
        text-decoration: none;
        color: #333;
        padding: 5px 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    & .pagination li.active a {
        background-color: #ff7f38;
        color: #fff;
        border-color: #ff7f38;
    }
`;

const Paging = () => {
    const [page, setPage] = useState(1);

    const handlePageChange = (page) => {
        setPage(page);
    };

    return (
        <>
            <StyledPaging>
                <Pagination
                    activePage={page} // 현재 페이지
                    itemsCountPerPage={10} // 한 페이지당 보여줄 리스트 아이템의 개수
                    totalItemsCount={450} // 총 아이템의 개수
                    pageRangeDisplayed={5} // Paginator 내에서 보여줄 페이지의 범위
                    prevPageText={'<'} // "이전"을 나타낼 텍스트
                    nextPageText={'>'} // "다음"을 나타낼 텍스트
                    onChange={handlePageChange} // 페이지가 바뀔 때 핸들링해줄 함수
                />
            </StyledPaging>

            <div className="searchAndWrite">
                <div></div>
                <div>
                    <form action="/post">
                        <div className="search">
                            <select name="searchType">
                                <option value={'title'}>제목</option>
                                <option value={'titleAndContent'}>제목+내용</option>
                                <option value={'nickName'}>글쓴이</option>
                            </select>
                            <input type="text" name="keyword" maxLength={50} />
                            <button>검색</button>
                        </div>
                    </form>
                </div>
                <div className="write"> </div>
            </div>
        </>
    );
};
export default Paging;
