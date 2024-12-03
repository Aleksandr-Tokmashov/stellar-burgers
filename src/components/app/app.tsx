import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';

import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { ProtectedRoute } from '../../components/protected-route';
import { getUser } from '../../services/slices/userSlice';
import { getFeeds } from '../../services/slices/feedsSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
    dispatch(getFeeds());
  }, []);

  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1);
  };

  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path='orders'>
            <Route
              index
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={onClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='Детали заказа' onClose={onClose}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={onClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
