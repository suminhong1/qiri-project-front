// SearchProvider.js
import React, { useState, createContext, useContext } from "react";

// 검색 상태와 결과를 관리할 컨텍스트 생성
const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (keyword) => {
    // 여기에 검색 로직을 구현 (예: API 호출)
    const results = await performSearch(keyword);
    setSearchResults(results);
  };

  return (
    <SearchContext.Provider
      value={{ searchKeyword, setSearchKeyword, searchResults, handleSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};
