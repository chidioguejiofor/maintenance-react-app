import types from '../actions';

const initialState = {
  isLoading: false,
  user: {},
  errors: {},
  success: false,
  data: {}
};
export const signup = (state = initialState, action = {}) => {
  switch (action.type) {
  case `${types.SIGN_UP}_RESET`:
    return {
      ...state,
      ...initialState,
    };

  case `${types.SIGN_UP}_LOADING`: {
    return {
      ...state,
      isLoading: true,
      success: false,
      errors: {}
    };
  }
  case `${types.SIGN_UP}_SUCCESS`: {
    const { data } = action.payload;
    return {
      ...state,
      success: true,
      isLoading: false,
      errors: {},
      data,
    };
  }

  case `${types.SIGN_UP}_FAILURE`: {
    const errors = action.payload;
    return {
      ...state,
      success: false,
      isLoading: false,
      errors,
      user: {},
    };
  }


  default:
    return state;
  }
};


export const login = (state = initialState, action = {}) => {
  switch (action.type) {
  case `${types.ENGINEER_LOGIN}_RESET`:
  case `${types.LOGIN}_RESET`:
    return {
      ...state,
      ...initialState
    };

  case `${types.ENGINEER_LOGIN}_LOADING`:
  case `${types.LOGIN}_LOADING`:
    return {
      ...state,
      isLoading: true,
      success: false,
      errors: {},
    };

  case `${types.ENGINEER_LOGIN}_SUCCESS`:
  case `${types.LOGIN}_SUCCESS`: {
    const { data } = action.payload;
    return {
      ...state,
      success: true,
      isLoading: false,
      user: data,
      errors: {},
    };
  }

  case `${types.ENGINEER_LOGIN}_FAILURE`:
  case `${types.LOGIN}_FAILURE`: {
    const errors = action.payload;
    return {
      ...state,
      success: false,
      isLoading: false,
      errors,
      user: {},
    };
  }


  default:
    return state;
  }
};
