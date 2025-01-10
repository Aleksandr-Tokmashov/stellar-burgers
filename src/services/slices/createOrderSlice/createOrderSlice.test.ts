import createOrderReducer, {
  orderBurger,
  initialState
} from './createOrderSlice';

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
    const order = {
      success: true,
      name: 'Краторный spicy био-марсианский бургер',
      order: {
        createdAt: '2025-01-08T18:46:01.013Z',
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-02-large.png'
          },
          {
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png'
          },
          {
            _id: '643d69a5c3f7b9001cfa0942',
            name: 'Соус Spicy-X',
            type: 'sauce',
            proteins: 30,
            fat: 20,
            carbohydrates: 40,
            calories: 30,
            price: 90,
            image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-02-large.png'
          },
          {
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-02-large.png'
          }
        ],
        name: 'Краторный spicy био-марсианский бургер',
        number: 65038,
        owner: {
          createdAt: '2024-12-01T12:11:05.725Z',
          email: 'afa@gmail.com',
          name: 'test',
          updatedAt: '2024-12-03T12:04:18.992Z'
        },
        price: 3024,
        status: 'done',
        updatedAt: '2025-01-08T18:46:02.285Z',
        _id: '677ec7e9133acd001be49165'
      }
    };
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
