import { Route } from 'react-router-dom';
import Homepage from '../views/Homepage';
import Signup from '../views/auth/Signup';
import Login from '../views/auth/Login';
import ResetPassword from '../views/auth/ResetPassword';
import Dashboard from '../views/dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

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
    routePath: '/admin/login',
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
    type: ProtectedRoute,
    routePath: '/dashboard',
    component: Dashboard,
    exact: true,
  },
  {
    type: AdminRoute,
    routePath: '/dashboard/admin',
    component: Dashboard,
    exact: true,
  },

];
