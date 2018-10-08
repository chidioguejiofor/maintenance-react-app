
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

/**
 *
 * @param {boolean} condition this is the condition which would be checked to
 * see if to render the Component ro a redirect
 *  @param {object} Component the component to be rendered when the condition
 * passes
 * @param {object} otherProps contains the other properties of the component to
 * be rendered
 * @param {string} redirect the route to redirect to when the condition fails

 * @returns {JSX} content to be rendered
 */
const routesHelper = (
  condition,
  Component, otherProps, redirect = '/'
) => (<Route
  {...otherProps}
  render={props => (condition ? (<Component {...props} />)
    : (<Redirect to={redirect} />))}
/>
);

export default routesHelper;
