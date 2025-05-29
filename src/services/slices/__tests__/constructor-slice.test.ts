import { TConstructorIngredient, TIngredient } from '@utils-types';
import constructortReducer, {
  addIngredient,
  deleteIngredient,
  IConstructorState,
  initialState,
  moveIngredient
} from '../constructor-slice';

const bun: TIngredient = {
  _id: '1',
  name: 'Булка N1',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 200,
  price: 50,
  image: '',
  image_large: '',
  image_mobile: ''
};
const regular: TIngredient = {
  _id: '3',
  name: 'Котлета говяжья',
  type: 'main',
  proteins: 15,
  fat: 10,
  carbohydrates: 5,
  calories: 250,
  price: 80,
  image: '',
  image_large: '',
  image_mobile: ''
};

// Можно использовать для тестов или сторибуков
const mockIngredients: TIngredient[] = [
  bun,
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
  regular,
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

describe('add ingredient action', () => {
  test('add bun', () => {
    const ingredient = bun;
    const state = constructortReducer(initialState, addIngredient(ingredient));
    expect(state.constructorItems.bun?._id).toEqual(ingredient._id);
    expect(state.constructorItems.ingredients).toHaveLength(0);
  });
  test('add regular', () => {
    const ingredient = regular;
    const state = constructortReducer(initialState, addIngredient(ingredient));
    expect(state.constructorItems.bun).toBeNull();
    expect(state.constructorItems.ingredients[0]._id).toEqual(ingredient._id);
    expect(state.constructorItems.ingredients).toHaveLength(1);
  });
});

describe('delete ingredient action', () => {
  test('delete bun', () => {
    const ingredient = bun;
    const state = constructortReducer(initialState, addIngredient(ingredient));
    const deleteing = state.constructorItems.bun;
    const res = constructortReducer(state, deleteIngredient(deleteing!));
    expect(res.constructorItems.bun).toBeNull();
    expect(state.constructorItems.ingredients).toHaveLength(0);
  });
  test('delete regular', () => {
    const ingredient = regular;
    const state = constructortReducer(initialState, addIngredient(ingredient));
    const deleteing = state.constructorItems.ingredients[0];
    const res = constructortReducer(state, deleteIngredient(deleteing));
    expect(res.constructorItems.bun).toBeNull();
    expect(res.constructorItems.ingredients).toHaveLength(0);
  });
});

describe('change position of ingredient', () => {
  test('move down', () => {
    const state: IConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: mockIngredients.map(
          (x, ind) =>
            ({
              ...x,
              _id: ind.toString(),
              id: ind.toString()
            }) as TConstructorIngredient
        )
      }
    };
    const moving = state.constructorItems.ingredients[0];
    const movedState = constructortReducer(
      state,
      moveIngredient({ ingredient: moving, direction: 'down' })
    );
    expect(movedState.constructorItems.ingredients[1]).toEqual(moving);
  });
  test('move up', () => {
    const state: IConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: mockIngredients.map(
          (x, ind) =>
            ({
              ...x,
              _id: ind.toString(),
              id: ind.toString()
            }) as TConstructorIngredient
        )
      }
    };
    const length = state.constructorItems.ingredients.length;
    const moving = state.constructorItems.ingredients[length - 1];

    const movedState = constructortReducer(
      state,
      moveIngredient({ ingredient: moving, direction: 'up' })
    );
    expect(movedState.constructorItems.ingredients[length - 2]).toEqual(moving);
  });

  test('move down when boundary', () => {
    const state: IConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: mockIngredients.map(
          (x, ind) =>
            ({
              ...x,
              _id: ind.toString(),
              id: ind.toString()
            }) as TConstructorIngredient
        )
      }
    };
    const length = state.constructorItems.ingredients.length;
    const moving = state.constructorItems.ingredients[length - 1];

    const movedState = constructortReducer(
      state,
      moveIngredient({ ingredient: moving, direction: 'down' })
    );
    expect(movedState.constructorItems.ingredients[length - 1]).toEqual(moving);
    expect(movedState.constructorItems.ingredients[length - 2]).toEqual(
      state.constructorItems.ingredients[length - 2]
    );
  });

  test('move up when boundary', () => {
    const state: IConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: mockIngredients.map(
          (x, ind) =>
            ({
              ...x,
              _id: ind.toString(),
              id: ind.toString()
            }) as TConstructorIngredient
        )
      }
    };
    const length = state.constructorItems.ingredients.length;
    const moving = state.constructorItems.ingredients[0];

    const movedState = constructortReducer(
      state,
      moveIngredient({ ingredient: moving, direction: 'up' })
    );
    expect(movedState.constructorItems.ingredients[0]).toEqual(moving);
    expect(movedState.constructorItems.ingredients[1]).toEqual(
      state.constructorItems.ingredients[1]
    );
  });
});
