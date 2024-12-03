import { useSelector, useDispatch } from '../../services/store';
import { FC, useMemo, useState, useEffect } from 'react';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  getOrderIngredientsSelector,
  getBunsSelector,
  getIngredientsIdSelector,
  removeAllIngredients
} from '../../services/slices/orderSlice';

import {
  orderBurger,
  orderResponseSelector,
  isLoadingSelector,
  resetOrder
} from '../../services/slices/createOrderSlice';
import { authenticatedSelector } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(authenticatedSelector);
  const ingredients = useSelector(getOrderIngredientsSelector);
  const bun = useSelector(getBunsSelector);
  const allIngredientsId = useSelector(getIngredientsIdSelector);
  const navigate = useNavigate();
  const orderResponse = useSelector(orderResponseSelector);

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const orderRequest = useSelector(isLoadingSelector);

  const [orderModalData, setOrderModalData] = useState<TOrder | null>(null);

  useEffect(() => {
    if (orderResponse?.order) {
      setOrderModalData(orderResponse.order);
      dispatch(removeAllIngredients());
      dispatch(resetOrder());
    }
  }, [orderResponse]);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (isAuthenticated) {
      dispatch(orderBurger(allIngredientsId));
    } else {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    setOrderModalData(null);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
