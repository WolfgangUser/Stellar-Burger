import { TOrder } from '@utils-types';
import userReducer, {
  initialState,
  loginUser,
  logout,
  registerUser
} from '../user-slice';
import { TLoginData, TRegisterData } from '@api';

import * as apiModule from '@api';

describe('Register, Log in and out tesing', () => {
  test('Login test', () => {
    const loginInfo: TLoginData = {
      email: 'lol',
      password: 'kek'
    };
    const spy = jest.spyOn(apiModule, 'loginUserApi').mockResolvedValue({
      success: true,
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken',
      user: {
        email: 'lol',
        name: 'test user'
      }
    });
    const nextState = userReducer(
      initialState,
      loginUser.fulfilled(
        {
          email: loginInfo.email,
          name: 'test user'
        },
        'test-request-id',
        loginInfo
      )
    );
    expect(nextState.data?.email).toEqual(loginInfo.email);
    expect(nextState.isAuthed).toBe(true);
    expect(nextState.loginError).toBeUndefined();
    expect(nextState.registerError).toBeUndefined();

    spy.mockReset();
  });
  test('Logout test', () => {
    const spy = jest
      .spyOn(apiModule, 'logoutApi')
      .mockResolvedValue({ success: true });
    const nextState = userReducer(
      initialState,
      logout.fulfilled(undefined, '')
    );
    expect(nextState.isAuthed).toBe(false);
    expect(nextState.data).toBeNull();
    expect(nextState.loginError).toBeUndefined();
    expect(nextState.registerError).toBeUndefined();

    spy.mockReset();
  });
  test('Register test', () => {
    const spy = jest.spyOn(apiModule, 'registerUserApi').mockResolvedValue({
      success: true,
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken',
      user: {
        email: 'test@example.com',
        name: 'Test User'
      }
    });
    const registerinfo: TRegisterData = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'testpassword'
    };
    const nextState = userReducer(
      initialState,
      registerUser.fulfilled(
        {
          email: registerinfo.email,
          name: registerinfo.name
        },
        'test-request-id',
        registerinfo
      )
    );
    expect(nextState.data?.email).toEqual(registerinfo.email);
    expect(nextState.isAuthed).toBe(true);
    expect(nextState.loginError).toBeUndefined();
    expect(nextState.registerError).toBeUndefined();

    spy.mockReset();
  });
});
