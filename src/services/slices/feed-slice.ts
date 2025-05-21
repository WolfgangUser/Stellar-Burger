import { getFeedsApi, TFeedsResponse } from "@api";
import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import { TOrdersData } from "@utils-types";
import { RootState } from "../store";

export interface FeedState {
  items: TOrdersData | null;
  loading: boolean;
  error: SerializedError | null;
}

export const initialState: FeedState = {
  items: null,
  loading: false,
  error: null
};

export const getFeed = createAsyncThunk<TFeedsResponse, void>(
  'feed/fetch',
  async () => await getFeedsApi()
);

const feedBuilder = createSlice({
    name: "feed",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFeed.pending, (state) => {
            state.loading = true;
            state.items = null;
        })
        .addCase(getFeed.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(getFeed.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error
        })
    },
})

export const selectFeed = (state: RootState) => state.feed.items;
export const selectIsLoading = (state: RootState) => state.feed.loading;
export const selectError = (state: RootState) => state.feed.error;
export const selectFeedOrders = (state: RootState) => state.feed.items?.orders || [];

export default feedBuilder.reducer;
