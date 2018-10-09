
import React from 'react';
import { Route, Redirect } from 'react-router-dom';


/**
 *this checks if the user is logged in by checking for token in localStorage
 * @returns {boolean} true when user is logged in
 */
export const userLoggedIn = () => {
  if (typeof localStorage.token === 'string'
  && localStorage.token.length > 20) {
    return true;
  }
  return false;
};

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (userLoggedIn()
      ? <Component {...props} /> : <Redirect to="/login" />)}
  />
);


export default ProtectedRoute;
