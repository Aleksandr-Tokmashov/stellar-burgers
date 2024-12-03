import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

interface IngredientsState {
  isIngredientsLoading: boolean;
  error: string | undefined;
  ingredients: TIngredient[];
}

const initialState: IngredientsState = {
  isIngredientsLoading: false,
  error: '',
  ingredients: []
};

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.error = '';
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      });
  },
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    isIngredientsLoadingSelector: (state) => state.isIngredientsLoading,
    getBunsSelector: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'bun'),
    getMainsSelector: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'main'),
    getSaucesSelector: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'sauce')
  }
});

export const {
  getIngredientsSelector,
  isIngredientsLoadingSelector,
  getBunsSelector,
  getMainsSelector,
  getSaucesSelector
} = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
