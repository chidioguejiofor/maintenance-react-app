
import React from 'react';
import { Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

/**
 *this checks if the logged in user is the admin
 * @returns {boolean} true when the logged in user is an admin
 */
export const isAdmin = () => localStorage.admin;

const AdminRoute = ({ component: Component, ...rest }) => (
  <ProtectedRoute
    {...rest}
    render={props => (isAdmin()
      ? <Component {...props} /> : <Redirect to="/" />)}
  />
);


export default AdminRoute;
