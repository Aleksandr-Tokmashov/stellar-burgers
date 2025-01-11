import orderSliceReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  removeAllIngredients,
  moveIngredientDown,
  moveIngredientUp
} from './orderSlice';
import {
  initialConstructorState,
  bunExample,
  ingredientExample,
  ingredientsAfterDelete,
  ingredientsAfterMoveUp,
  ingredientsAfterMoveDown
} from './mockData';

describe('тесты конструктора бургера', () => {
  test('Добавить булку', () => {
    const newState = orderSliceReducer(
      initialConstructorState,
      addBun(bunExample)
    );
    const { buns } = newState;

    expect(buns).toEqual(bunExample);
  });

  test('Добавить ингредиент', () => {
    const newState = orderSliceReducer(
      initialConstructorState,
      addIngredient(ingredientExample)
    );
    const { ingredients } = newState;

    expect(ingredients).toEqual([
      ...initialConstructorState.ingredients,
      ingredientExample
    ]);
  });

  test('Удалить ингредиент', () => {
    const newState = orderSliceReducer(
      initialConstructorState,
      removeIngredient('3')
    );
    const { ingredients } = newState;

    expect(ingredients).toEqual(ingredientsAfterDelete);
  });

  test('Удалить все ингредиенты', () => {
    const newState = orderSliceReducer(
      initialConstructorState,
      removeAllIngredients()
    );
    const { ingredients } = newState;

    expect(ingredients).toEqual([]);
  });

  test('Переместить ингредиент на 1 позицию вверх', () => {
    const newState = orderSliceReducer(
      initialConstructorState,
      moveIngredientUp(1)
    );
    const { ingredients } = newState;

    expect(ingredients).toEqual(ingredientsAfterMoveUp);
  });

  test('Переместить ингредиент на 1 позицию вниз', () => {
    const newState = orderSliceReducer(
      initialConstructorState,
      moveIngredientDown(1)
    );
    const { ingredients } = newState;

    expect(ingredients).toEqual(ingredientsAfterMoveDown);
  });
});
