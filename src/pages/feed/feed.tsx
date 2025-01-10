import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store/store';
import {
  getFeedsSelector,
  isLoadingSelector
} from '../../services/slices/feedsSlice/feedsSlice';
import { getFeeds } from '../../services/slices/feedsSlice/feedsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingSelector);
  const orders: TOrder[] = useSelector(getFeedsSelector);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
