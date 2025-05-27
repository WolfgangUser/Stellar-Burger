import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  fecthOrdersList,
  selectIsOrdersListLoading,
  selectOrders
} from '../../services/slices/order-slice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectOrders);
  const isOrdersLoading = useSelector(selectIsOrdersListLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fecthOrdersList());
  }, []);

  if (isOrdersLoading) return <h1>Загрузка</h1>;
  return <ProfileOrdersUI orders={orders} />;
};
