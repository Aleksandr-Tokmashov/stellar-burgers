# Онлайн-сервис заказа бургеров "Stellar burgers"
Stellar burgers - это SPA-приложение для создания кастомных бургеров с системой заказов. Проект включает:
- Конструктор бургеров с выбором ингредиентов
- Систему заказов с отслеживанием статусов
- Авторизацию и личный кабинет
- Аналитику выполнения заказов
<br><br>
![{35FF9DFE-6736-42AF-9A0B-0ACB1DC4ADEC}](https://github.com/user-attachments/assets/cab40abb-3ec8-4fae-9bb5-e04f551a2168)

## Что было сделано
### State Management
- Реализовал Redux-хранилище (store) для управления состоянием приложения
- Разработал Redux-слайсы для всех ключевых сущностей (ингредиенты бургеров, конструктор бургеров, заказы, пользовательские данные
- Интегрировал Redux с React-компонентами
### Маршрутизация
- Настроил React Router для навигации между страницами
- Реализовал систему защищенных маршрутов:
    - Авторизованные маршруты (личный кабинет, история заказов)
    - Публичные маршруты (авторизация, главная страница)
### Авторизация и профиль
- Интегрировал систему аутентификации:
    - Регистрация
    - Вход
    - Восстановление пароля
- Реализовал редактирование информации профиля
- Реализовал просмотр истории заказов
### Тестирование
- Написал юнит-тесты (Jest) для:
    - Редьюсеров слайсов
    - Корневого редьюсера
- Реализовал интеграционные тесты (Cypress) для:
    - Конструктора бургеро
    - Модальных окон
    - Создания заказа

## Установка и запуск
- Клонируйте репозиторий: \
`git clone git@github.com:Aleksandr-Tokmashov/stellar-burgers.git`
- Установите зависимости: \
`npm install`
Важно: Для корректной работы запросов к серверу необходимо добавить переменную BURGER_API_URL в окружение. Сама ссылка находится в файле `.env.example`. Необходимо создать файл `.env` в корне проекта и перенести туда содержимое `.env.example`
- Запустите в development режиме: \
`npm run start`
## Запуск тестов
- Тесты на Jest: \
`npm run test`
 Тесты на Cypress: \
`npm run cypress:open`

