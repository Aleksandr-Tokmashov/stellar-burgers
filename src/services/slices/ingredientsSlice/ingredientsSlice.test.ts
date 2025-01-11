import ingredientsReducer, {
  getIngredients,
  initialState
} from './ingredientsSlice';
import { ingredients } from './mockData';

describe('тесты редюсера ingredientsSlice', () => {
  test('экшен начала запроса', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({ ...initialState, isIngredientsLoading: true });
  });

  test('экшен успешного выполнения запроса', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: ingredients
    };

    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({
      isIngredientsLoading: false,
      error: '',
      ingredients: ingredients
    });
  });

  test('экшен ошибки запроса', () => {
    const errorMessage = 'Ошибка запроса ингредиентов';
    const action = {
      type: getIngredients.rejected.type,
      error: { message: errorMessage }
    };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: errorMessage,
      isIngredientsLoading: false
    });
  });
});
