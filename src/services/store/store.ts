import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ingredientReducer from '../slices/ingredientsSlice/ingredientsSlice';
import feedReducer from '../slices/feedsSlice/feedsSlice';
import userReducer from '../slices/userSlice/userSlice';
import orderReducer from '../slices/orderSlice/orderSlice';
import createOrderReducer from '../slices/createOrderSlice/createOrderSlice';
import profileOrdersReducer from '../slices/profileOrdersSlice/profileOrdersSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  feeds: feedReducer,
  user: userReducer,
  order: orderReducer,
  createOrder: createOrderReducer,
  profileOrders: profileOrdersReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
