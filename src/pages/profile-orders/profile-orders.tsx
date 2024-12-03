import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrders,
  getProfileOrdersSelector,
  isLoadingSelector
} from '../../services/slices/profileOrdersSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const orders: TOrder[] = useSelector(getProfileOrdersSelector);
  const isLoading = useSelector(isLoadingSelector);
  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
