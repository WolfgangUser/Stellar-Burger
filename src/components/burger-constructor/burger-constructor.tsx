import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { clearBuilder, selectConstructorItems } from '../../services/slices/constructor-slice';
import { useDispatch, useSelector } from '../../services/store';
import { createOrder, selectOrderModalData, selectOrderRequest, setOrderModalData } from '../../services/slices/order-slice';
import { selectIsAuthed, selectUserData } from '../../services/slices/user-slice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const isAuthed = useSelector(selectIsAuthed);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) return;
    if(!isAuthed){
      navigate('login');
      return;
    }
    try{
      await dispatch(createOrder(constructorItems.ingredients.map(v => v._id))).unwrap();
      dispatch(clearBuilder());
    }
    catch(error){
      console.error(error);
    }
    
  };

  const closeOrderModal = () => {
    dispatch(setOrderModalData(null))
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
