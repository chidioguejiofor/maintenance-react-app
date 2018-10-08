const loginMiddleware = () => next => (action) => {
  if (action.type.includes('LOGIN_SUCCESS')) {
    const { data: user } = action.payload.data;
    localStorage.token = user.token;
    localStorage.username = user.username;
    localStorage.email = user.email;
    localStorage.admin = action.type.includes('ENGINEER_LOGIN_SUCCESS');
  }
  return next(action);
};

export default loginMiddleware;
