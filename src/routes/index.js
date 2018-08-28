import { Route } from 'react-router-dom';
import Homepage from '../views/Homepage';
import Signup from '../views/auth/Signup';
import Login from '../views/auth/Login';
import ResetPassword from '../views/auth/ResetPassword';
import Dashboard from '../views/dashboard/Dashboard';


export default [
  {
    type: Route,
    routePath: '/',
    component: Homepage,
    exact: true,
  },
  {
    type: Route,
    routePath: '/signup',
    component: Signup,
    exact: true,
  },
  {
    type: Route,
    routePath: '/login',
    component: Login,
    exact: true,
  },
  {
    type: Route,
    routePath: '/reset-password',
    component: ResetPassword,
    exact: true,
  },

  {
    type: Route,
    routePath: '/dashboard',
    component: Dashboard,
    exact: true,
  },
];
