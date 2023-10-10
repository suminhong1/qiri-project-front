import React, { useState } from "react";
import Pagination from "react-js-pagination";
import "../Paging.css";

// npm install react-js-pagination 사용할것

const Paging = () => {
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <Pagination
      activePage={page} // 현재 페이지
      itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수
      totalItemsCount={450} // 총 아이템 갯수
      pageRangeDisplayed={5} // paginator의 페이지 범위
      prevPageText={"<"} 
      nextPageText={">"} 
      onChange={handlePageChange} // 페이지 변경 핸들링 함수
    />
  );
};

export default Paging;