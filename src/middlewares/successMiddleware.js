
const successMiddleware = () => next => (action) => {
  if (action.type.includes('REQUEST_SUCCESS')) {
    const { data: result, message, } = action.payload.data;
    const { status: statusCode } = action.payload;
    action.payload = {
      ...action.payload,
      result,
      message,
      success: true,
      statusCode,
    };
  }
  return next(action);
};

export default successMiddleware;
