import isPromise from 'is-promise';

const errorMiddleware = () => next => (action) => {
  if (isPromise(action.payload)) {
    return next(action).catch(err => err);
  }

  if (action.type.includes('_FAILURE')) {
    if (action.payload.message === 'Network Error') {
      action.payload = {
        ...action.payload,
        errorMessages: ['Check your network connection'],
        message: 'Network Error'
      };
      return next(action);
    }
    const { data: errors, status } = action.payload.response;
    const errorMessages = [];
    if (errors.missingData) {
      errorMessages.push(...errors.missingData
        .map(data => `You forgot the ${data}`));
    }
    if (errors.invalidData) errorMessages.push(...errors.invalidData);
    if (status === 404) {
      errorMessages.push(errors.messages);
    }
    action.payload = {
      ...errors,
      errorMessages,
      statusCode: status
    };
  }
  return next(action);
};

export default errorMiddleware;
