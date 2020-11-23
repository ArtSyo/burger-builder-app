import auth from './auth';

import * as constants from '../constants';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(auth(undefined, {})).toEqual({
      tokenId: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });
  it('should store token after login', () => {
    expect(
      auth(
        {
          tokenId: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: '/',
        },
        {
          type: constants.AUTH_SUCCESS,
          tokenId: 'some-token',
          userId: 'some-userId',
        }
      )
    ).toEqual({
      tokenId: 'some-token',
      userId: 'some-userId',
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });
});
