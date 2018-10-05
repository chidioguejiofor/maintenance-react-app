import types from '../actions';

const initialState = {
  isLoading: false,
  success: false,
  imageUrl: ''
};

export const uploadImageReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case `${types.UPLOAD_IMAGE}_LOADING`:
    return {
      ...state,
      isLoading: true,
      success: false,
    };
  case `${types.UPLOAD_IMAGE}_SUCCESS`: {
    const { secure_url } = action.payload; //eslint-disable-line
    return {
      ...state,
      imageUrl: secure_url,
      success: true,
      isLoading: false
    };
  }

  case `${types.UPLOAD_IMAGE}_FAILURE`: {
    return {
      ...state,
      isLoading: false,
      success: false,
    };
  }
  default:
    return state;
  }
};

export default uploadImageReducer;
