import { getFeedsApi, TFeedsResponse } from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { RootState } from '../store';

export interface FeedState {
  items: TOrdersData | null;
  isLoading: boolean;
  error: SerializedError | null;
}

export const initialState: FeedState = {
  items: null,
  isLoading: false,
  error: null
};

export const fetchFeedItems = createAsyncThunk<TFeedsResponse, void>(
  'feed/fetch',
  async () => await getFeedsApi()
);

const feedBuilder = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedItems.pending, (state) => {
        state.isLoading = true;
        state.items = null;
      })
      .addCase(fetchFeedItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchFeedItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export const selectFeed = (state: RootState) => state.feed.items;
export const selectIsLoading = (state: RootState) => state.feed.isLoading;
export const selectError = (state: RootState) => state.feed.error;
export const selectFeedOrders = (state: RootState) =>
  state.feed.items?.orders || [];

export default feedBuilder.reducer;
