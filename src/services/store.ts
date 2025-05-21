import { configureStore } from '@reduxjs/toolkit';
import feedReducer from './slices/feed-slice';
import orderReducer from './slices/order-slice';
import userReducer from './slices/user-slice';
import ingredientsReducer from './slices/ingredients-slice'
import constructorReducer from './slices/constructor-slice'

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = {
  feed: feedReducer,
  order: orderReducer,
  user: userReducer,
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer
}; 

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
