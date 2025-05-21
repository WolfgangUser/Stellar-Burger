import { getOrderByNumberApi, getOrdersApi, orderBurgerApi, TNewOrderResponse } from "@api";
import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";
import { RootState } from "../store";

export interface IOrderState {
  orders: TOrder[];
  orderRequest: boolean;
  orderError: null | SerializedError;
  orderModalData: TOrder | null;
  isLoadingNumber: boolean;
  isLoadingOrders: boolean;
}

export const initialState: IOrderState = {
  orders: [],
  orderRequest: false,
  orderError: null,
  orderModalData: null,
  isLoadingNumber: true,
  isLoadingOrders: true
};

export const createOrder = createAsyncThunk<TNewOrderResponse, string[]>("order/createOrder", async(ingredients, {rejectWithValue}) =>{
    const data = await orderBurgerApi(ingredients);
    if(!data.success) rejectWithValue(data);
    return data;
})

export const fetchOrderByNumber = createAsyncThunk<TOrder, number>("order/getOrder", async(num, {rejectWithValue}) =>{
    const data = await getOrderByNumberApi(num);
    if(!data.success) return rejectWithValue(data);
    return data.orders[0];
});

export const getOrdersList = createAsyncThunk<TOrder[], void>("order/list", async(_, {rejectWithValue}) =>{
    const data = await getOrdersApi();
    return data;
})

export const orderBuilder = createSlice({
    name: "order",
    initialState,
    reducers: {
      setOrderModalData(state, action: PayloadAction<TOrder | null>){
        state.orderModalData = action.payload;
      }
    },
    extraReducers: (builder) => {
        builder.addCase(createOrder.pending, (state) =>{
            state.orderRequest = true;
            state.orderModalData = null;
        })
        .addCase(createOrder.fulfilled, (state, action) =>{
            state.orderRequest = false;
            state.orderModalData = action.payload.order;
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.orderRequest = false;
            state.orderModalData = null;
      })
      .addCase(fetchOrderByNumber.pending, (state) =>{
        state.isLoadingNumber = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) =>{
        state.isLoadingNumber = false;
        state.orderModalData = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state) =>{
        state.isLoadingNumber = false;
        state.orderModalData = null;
      })
      .addCase(getOrdersList.pending, (state) =>{
        state.isLoadingOrders = true;
      })
      .addCase(getOrdersList.fulfilled, (state, action) =>{
        state.isLoadingOrders = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersList.rejected, (state, action) =>{
        state.isLoadingOrders = false;
        state.orders = [];
        state.orderError = action.error;
      })
    },
})

export const selectOrders = (state: RootState): TOrder[] => state.order.orders;
export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;
export const selectOrderModalData = (state: RootState) =>
  state.order.orderModalData;

export const selectIsNumberOrderLoading = (state: RootState) => state.order.isLoadingNumber;
export const selectIsOrdersListLoading = (state: RootState) => state.order.isLoadingOrders;

export const {setOrderModalData} = orderBuilder.actions;

export default orderBuilder.reducer;
