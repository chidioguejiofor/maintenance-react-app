import { Route } from 'react-router-dom';
import Homepage from './Homepage';
import Signup from './auth/Signup';
import Login from './auth/Login';
import ResetPassword from './auth/ResetPassword';
import Dashboard from './dashboard/Dashboard';


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
