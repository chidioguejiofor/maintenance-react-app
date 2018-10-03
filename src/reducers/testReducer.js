
const initialState = {
  isLoading: false,
  success: false,
};

const testReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case 'TEST':
    return {
      ...state,
      ...initialState
    };

  case 'TEST_PROMISE': {
    const { promise } = action.payload;
    return {
      ...state,
      promise
    };
  }
  case 'TEST_LOADING':
    return {
      ...state,
      isLoading: true,
    };

  case 'TEST_SUCCESS':
    return {
      ...state,
      isLoading: false,
      success: true,
      value: action.payload.value
    };
  case 'TEST_FAILURE':
    return {
      ...state,
      isLoading: false,
      success: true,
    };

  default:
    return state;
  }
};

export default testReducer;
