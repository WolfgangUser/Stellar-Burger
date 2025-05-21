import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getOrdersList, selectIsOrdersListLoading, selectOrders } from '../../services/slices/order-slice';
import { useDispatch } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectOrders);
  const isOrdersLoading = useSelector(selectIsOrdersListLoading)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrdersList());
  }, [])

  if(isOrdersLoading)
    return <h1>Загрузка</h1>
  return <ProfileOrdersUI orders={orders} />;
};
