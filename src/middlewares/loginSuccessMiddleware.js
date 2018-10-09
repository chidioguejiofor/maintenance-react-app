const loginMiddleware = () => next => (action) => {
  if (action.type.includes('LOGIN_SUCCESS')) {
    const { data: user } = action.payload.data;
    localStorage.token = user.token;
    localStorage.username = user.username;
    localStorage.email = user.email;
  }
  return next(action);
};

export default loginMiddleware;
