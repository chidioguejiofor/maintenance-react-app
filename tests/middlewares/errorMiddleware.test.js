import chai from 'chai';
import errorMiddleware from '../../src/middlewares/errorMiddleware';

describe('Testing errorMiddleware', () => {
  const next = action => action;
  it('should return the action passed when the action is not a FAILURE', () => {
    const mockAction = {
      type: 'BAD_GUY_ACTION',
      payload: {}
    };

    const result = errorMiddleware()(next)(mockAction);
    chai.expect(result)
      .to.equal(mockAction);
  });

  describe('on FAILURE', () => {
    it('should return message "Network Error" when action.payload.message === "Network Error"', () => {
      const mockAction = {
        type: 'ACTION_FAILURE',
        payload: {
          message: 'Network Error'
        }
      };

      const { payload } = errorMiddleware()(next)(mockAction);
      chai.expect(payload.errorMessages[0])
        .to.equal('Check your network connection');
      chai.expect(payload.message)
        .to.equal('Network Error');
    });
    it('should push missingData to errorMessages when payload contains missingData', () => {
      const missingData = ['hello world', 'world why'];
      const mockAction = {
        type: 'ACTION_FAILURE',
        payload: {
          response: {
            data: { missingData }
          }
        }
      };

      const { payload } = errorMiddleware()(next)(mockAction);
      chai.expect(payload.errorMessages.length)
        .to.equal(missingData.length);
    });
    it('should push invalidData to errorMessages when payload contains invalidData', () => {
      const invalidData = ['hello world', 'world why'];
      const mockAction = {
        type: 'ACTION_FAILURE',
        payload: {
          response: {
            data: { invalidData }
          }
        }
      };

      const { payload } = errorMiddleware()(next)(mockAction);
      chai.expect(payload.errorMessages.length)
        .to.equal(invalidData.length);
    });
    it('should push messages to errorMessages when status === 404', () => {
      const message = 'not found';
      const mockAction = {
        type: 'ACTION_FAILURE',
        payload: {
          response: {
            data: { message },
            status: 404
          }
        }
      };

      const { payload } = errorMiddleware()(next)(mockAction);
      chai.expect(payload.errorMessages[0])
        .to.equal(message);
    });

    it('should return the status code when it is in the payload', () => {
      const mockAction = {
        type: 'ACTION_FAILURE',
        payload: {
          response: {
            data: { },
            status: 400
          }
        }
      };

      const { payload } = errorMiddleware()(next)(mockAction);
      chai.expect(payload.statusCode)
        .to.equal(400);
    });


    it('should clear the localStorage token the status is 401', () => {
      const mockAction = {
        type: 'ACTION_FAILURE',
        payload: {
          response: {
            data: { },
            status: 401
          }
        }
      };
      global.localStorage.token = 'hellow people I am here';

      const { payload } = errorMiddleware()(next)(mockAction);
      chai.expect(payload.statusCode)
        .to.equal(401);
      chai.expect(localStorage.token)
        .to.equal('');
    });
  });
});
