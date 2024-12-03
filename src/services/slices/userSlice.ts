import { TUser } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  TLoginData,
  registerUserApi,
  TRegisterData,
  logoutApi,
  getUserApi,
  updateUserApi
} from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';

type TUserState = {
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  data: TUser | null;
  error: string | null;
  isLoading: boolean;
  refreshToken: string | null;
  accessToken: string | null;
};

const initialState: TUserState = {
  isAuthenticated: false,
  isAuthChecked: false,
  data: null,
  error: null,
  isLoading: false,
  refreshToken: '',
  accessToken: ''
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const response = await loginUserApi({ email, password });
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password }: TRegisterData) => {
    const response = await registerUserApi({ email, name, password });
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  const response = await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');

  return response;
});

export const getUser = createAsyncThunk('auth/fetchUser', getUserApi);

export const updateUser = createAsyncThunk('auth/updateUser', updateUserApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoading = false;
        state.isAuthenticated = true;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.data = null;
        state.accessToken = null;
        state.refreshToken = null;
      })

      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
        state.isAuthChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.user;
      });
  },
  selectors: {
    getNameSelector: (state) => state.data?.name || '',
    getEmailSelector: (state) => state.data?.email || '',
    authenticatedSelector: (state) => state.isAuthenticated,
    isLoadingSelector: (state) => state.isLoading,
    userDataSelector: (state) => state.data,
    isAuthCheckedSelector: (state) => state.isAuthChecked
  }
});
export const {
  getNameSelector,
  getEmailSelector,
  authenticatedSelector,
  isLoadingSelector,
  userDataSelector,
  isAuthCheckedSelector
} = userSlice.selectors;
export default userSlice.reducer;
