import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../api/user";
import { editProfile } from "../api/user";

const asyncLogin = createAsyncThunk("userSlice/asyncLogin", async (data) => {
  const result = await login(data);
  return result.data;
});
const asyncEditProfile = createAsyncThunk("userSlice/asyncEditProfile", async (data) => {
  const result = await editProfile(data);
  return result.data;
})
const userSlice = createSlice({
  name: "loginSlice",
  initialState: {},
  reducers: {
    userSave: (state, action) => {
      return action.payload;
    },
    userLogout: (state, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user"); 
      return {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    });
    builder.addCase(asyncEditProfile.fulfilled, (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    });
  },
});

export default userSlice;
export { asyncLogin, asyncEditProfile };
export const { userSave, userLogout } = userSlice.actions;
