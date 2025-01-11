import createOrderReducer, {
  orderBurger,
  initialState
} from './createOrderSlice';
import { order } from './mockData';

describe('тесты редюсера createOrderSlice', () => {
  test('экшен начала запроса', () => {
    const action = { type: orderBurger.pending.type };
    const state = createOrderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  test('экшен успешного выполнения запроса', () => {
    const action = {
      type: orderBurger.fulfilled.type,
      payload: order
    };

    const state = createOrderReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      response: order
    });
  });

  test('экшен ошибки запроса', () => {
    const errorMessage = 'Ошибка заказа';
    const action = {
      type: orderBurger.rejected.type,
      error: { message: errorMessage }
    };
    const state = createOrderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: errorMessage,
      isLoading: false
    });
  });
});
