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

  it('should store the admin informatinos and value admin ===true in the localStorage when the user is engineer', () => {
    const mockUser = {
      username: 'adminUsername',
      email: 'exapleadminmail@gmail.com',
      token: 'mockAdminToken'
    };
    const mockAction = {
      type: 'ENGINEER_LOGIN_SUCCESS',
      payload: {
        data: {
          data: mockUser
        }
      }
    };

    global.localStorage.token = '';
    global.localStorage.admin = false;
    const action = loginSuccessMiddleware()(next)(mockAction);
    chai.expect(action)
      .to.eql(mockAction);
    chai.expect(mockUser.token)
      .to.equal(localStorage.token);
    chai.expect(mockUser.username)
      .to.equal(localStorage.username);
    chai.expect(mockUser.email)
      .to.equal(localStorage.email);
    chai.expect(localStorage.admin)
      .to.equal('true');
  });
});
