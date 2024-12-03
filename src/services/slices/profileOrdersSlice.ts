import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

interface profileOrdersState {
  orders: TOrder[] | null;
  orderByNumber: TOrder | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: profileOrdersState = {
  orders: null,
  orderByNumber: null,
  isLoading: false,
  error: null
};

export const getOrders = createAsyncThunk('profile/getOrders', getOrdersApi);

export const getOrderByNumber = createAsyncThunk(
  'profile/getOrder',
  getOrderByNumberApi
);

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })

      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderByNumber = action.payload.orders[0];
      });
  },
  selectors: {
    getProfileOrdersSelector: (state) => state.orders || [],
    getOrderByNumberSelector: (state) => state.orderByNumber,
    isLoadingSelector: (state) => state.isLoading
  }
});

export const {
  getProfileOrdersSelector,
  getOrderByNumberSelector,
  isLoadingSelector
} = profileOrdersSlice.selectors;
export default profileOrdersSlice.reducer;
