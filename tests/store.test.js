import chai from 'chai';
import store from '../src/store';

describe('Testing the store that was created', () => {
  it('should be able to dispatch actions', () => {
    store.dispatch({ type: 'TESTING' });
    const initialState = store.getState();
    chai.expect(initialState)
      .to.be.an('object');
  });
});
