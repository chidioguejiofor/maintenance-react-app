
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

/**
 *this checks if the logged in user is the admin
 * @returns {boolean} true when the logged in user is an admin
 */
export const isAdmin = () => !!(localStorage.admin && localStorage.token);

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAdmin() ? (<Component {...props} />)
      : (<Redirect to="/" />))}
  />
);


export default AdminRoute;
