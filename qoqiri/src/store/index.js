import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import commentSlice from "./commentSlice";

// configureStore 함수를 사용하여 리덕스 스토어 생성
const store = configureStore({
  reducer: {
    // 스토어의 각 슬라이스를 해당 리듀서 함수로 연결
    user: userSlice.reducer,
    comment: commentSlice.reducer,
  },
});

export default store;
