import { getIngredientsApi } from '@api';
import {
  fetchIngredients,
  IIngredientsState,
  initialState
} from '../ingredients-slice';
import ingredientsReducer from '../ingredients-slice';
import { TIngredient } from '@utils-types';

describe('Ingredients request testing', () => {
  test('On request isLoading changes', () => {
    const nextState = ingredientsReducer(
      initialState,
      fetchIngredients.pending('', undefined)
    );
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
  });
  test('On success data is recieved', () => {
    const mockIngredients: TIngredient[] = [
      {
        _id: '2',
        name: 'Соус фирменный',
        type: 'sauce',
        proteins: 2,
        fat: 8,
        carbohydrates: 15,
        calories: 100,
        price: 20,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        _id: '4',
        name: 'Салат свежий',
        type: 'main',
        proteins: 1,
        fat: 0,
        carbohydrates: 3,
        calories: 15,
        price: 10,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ];
    const nextState = ingredientsReducer(
      initialState,
      fetchIngredients.fulfilled(mockIngredients, 'test-request-id', undefined)
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBeNull();
    expect(nextState.items).toEqual(mockIngredients);
  });
  test('On failure error is handled', () => {
    const nextState = ingredientsReducer(
      initialState,
      fetchIngredients.rejected(new Error('test error'), 'test-request-id')
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBeDefined();
    expect(nextState.items).toHaveLength(0);
  });
});
