import feedsReducer, { getFeeds, initialState } from './feedsSlice';
import { feeds } from './mockData';

describe('тесты редюсера feedsSlice', () => {
  test('экшен начала запроса', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedsReducer(initialState, action);
    expect(state).toEqual({ ...initialState, isFeedsLoading: true, error: '' });
  });

  test('экшен успешного выполнения запроса', () => {
    const action = {
      type: getFeeds.fulfilled.type,
      payload: feeds
    };

    const state = feedsReducer(initialState, action);

    expect(state).toEqual({
      isFeedsLoading: false,
      error: '',
      data: feeds
    });
  });

  test('экшен ошибки запроса', () => {
    const errorMessage = 'Ошибка запроса заказов';
    const action = {
      type: getFeeds.rejected.type,
      error: { message: errorMessage }
    };
    const state = feedsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: errorMessage,
      isFeedsLoading: false
    });
  });
});
