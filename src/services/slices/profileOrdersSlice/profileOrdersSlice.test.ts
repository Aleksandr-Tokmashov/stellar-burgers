import profileOrdersReducer, {
  getOrders,
  getOrderByNumber,
  initialState
} from './profileOrdersSlice';

describe('тесты редюсера profileOrdersSlice', () => {
  describe('тест получения заказов пользователя', () => {
    const orders = [
      {
        _id: '677fb544133acd001be49308',
        status: 'done',
        name: 'Экзо-плантаго краторный традиционный-галактический астероидный бургер',
        createdAt: '2025-01-09T11:38:44.859Z',
        updatedAt: '2025-01-09T11:38:45.806Z',
        number: 65065,
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0949',
          '643d69a5c3f7b9001cfa094a',
          '643d69a5c3f7b9001cfa0944',
          '643d69a5c3f7b9001cfa093c'
        ]
      },
      {
        _id: '677fb529133acd001be49307',
        status: 'done',
        name: 'Альфа-сахаридный краторный био-марсианский бургер',
        createdAt: '2025-01-09T11:38:17.077Z',
        updatedAt: '2025-01-09T11:38:17.855Z',
        number: 65064,
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0948',
          '643d69a5c3f7b9001cfa093c'
        ]
      }
    ];

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
    const orderByNumber = {
      orders: [
        {
          _id: '677fb544133acd001be49308',
          status: 'done',
          name: 'Экзо-плантаго краторный традиционный-галактический астероидный бургер',
          createdAt: '2025-01-09T11:38:44.859Z',
          updatedAt: '2025-01-09T11:38:45.806Z',
          number: 65065,
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0949',
            '643d69a5c3f7b9001cfa094a',
            '643d69a5c3f7b9001cfa0944',
            '643d69a5c3f7b9001cfa093c'
          ]
        }
      ]
    };

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
