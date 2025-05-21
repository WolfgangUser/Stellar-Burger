import { getUserApi, loginUserApi, logoutApi, registerUserApi, TLoginData, TRegisterData, updateUserApi } from "@api";
import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import { TUser } from "@utils-types";
import { RootState } from "../store";
import { deleteCookie, setCookie } from "../../utils/cookie";
import { stat } from "fs";

export interface UserState {
    data: TUser | null,
    isAuthed: boolean,
    loginError?: SerializedError
    registerError?: SerializedError
}

const initialState: UserState = {
    data: null,
    isAuthed: false
}

export const registerUser = createAsyncThunk<TUser, TRegisterData>(
  'user/register',
  async (dataUser, { rejectWithValue }) => {
    const data = await registerUserApi(dataUser);
    if (!data.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const loginUser = createAsyncThunk<TUser, TLoginData>(
  'user/login',
  async (dataUser, { rejectWithValue }) => {
    const data = await loginUserApi(dataUser);
    if (!data.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const logout = createAsyncThunk<void, void>(
  'user/logout',
  async (_, { rejectWithValue }) => {
    await logoutApi();
    deleteCookie('accessToken')
    localStorage.removeItem('refreshToken');
  }
);

export const fetchUser = createAsyncThunk<TUser, void>(
  'user/get',
  async (_, { rejectWithValue }) => {
    const response = await getUserApi();
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.user;
  }
);

export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/update',
  async (data, { rejectWithValue }) => {
    const response = await updateUserApi(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.user;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerError = undefined;
        state.isAuthed = false;
        state.data = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerError = undefined;
        state.isAuthed = true;
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthed = false;
        state.data = null;
        state.registerError = action.meta.rejectedWithValue
          ? (action.payload as SerializedError)
          : action.error;
        alert(state.registerError.message);
      })
      .addCase(loginUser.pending, (state) =>{
        state.isAuthed = false;
        state.registerError = undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) =>{
        state.registerError = undefined;
        state.isAuthed = true;
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthed = false;
        state.data = null;
        state.loginError = action.meta.rejectedWithValue
          ? (action.payload as SerializedError)
          : action.error;
      })
      .addCase(fetchUser.pending, (state) =>{
        state.registerError = undefined;
        state.isAuthed = false;
        state.data = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) =>{
        state.registerError = undefined;
        state.isAuthed = true;
        state.data = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) =>{
        state.data = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthed = false;
        state.data = null;
        state.registerError = undefined;
        state.loginError = undefined;
      })
      
  }
});
export const selectIsAuthed = (state: RootState) => state.user.isAuthed;
export const selectUserData = (state: RootState) => state.user.data;
export const selectLoginError = (state: RootState) => state.user.loginError;
export const selectRegisterError = (state: RootState) => state.user.registerError;

export default userSlice.reducer;
