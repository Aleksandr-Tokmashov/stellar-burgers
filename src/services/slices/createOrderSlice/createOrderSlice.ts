import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, TNewOrderResponse } from '../../../utils/burger-api';

interface OrderState {
  ingredients: string[] | null;
  isLoading: boolean;
  error: string | null;
  response: TNewOrderResponse | null;
}

export const initialState: OrderState = {
  ingredients: null,
  isLoading: false,
  error: null,
  response: null
};

export const orderBurger = createAsyncThunk('order', orderBurgerApi);

const createOrderSlice = createSlice({
  name: 'createOrder',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.response = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload;
      });
  },
  selectors: {
    orderResponseSelector: (state) => state.response,
    isLoadingSelector: (state) => state.isLoading
  }
});

export const { orderResponseSelector, isLoadingSelector } =
  createOrderSlice.selectors;
export const { resetOrder } = createOrderSlice.actions;
export default createOrderSlice.reducer;
