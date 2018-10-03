import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import promiseMiddleware from 'redux-promise-middleware';
import combinedReducer from './reducers';

const suffixes = ['LOADING', 'SUCCESS', 'FAILURE'];
const middlewares = [promiseMiddleware({ promiseTypeSuffixes: suffixes })];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger({ collapsed: true }));
}
const initialState = {};
const store = createStore(
  combinedReducer, initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);


store.dispatch({
  type: 'TEST_SUCCESS',
  payload: {
    value: 'Successful',
  }
});

store.dispatch({
  type: 'TEST_PROMISE',
  payload: {
    promise: Promise.resolve(() => ({
      promise: true,
    }))
  }
});


store.dispatch({
  type: 'TEST_PROMISE',
  payload: {
    promise: Promise.reject(new Error('bad data'))
  }
});
export default store;
