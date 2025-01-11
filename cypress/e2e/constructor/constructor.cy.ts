describe('Проверка работы приложения', () => {
  describe('Тестирование конструктора', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', {
        fixture: 'ingredients.json'
      }).as('getIngredients');
      cy.visit('/');

      cy.wait('@getIngredients');

      cy.get('[data-cy="643d69a5c3f7b9001cfa093c"]').as('bun');
      cy.get('[data-cy="643d69a5c3f7b9001cfa0941"]').as('main');
      cy.get('[data-cy="643d69a5c3f7b9001cfa0942"]').as('sauce');

      cy.setCookie('accessToken', 'test');
      cy.window().then((window) => {
        window.localStorage.setItem('refreshToken', 'test');
      });
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      window.localStorage.removeItem('refreshToken');
    });

    it('Добавление ингредиента', () => {
      cy.get('[data-cy="topBunEmpty"]').contains('Выберите булки');
      cy.get('[data-cy="ingredientsEmpty"]').contains('Выберите начинку');
      cy.get('[data-cy="bottomBunEmpty"]').contains('Выберите булки');

      cy.get('@bun').contains('Добавить').click();
      cy.get('@sauce').contains('Добавить').click();
      cy.get('@main').contains('Добавить').click();

      cy.get('[data-cy="topBun"]').should(
        'contain.text',
        'Краторная булка N-200i'
      );
      cy.get('[data-cy="ingredients"]').should(
        'contain.text',
        'Биокотлета из марсианской Магнолии'
      );
      cy.get('[data-cy="ingredients"]').should('contain.text', 'Соус Spicy-X');
      cy.get('[data-cy="bottomBun"]').should(
        'contain.text',
        'Краторная булка N-200i'
      );
    });

    describe('Тестирование модального окна ингредиента', () => {
      beforeEach(() => {
        cy.get('[data-cy="modal"]').should('not.exist');
      });

      it('Открытие модального окна', () => {
        cy.get('@main').click();

        cy.get('[data-cy="modal"]').should('be.visible');
        cy.get('[data-cy="modal"]').should(
          'contain.text',
          'Биокотлета из марсианской Магнолии'
        );
      });

      it('Закрытие модального окна кликом на кнопку', () => {
        cy.get('@main').click();
        cy.get('[data-cy="modalCloseButton"]').click();

        cy.get('[data-cy="modal"]').should('not.exist');
      });

      it('Закрытие модального окна кликом на оверлей', () => {
        cy.get('@main').click();
        cy.get('[data-cy="modalOverlay"]').click({ force: true });

        cy.get('[data-cy="modal"]').should('not.exist');
      });
    });

    it('Создание заказа', () => {
      cy.intercept('GET', 'api/auth/user', {
        fixture: 'user.json'
      }).as('getUser');

      cy.intercept('POST', 'api/orders', {
        fixture: 'order.json'
      }).as('order');

      cy.visit('/');
      cy.wait('@getUser');

      cy.get('@bun').contains('Добавить').click();
      cy.get('@sauce').contains('Добавить').click();
      cy.get('@main').contains('Добавить').click();

      cy.get('[data-cy="orderButton"]').click();

      cy.wait('@order');
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="orderNubmer"]').should('contain', '65038');
      cy.get('[data-cy="modalCloseButton"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');

      cy.get('[data-cy="topBunEmpty"]').contains('Выберите булки');
      cy.get('[data-cy="ingredientsEmpty"]').contains('Выберите начинку');
      cy.get('[data-cy="bottomBunEmpty"]').contains('Выберите булки');
    });
  });
});
