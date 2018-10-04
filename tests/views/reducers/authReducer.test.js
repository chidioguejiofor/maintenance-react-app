import chai from 'chai';
import { signup, login } from '../../../src/reducers/authReducer';

const initialState = {
  isLoading: false,
  user: {},
  errors: {},
  success: false,
  data: {}
};
describe('Testing authReducers', () => {
  describe('signup reducer', () => {
    it('should return the initial state when an invalid type is passed', () => {
      const invalidAction = {
        type: 'BADDO_TYPE'
      };
      const newState = signup(undefined, invalidAction);
      chai.expect(newState)
        .to.eql(initialState);
    });
    it('should return the state passed to it when an unknown action type is passed', () => {
      const invalidAction = {
        type: 'BADDO_TYPE'
      };
      const currentState = {
        name: 'CURRENT_STATE',
        value: 'mock'
      };
      const newState = signup(currentState, invalidAction);
      chai.expect(newState)
        .to.eql(currentState);
    });
    it('should return the initial state when no action is passed', () => {
      const newState = signup();
      chai.expect(newState)
        .to.eql(initialState);
    });

    it('should update success to true when SIGN_UP_SUCCESS action is passed', () => {
      const successAction = {
        type: 'SIGN_UP_SUCCESS',
        payload: { data: 'mockData' }
      };
      const newState = signup({}, successAction);

      chai.expect(newState.errors)
        .to.eql({});
      chai.expect(newState.success)
        .to.equal(true);
      chai.expect(newState.data)
        .to.equal(successAction.payload.data);
      chai.expect(newState.isLoading)
        .to.equal(false);
    });

    it('should update loading to true when SIGN_UP_LOADING action is passed', () => {
      const loadingAction = {
        type: 'SIGN_UP_LOADING',
      };
      const newState = signup({}, loadingAction);

      chai.expect(newState.errors)
        .to.eql({});
      chai.expect(newState.success)
        .to.equal(false);
      chai.expect(newState.isLoading)
        .to.equal(true);
    });

    it('should update failure to true when SIGN_UP_FAILURE action is passed', () => {
      const failureAction = {
        type: 'SIGN_UP_FAILURE',
        payload: 'errors',
      };
      const newState = signup({}, failureAction);

      chai.expect(newState.errors)
        .to.eql(failureAction.payload);
      chai.expect(newState.success)
        .to.equal(false);
      chai.expect(newState.isLoading)
        .to.equal(false);
    });

    it('should update failure to true when SIGN_UP_FAILURE action is passed', () => {
      const failureAction = {
        type: 'SIGN_UP_RESET',
        payload: 'errors',
      };
      const newState = signup({}, failureAction);

      chai.expect(newState)
        .to.eql(initialState);
    });
  });

  describe('login reducer', () => {
    it('should return the initial state when an invalid type is passed', () => {
      const invalidAction = {
        type: 'BADDO_TYPE'
      };
      const newState = login(undefined, invalidAction);
      chai.expect(newState)
        .to.eql(initialState);
    });

    it('should return the state passed to it when an unknown action type is passed', () => {
      const invalidAction = {
        type: 'BADDO_TYPE'
      };
      const currentState = {
        name: 'CURRENT_STATE',
        value: 'mock'
      };
      const newState = login(currentState, invalidAction);
      chai.expect(newState)
        .to.eql(currentState);
    });
    it('should return the initial state when no action is passed', () => {
      const newState = login();
      chai.expect(newState)
        .to.eql(initialState);
    });

    it('should update success to true when SIGN_UP_SUCCESS action is passed', () => {
      const successAction = {
        type: 'LOGIN_SUCCESS',
        payload: { data: 'mockData' }
      };
      const newState = login({}, successAction);

      chai.expect(newState.errors)
        .to.eql({});
      chai.expect(newState.success)
        .to.equal(true);
      chai.expect(newState.isLoading)
        .to.equal(false);
    });

    it('should update loading to true when SIGN_UP_LOADING action is passed', () => {
      const loadingAction = {
        type: 'LOGIN_LOADING',
      };
      const newState = login({}, loadingAction);

      chai.expect(newState.errors)
        .to.eql({});
      chai.expect(newState.success)
        .to.equal(false);
      chai.expect(newState.isLoading)
        .to.equal(true);
    });

    it('should update failure to true when SIGN_UP_FAILURE action is passed', () => {
      const failureAction = {
        type: 'LOGIN_FAILURE',
        payload: 'errors',
      };
      const newState = login({}, failureAction);

      chai.expect(newState.errors)
        .to.eql(failureAction.payload);
      chai.expect(newState.success)
        .to.equal(false);
      chai.expect(newState.isLoading)
        .to.equal(false);
    });

    it('should update failure to true when SIGN_UP_FAILURE action is passed', () => {
      const failureAction = {
        type: 'LOGIN_RESET',
        payload: 'errors',
      };
      const newState = login({}, failureAction);

      chai.expect(newState)
        .to.eql(initialState);
    });
  });
});
