import store from '../../store';

describe('RootReducer initialization test', () => {
  test('should initialize all slices in the state', () => {
    const state = store.getState();
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
  });
});
