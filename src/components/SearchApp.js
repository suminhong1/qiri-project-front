// App.js
import React from "react";
import Header from "./Header";
import MatchingBoard from "./MatchingBoard";
import { SearchProvider } from "./SearchProvider"; // 추가

function App() {
  return (
    <SearchProvider>
      <div>
        <Header />
        <MatchingBoard />
      </div>
    </SearchProvider>
  );
}

export default App;
