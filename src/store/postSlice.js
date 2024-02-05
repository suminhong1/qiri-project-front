import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSearchResults } from "../api/post";

const asyncSearchResult = createAsyncThunk(
  "postSlice/asyncSearchResult",
  async (keyword) => {
    const result = await getSearchResults(keyword);
    return result.data;
  }
);

const postSlice = createSlice({
  name: "postSlice",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncSearchResult.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default postSlice;
export const { keywordSave } = postSlice.actions;
export { asyncSearchResult };
