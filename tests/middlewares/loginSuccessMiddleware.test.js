import chai from 'chai';
import loginSuccessMiddleware from
  '../../src/middlewares/loginSuccessMiddleware';

describe('Testing errorMiddleware', () => {
  const next = action => action;
  it('should return the action passed when the action is not a FAILURE', () => {
    const mockAction = {
      type: 'BAD_GUY_ACTION',
      payload: {}
    };

    const result = loginSuccessMiddleware()(next)(mockAction);
    chai.expect(result)
      .to.equal(mockAction);
  });
  it('should store the user information on login success', () => {
    const mockUser = {
      username: 'username',
      email: 'exaplemail@gmail.com',
      token: 'mockToken'
    };
    const mockAction = {
      type: 'LOGIN_SUCCESS',
      payload: {
        data: {
          data: mockUser
        }
      }
    };

    global.localStorage.token = {};
    const action = loginSuccessMiddleware()(next)(mockAction);
    chai.expect(action)
      .to.eql(mockAction);
    chai.expect(mockUser.token)
      .to.equal(localStorage.token);
    chai.expect(mockUser.username)
      .to.equal(localStorage.username);
    chai.expect(mockUser.email)
      .to.equal(localStorage.email);
  });
});
