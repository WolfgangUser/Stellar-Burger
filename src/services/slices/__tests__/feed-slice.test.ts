import { TFeedsResponse } from '@api';
import feedReducer, { fetchFeedItems, initialState } from '../feed-slice';

describe('Feed request testing', () => {
  test('On request isLoading changes', () => {
    const nextState = feedReducer(initialState, fetchFeedItems.pending(''));
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
  });
  test('On success data is recieved', () => {
    const mockResponse: TFeedsResponse = {
      success: true,
      orders: [
        {
          _id: 'order1',
          ingredients: ['ingredient1', 'ingredient2'],
          status: 'done',
          name: 'Test Order',
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
          number: 1
        }
      ],
      total: 1,
      totalToday: 1
    };
    const nextState = feedReducer(
      initialState,
      fetchFeedItems.fulfilled(mockResponse, 'test-request-id', undefined)
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBeNull();
    expect(nextState.items).toEqual(mockResponse);
  });
  test('On failure error is handled', () => {
    const nextState = feedReducer(
      initialState,
      fetchFeedItems.rejected(new Error('test error'), 'test-request-id')
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBeDefined();
    expect(nextState.items).toBeNull();
  });
});
