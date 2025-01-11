import profileOrdersReducer, {
  getOrders,
  getOrderByNumber,
  initialState
} from './profileOrdersSlice';
import { orders, orderByNumber } from './mockData';

describe('тесты редюсера profileOrdersSlice', () => {
  describe('тест получения заказов пользователя', () => {
    test('экшен начала запроса', () => {
      const action = { type: getOrders.pending.type };
      const state = profileOrdersReducer(initialState, action);
      expect(state).toEqual({ ...initialState, isLoading: true, error: null });
    });

    test('экшен успешного выполнения запроса', () => {
      const action = {
        type: getOrders.fulfilled.type,
        payload: orders
      };

      const state = profileOrdersReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        orders: orders
      });
    });

    test('экшен ошибки запроса', () => {
      const errorMessage = 'Ошибка получения заказов пользователя';
      const action = {
        type: getOrders.rejected.type,
        error: { message: errorMessage }
      };
      const state = profileOrdersReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: errorMessage,
        isLoading: false
      });
    });
  });

  describe('тест получения заказа по номеру', () => {
    test('экшен начала запроса', () => {
      const action = { type: getOrderByNumber.pending.type };
      const state = profileOrdersReducer(initialState, action);
      expect(state).toEqual({ ...initialState, isLoading: true, error: null });
    });

    test('экшен успешного выполнения запроса', () => {
      const action = {
        type: getOrderByNumber.fulfilled.type,
        payload: orderByNumber
      };

      const state = profileOrdersReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        orderByNumber: orderByNumber.orders[0]
      });
    });

    test('экшен ошибки запроса', () => {
      const errorMessage = 'Ошибка получения заказа по номеру';
      const action = {
        type: getOrderByNumber.rejected.type,
        error: { message: errorMessage }
      };
      const state = profileOrdersReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: errorMessage,
        isLoading: false
      });
    });
  });
});
