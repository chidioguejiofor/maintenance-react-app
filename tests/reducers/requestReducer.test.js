import chai from 'chai';
import { requestReducer as persistRequestReducer,
  loadRequestReducer

} from '../../src/reducers/requestReducer';
import types from '../../src/actions';

const initialPersistState = {
  isLoading: false,
  request: {},
  errors: {},
  success: false,

};

const initialLoadState = {
  isLoading: false,
  requests: [],
  errors: {},
  success: false,
};
describe('Testing requestReducer', () => {
  describe('loadRequestReducer', () => {
    it('should return the initial state when an invalid type is passed', () => {
      const invalidAction = {
        type: 'BADDO_TYPE'
      };
      const newState = loadRequestReducer(undefined, invalidAction);
      chai.expect(newState)
        .to.eql(initialLoadState);
    });
    it('should return the state passed to it when an unknown action type is passed', () => {
      const invalidAction = {
        type: 'BADDO_TYPE'
      };
      const currentState = {
        name: 'CURRENT_STATE',
        value: 'mock'
      };
      const newState = loadRequestReducer(currentState, invalidAction);
      chai.expect(newState)
        .to.eql(currentState);
    });
    it('should return the initial state when no action is passed', () => {
      const newState = loadRequestReducer();
      chai.expect(newState)
        .to.eql(initialLoadState);
    });
    describe(`Testing ${types.LOAD_REQUEST}_RESET`, () => {
      it(`should return initialPersistState when fired${types.LOAD_REQUEST}_RESET`, () => {
        const resetAction = {
          type: `${types.LOAD_REQUEST}_RESET`,
        };
        const newState = loadRequestReducer({ isLoading: true, errors: 'Me' }, resetAction);

        chai.expect(newState)
          .to.eql(initialLoadState);
      });
      it('should return the success equal false when FAILURE', () => {
        const failureAction = {
          type: `${types.LOAD_REQUEST}_FAILURE`,
          payload: 'errors'
        };
        const newState = loadRequestReducer({}, failureAction);

        chai.expect(newState.errors)
          .to.eql(failureAction.payload);
        chai.expect(newState.success)
          .to.equal(false);
        chai.expect(newState.isLoading)
          .to.equal(false);
        chai.expect(newState.requests)
          .to.eql([]);
      });
      it('should return the success equal false when LOADING', () => {
        const failureAction = {
          type: `${types.LOAD_REQUEST}_LOADING`,
          payload: 'errors'
        };
        const newState = loadRequestReducer({}, failureAction);

        chai.expect(newState.errors)
          .to.eql({});
        chai.expect(newState.success)
          .to.equal(false);
        chai.expect(newState.isLoading)
          .to.equal(true);
      });
      it(`should return success and data when action equals "${types.LOAD_REQUEST}_SUCCESS"`, () => {
        const requests = [{
          id: 3,
          date: 'temp'
        }];
        const successAction = {
          type: `${types.LOAD_REQUEST}_SUCCESS`,
          payload: {
            result: requests,
          }
        };
        const newState = loadRequestReducer({}, successAction);

        chai.expect(newState.success)
          .to.equal(true);
        chai.expect(newState.isLoading)
          .to.equal(false);
        chai.expect(newState.errors)
          .to.eql({});
        chai.expect(newState.requests)
          .to.eql(requests);
      });
    });
  });
  describe('persistRequestReducer', () => {
    it('should return the initial state when an invalid type is passed', () => {
      const invalidAction = {
        type: 'BADDO_TYPE'
      };
      const newState = persistRequestReducer(undefined, invalidAction);
      chai.expect(newState)
        .to.eql(initialPersistState);
    });
    it('should return the state passed to it when an unknown action type is passed', () => {
      const invalidAction = {
        type: 'BADDO_TYPE'
      };
      const currentState = {
        name: 'CURRENT_STATE',
        value: 'mock'
      };
      const newState = persistRequestReducer(currentState, invalidAction);
      chai.expect(newState)
        .to.eql(currentState);
    });
    it('should return the initial state when no action is passed', () => {
      const newState = persistRequestReducer();
      chai.expect(newState)
        .to.eql(initialPersistState);
    });
    describe(`Testing ${types.REQUEST}_RESET`, () => {
      it('should return initialPersistState when fired', () => {
        const resetAction = {
          type: `${types.REQUEST}_RESET`,
        };
        const newState = persistRequestReducer({ isLoading: true, errors: 'Me' }, resetAction);

        chai.expect(newState)
          .to.eql(initialPersistState);
      });

      describe(`Testing ${types.CREATE_REQUEST}`, () => {
        it('should return the success equal false when FAILURE', () => {
          const failureAction = {
            type: `${types.CREATE_REQUEST}_FAILURE`,
            payload: 'errors'
          };
          const newState = persistRequestReducer({}, failureAction);

          chai.expect(newState.errors)
            .to.eql(failureAction.payload);
          chai.expect(newState.success)
            .to.equal(false);
          chai.expect(newState.isLoading)
            .to.equal(false);
        });

        it('should return the success equal false when FAILURE', () => {
          const failureAction = {
            type: `${types.CREATE_REQUEST}_LOADING`,
            payload: 'errors'
          };
          const newState = persistRequestReducer({}, failureAction);

          chai.expect(newState.errors)
            .to.eql({});
          chai.expect(newState.success)
            .to.equal(false);
          chai.expect(newState.isLoading)
            .to.equal(true);
        });
        it(`should return success and data when action equals "${types.CREATE_REQUEST}_SUCCESS"`, () => {
          const message = 'Here is the message';
          const request = {
            id: 3,
            date: 'temp'
          };
          const successAction = {
            type: `${types.CREATE_REQUEST}_SUCCESS`,
            payload: {
              data: {
                message,
                data: request
              }
            }
          };
          const newState = persistRequestReducer({}, successAction);

          chai.expect(newState.success)
            .to.equal(true);
          chai.expect(newState.isLoading)
            .to.equal(false);
          chai.expect(newState.errors)
            .to.eql({});
          chai.expect(newState.message)
            .to.eql(message);
          chai.expect(newState.request)
            .to.eql(request);
        });
      });

      describe(`Testing ${types.UPDATE_REQUEST}`, () => {
        it('should return the success equal false when FAILURE', () => {
          const failureAction = {
            type: `${types.UPDATE_REQUEST}_FAILURE`,
            payload: 'errors'
          };
          const newState = persistRequestReducer({}, failureAction);

          chai.expect(newState.errors)
            .to.eql(failureAction.payload);
          chai.expect(newState.success)
            .to.equal(false);
          chai.expect(newState.isLoading)
            .to.equal(false);
        });

        it('should return the success equal false when FAILURE', () => {
          const failureAction = {
            type: `${types.UPDATE_REQUEST}_LOADING`,
            payload: 'errors'
          };
          const newState = persistRequestReducer({}, failureAction);

          chai.expect(newState.errors)
            .to.eql({});
          chai.expect(newState.success)
            .to.equal(false);
          chai.expect(newState.isLoading)
            .to.equal(true);
        });
        it(`should return success and data when action equals "${types.UPDATE_REQUEST}_SUCCESS"`, () => {
          const message = 'Here is the message';
          const request = {
            id: 3,
            date: 'temp'
          };
          const successAction = {
            type: `${types.UPDATE_REQUEST}_SUCCESS`,
            payload: {
              data: {
                message,
                data: request
              }
            }
          };
          const newState = persistRequestReducer({}, successAction);

          chai.expect(newState.success)
            .to.equal(true);
          chai.expect(newState.isLoading)
            .to.equal(false);
          chai.expect(newState.errors)
            .to.eql({});
          chai.expect(newState.message)
            .to.eql(message);
          chai.expect(newState.request)
            .to.eql(request);
        });
      });
    });
  });
});
