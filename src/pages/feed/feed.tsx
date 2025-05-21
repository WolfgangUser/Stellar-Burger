import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeed, selectError, selectFeed, selectFeedOrders, selectIsLoading } from '../../services/slices/feed-slice';
import { useDispatch } from '../../services/store';
import { useSelector } from 'react-redux';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(selectFeed);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(getFeed());
  };

  if (loading) return <Preloader />;
  if (error) return <div>Ошибка: {error.message}</div>;
  if (!orders?.orders.length) return <div>Нет доступных заказов</div>;

  return <FeedUI orders={orders.orders} handleGetFeeds={handleGetFeeds} />;
};
