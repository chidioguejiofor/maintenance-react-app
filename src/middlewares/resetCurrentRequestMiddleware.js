import store from '../store';

const resetCurrentRequestMiddleware = () => next => (action) => {
  if (action.type.includes('LOAD_REQUEST')) {
    store.dispatch({ type: 'REQUEST_RESET' });
  }
  return next(action);
};

export default resetCurrentRequestMiddleware;
