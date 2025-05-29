import { TOrder } from '@utils-types';
import orderReducer, {
  fecthOrdersList,
  initialState,
  IOrderState
} from '../order-slice';

describe('Order request testing', () => {
  test('On request isLoading changes', () => {
    const nextState = orderReducer(initialState, fecthOrdersList.pending(''));
    expect(nextState.isLoadingOrders).toBe(true);
    expect(nextState.orderError).toBeNull();
  });
  test('On success data is recieved', () => {
    const mockOrders: TOrder[] = [
      {
        _id: 'order1',
        ingredients: ['ingredient1', 'ingredient2'],
        status: 'done',
        name: 'Test Order',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
        number: 1
      }
    ];
    const nextState = orderReducer(
      initialState,
      fecthOrdersList.fulfilled(mockOrders, 'test-request-id', undefined)
    );
    expect(nextState.isLoadingOrders).toBe(false);
    expect(nextState.orderError).toBeNull();
    expect(nextState.orders).toEqual(mockOrders);
  });
  test('On failure error is handled', () => {
    const nextState = orderReducer(
      initialState,
      fecthOrdersList.rejected(new Error('test error'), 'test-request-id')
    );
    expect(nextState.isLoadingOrders).toBe(false);
    expect(nextState.orderError).toBeDefined();
  });
});
