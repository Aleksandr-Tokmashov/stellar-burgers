import userReducer, {
  loginUser,
  registerUser,
  logoutUser,
  getUser,
  updateUser,
  initialState
} from './userSlice';

describe('тесты редюсера userSlice', () => {
  const userData = {
    user: {
      email: 'test@test.com',
      name: 'test'
    },
    refreshToken: 'test',
    accessToken: 'test'
  };

  describe('тесты регистрации', () => {
    test('экшен начала запроса', () => {
      const action = { type: registerUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state).toEqual({ ...initialState, isLoading: true, error: null });
    });

    test('экшен успешного выполнения запроса', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: userData
      };

      const state = userReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        data: userData.user,
        refreshToken: userData.refreshToken,
        accessToken: userData.accessToken,
        isAuthenticated: true
      });
    });

    test('экшен ошибки запроса', () => {
      const errorMessage = 'Ошибка регистрации';
      const action = {
        type: registerUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: errorMessage,
        isLoading: false
      });
    });
  });

  describe('тесты логина', () => {
    test('экшен начала запроса', () => {
      const action = { type: loginUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state).toEqual({ ...initialState, isLoading: true, error: null });
    });

    test('экшен успешного выполнения запроса', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: userData
      };

      const state = userReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        data: userData.user,
        refreshToken: userData.refreshToken,
        accessToken: userData.accessToken,
        isAuthenticated: true,
        isAuthChecked: true
      });
    });

    test('экшен ошибки запроса', () => {
      const errorMessage = 'Ошибка логина';
      const action = {
        type: loginUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: errorMessage,
        isLoading: false,
        isAuthChecked: true
      });
    });
  });

  describe('тесты выхода из профиля', () => {
    test('экшен начала запроса', () => {
      const action = { type: logoutUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state).toEqual({ ...initialState, isLoading: true, error: null });
    });

    test('экшен успешного выполнения запроса', () => {
      const action = {
        type: logoutUser.fulfilled.type
      };

      const state = userReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        data: null,
        refreshToken: null,
        accessToken: null,
        isAuthenticated: false
      });
    });

    test('экшен ошибки запроса', () => {
      const errorMessage = 'Ошибка выхода из профиля';
      const action = {
        type: logoutUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: errorMessage,
        isLoading: false
      });
    });
  });

  describe('тесты получения пользователя', () => {
    test('экшен начала запроса', () => {
      const action = { type: getUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state).toEqual({ ...initialState, isLoading: true });
    });

    test('экшен успешного выполнения запроса', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: userData
      };

      const state = userReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        data: userData.user,
        isAuthenticated: true,
        isAuthChecked: true
      });
    });

    test('экшен ошибки запроса', () => {
      const errorMessage = 'Ошибка получения пользователя';
      const action = {
        type: getUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: errorMessage,
        isLoading: false,
        isAuthChecked: true
      });
    });
  });

  describe('тесты обновления данных пользователя', () => {
    test('экшен начала запроса', () => {
      const action = { type: updateUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state).toEqual({ ...initialState, isLoading: true });
    });

    test('экшен успешного выполнения запроса', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: userData
      };

      const state = userReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        data: userData.user
      });
    });

    test('экшен ошибки запроса', () => {
      const errorMessage = 'Ошибка обновления данных пользователя';
      const action = {
        type: updateUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: errorMessage,
        isLoading: false
      });
    });
  });
});
