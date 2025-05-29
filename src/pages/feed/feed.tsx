import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  fetchFeedItems,
  selectError,
  selectFeed,
  selectIsLoading
} from '../../services/slices/feed-slice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(selectFeed);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeedItems());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeedItems());
  };

  if (loading) return <Preloader />;
  if (error) return <div>Ошибка: {error.message}</div>;
  if (!orders?.orders.length) return <div>Нет доступных заказов</div>;

  return <FeedUI orders={orders.orders} handleGetFeeds={handleGetFeeds} />;
};
