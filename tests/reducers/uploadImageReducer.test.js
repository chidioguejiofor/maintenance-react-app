import chai from 'chai';
import uploadImageReducer from '../../src/reducers/uploadImageReducer';
import types from '../../src/actions';

const initialState = {
  isLoading: false,
  success: false,
  imageUrl: ''
};


describe('Testing uploadImageReducer', () => {
  describe('when an invalid action type is passed', () => {
    it('should return the initial state when an invalid type is passed', () => {
      const invalidAction = {
        type: 'BADDO_TYPE'
      };
      const newState = uploadImageReducer(undefined, invalidAction);
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
      const newState = uploadImageReducer(currentState, invalidAction);
      chai.expect(newState)
        .to.eql(currentState);
    });
    it('should return the initial state when no action is passed', () => {
      const newState = uploadImageReducer();
      chai.expect(newState)
        .to.eql(initialState);
    });
  });

  describe(`when action type equals ${types.UPLOAD_IMAGE}_SUCCESS`, () => {
    it('should update success to true when UPLOAD_IMAGE_SUCCESS action is passed', () => {
      const successAction = {
        type: `${types.UPLOAD_IMAGE}_SUCCESS`,
        payload: { secure_url: 'mockData' }
      };
      const newState = uploadImageReducer({}, successAction);

      chai.expect(newState.success)
        .to.equal(true);
      chai.expect(newState.imageUrl)
        .to.equal(successAction.payload.secure_url);
      chai.expect(newState.isLoading)
        .to.equal(false);
    });
  });

  describe(`when action type equals ${types.UPLOAD_IMAGE}_FAILURE`, () => {
    it('should update success to true when UPLOAD_IMAGE_FAILURE action is passed', () => {
      const successAction = {
        type: `${types.UPLOAD_IMAGE}_FAILURE`,
      };
      const newState = uploadImageReducer({}, successAction);

      chai.expect(newState.success)
        .to.equal(false);
      chai.expect(newState.isLoading)
        .to.equal(false);
    });
  });

  describe(`when action type equals ${types.UPLOAD_IMAGE}_LOADING`, () => {
    it('should update success to true when UPLOAD_IMAGE_LOADING action is passed', () => {
      const successAction = {
        type: `${types.UPLOAD_IMAGE}_LOADING`,
      };
      const newState = uploadImageReducer({}, successAction);

      chai.expect(newState.success)
        .to.equal(false);
      chai.expect(newState.isLoading)
        .to.equal(true);
    });
  });
});
