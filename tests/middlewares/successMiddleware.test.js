import chai from 'chai';
import successMiddleware from
  '../../src/middlewares/successMiddleware';

describe('Testing errorMiddleware', () => {
  const next = action => action;
  it('should return the action passed when the action is not a FAILURE', () => {
    const mockAction = {
      type: 'BAD_GUY_ACTION',
      payload: {}
    };

    const result = successMiddleware()(next)(mockAction);
    chai.expect(result)
      .to.equal(mockAction);
  });
  it('should  return store output in a result property', () => {
    const mockData = {
      username: 'username',
      email: 'exaplemail@gmail.com',
      token: 'mockToken'
    };
    const mockAction = {
      type: 'REQUEST_SUCCESS',
      payload: {
        data: {
          data: mockData
        },
        message: 'Happy'
      }
    };

    const action = successMiddleware()(next)(mockAction);
    chai.expect(action.payload.result)
      .to.eql(mockData);
    chai.expect(action.payload.success)
      .to.eql(true);
  });


  it('should  return message in a message property', () => {
    const message = 'Happy';
    const mockAction = {
      type: 'REQUEST_SUCCESS',
      payload: {
        data: {
          data: {},
          message,
        },

      }
    };

    const { payload } = successMiddleware()(next)(mockAction);
    chai.expect(payload.message)
      .to.eql(message);
  });
  it('should  return statusCode in a message property', () => {
    const message = 'Happy';
    const mockAction = {
      type: 'REQUEST_SUCCESS',
      payload: {
        data: {
          data: {},
          message,
        },
        status: 200,

      }
    };

    const { payload } = successMiddleware()(next)(mockAction);
    chai.expect(payload.statusCode)
      .to.eql(200);
  });
});
