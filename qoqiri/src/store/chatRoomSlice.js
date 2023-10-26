// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getChatRoomList } from "../api/chat";

// const asyncChatRooms = createAsyncThunk(
//   "chatRoomSlice/asyncChatRoomList",
//   async (id) => {
//     const result = await getChatRoomList(id);
//     return result.data;
//   }
// );

// const chatRoomSlice = createSlice({
//   name: "chatRooms",
//   initialState: [],
//   reducers: {
//     addChatRoom: (state, action) => {
//       state.push(action.payload);
//     },
//     removeChatRoom: (state, action) => {},
//   },
//   extraReducers: (builder) => {
//     builder.addCase(asyncChatRooms.fulfilled, (state, action) => {
//       return [...state, ...action.payload];
//     });
//   },
// });

// export const { addChatRoom, removeChatRoom } = chatRoomSlice.actions;
// export default chatRoomSlice;
// export { asyncChatRooms };
