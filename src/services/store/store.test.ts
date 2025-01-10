import store, { rootReducer } from './store';

describe('тест инициализации rootReducer', () => {
  test('возвращает корректное начальное состояние', () => {
    const initialState = store.getState();
    const action = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, action);
    expect(state).toEqual(initialState);
  });
});
