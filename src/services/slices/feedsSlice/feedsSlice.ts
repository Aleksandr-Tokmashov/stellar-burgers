import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../../utils/burger-api';
import { TOrder } from '@utils-types';

interface FeedsState {
  isFeedsLoading: boolean;
  error: string | undefined;
  data: { orders: TOrder[]; total: number; totalToday: number };
}

export const initialState: FeedsState = {
  isFeedsLoading: false,
  error: '',
  data: { orders: [], total: 0, totalToday: 0 }
};

export const getFeeds = createAsyncThunk('feeds/getAll', getFeedsApi);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isFeedsLoading = true;
        state.error = '';
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isFeedsLoading = false;
        state.error = action.error.message;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isFeedsLoading = false;
        state.data = action.payload;
      });
  },
  selectors: {
    getFeedsSelector: (state) => state.data.orders,
    getTotalSelector: (state) => state.data.total,
    getTotalTodaySelector: (state) => state.data.totalToday,
    isLoadingSelector: (state) => state.isFeedsLoading
  }
});

export const {
  getFeedsSelector,
  getTotalSelector,
  getTotalTodaySelector,
  isLoadingSelector
} = feedsSlice.selectors;

export default feedsSlice.reducer;
