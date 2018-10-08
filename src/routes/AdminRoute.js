
import PropTypes from 'prop-types';
import routesHelper from '../helpers/routesHelper';
/**
 *this checks if the logged in user is the admin
 * @returns {boolean} true when the logged in user is an admin
 */
export const isAdmin = () => !!(
  localStorage.admin === 'true' && localStorage.token);


const AdminRoute = ({ component: Component,
  ...rest }) => routesHelper(isAdmin(), Component, rest, '/');


AdminRoute.propTypes = {
  component: PropTypes.element.isRequired,
};
export default AdminRoute;
