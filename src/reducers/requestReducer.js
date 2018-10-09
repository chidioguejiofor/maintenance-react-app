import types from '../actions';

const initialPersistState = {
  isLoading: false,
  request: {},
  errors: {},
  success: false,

};
export const requestReducer = (state = initialPersistState, action = {}) => {
  switch (action.type) {
  case `${types.REQUEST}_RESET`:
    return {
      ...state,
      ...initialPersistState,
    };

  case `${types.CREATE_REQUEST}_LOADING`:
  case `${types.UPDATE_REQUEST}_LOADING`:
  {
    return {
      ...state,
      isLoading: true,
      success: false,
      errors: {}
    };
  }

  case `${types.CREATE_REQUEST}_SUCCESS`:
  case `${types.UPDATE_REQUEST}_SUCCESS`:
  {
    const { data } = action.payload;
    return {
      ...state,
      success: true,
      isLoading: false,
      errors: {},
      request: data.data,
      message: data.message,
    };
  }

  case `${types.CREATE_REQUEST}_FAILURE`:
  case `${types.UPDATE_REQUEST}_FAILURE`: {
    const errors = action.payload;
    return {
      ...state,
      success: false,
      isLoading: false,
      errors,
      request: {},
    };
  }


  default:
    return state;
  }
};


const initialLoadState = {
  isLoading: false,
  requests: [],
  errors: {},
  success: false,
};
export const loadRequestReducer = (state = initialLoadState, action = {}) => {
  switch (action.type) {
  case `${types.LOAD_REQUEST}_RESET`:
    return {
      ...state,
      ...initialLoadState,
    };

  case `${types.LOAD_REQUEST}_LOADING`:
  {
    return {
      ...state,
      isLoading: true,
      success: false,
      errors: {},
    };
  }

  case `${types.LOAD_REQUEST}_SUCCESS`:
  {
    const { result } = action.payload;
    return {
      ...state,
      success: true,
      isLoading: false,
      errors: {},
      requests: result,
    };
  }

  case `${types.LOAD_REQUEST}_FAILURE`: {
    const errors = action.payload;
    return {
      ...state,
      success: false,
      isLoading: false,
      errors,
      requests: [],
    };
  }


  default:
    return state;
  }
};


export default requestReducer;
