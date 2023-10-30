import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getChatRoomList } from "../api/chat";

const asyncChatRooms = createAsyncThunk(
  "chatRoomSlice/asyncmyChatRooms",
  async (code) => {
    const result = await getChatRoomList(code);
    return result.data;
  }
);

const chatRoomSlice = createSlice({
  name: "myChatRoomsSlice",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncChatRooms.fulfilled, (state, action) => {
      return [...action.payload];
    });
  },
});

export const { addChatRoom, removeChatRoom } = chatRoomSlice.actions;
export default chatRoomSlice;
export { asyncChatRooms };
