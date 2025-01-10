import { TConstructorIngredient } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TOrderState = {
  buns: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TOrderState = {
  buns: null,
  ingredients: []
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  selectors: {
    getOrderIngredientsSelector: (state) => state.ingredients,
    getBunsSelector: (state) => state.buns,
    getIngredientsIdSelector: (state) => {
      const allIngredients = [state.buns, ...state.ingredients, state.buns];
      const ingredientsId = allIngredients
        .map((ingredient) => ingredient?._id)
        .filter((id): id is string => id !== undefined);
      return ingredientsId;
    }
  },
  reducers: {
    addBun: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.buns = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    removeAllIngredients: (state) => {
      state.ingredients = initialState.ingredients;
      state.buns = initialState.buns;
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const ingredient = state.ingredients[index];
      state.ingredients[index] = state.ingredients[index + 1];
      state.ingredients[index + 1] = ingredient;
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const ingredient = state.ingredients[index];
      state.ingredients[index] = state.ingredients[index - 1];
      state.ingredients[index - 1] = ingredient;
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  addBun,
  removeAllIngredients,
  moveIngredientDown,
  moveIngredientUp
} = orderSlice.actions;

export const {
  getOrderIngredientsSelector,
  getBunsSelector,
  getIngredientsIdSelector
} = orderSlice.selectors;

export default orderSlice.reducer;
