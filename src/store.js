import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import promiseMiddleware from 'redux-promise-middleware';
import combinedReducer from './reducers';
import errorMiddleware from './middlewares/errorMiddleware';
import successMiddleware from './middlewares/successMiddleware';
import loginSuccessMiddleware from './middlewares/loginSuccessMiddleware';
import resetCurrentRequestMiddleware
  from './middlewares/resetCurrentRequestMiddleware';

const suffixes = ['LOADING', 'SUCCESS', 'FAILURE'];
const middlewares = [
  promiseMiddleware({ promiseTypeSuffixes: suffixes }),
  successMiddleware,
  resetCurrentRequestMiddleware,
  errorMiddleware,
  loginSuccessMiddleware,
];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger({ collapsed: true }));
}
const initialState = {};
const store = createStore(
  combinedReducer, initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
