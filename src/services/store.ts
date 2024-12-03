import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ingredientReducer from './slices/ingredientsSlice';
import feedReducer from './slices/feedsSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import createOrderReducer from './slices/createOrderSlice';
import profileOrdersReducer from './slices/profileOrdersSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
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
