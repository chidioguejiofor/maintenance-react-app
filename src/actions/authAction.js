import types from './index.js';
import axiosInstance from '../services/axiosInstance.js';


export const signUp = user => ({
  type: types.SIGN_UP,
  payload: axiosInstance().post('/auth/signup', user)
});

export const login = user => ({
  type: types.LOGIN,
  payload: axiosInstance()
    .post('/auth/login', { ...user, userType: 'client' })
});


export const engineerLogin = engineer => ({
  type: types.ENGINEER_LOGIN,
  payload: axiosInstance()
    .post('/auth/login', { ...engineer, userType: 'engineer' })
});

export const resetPassword = () => ({
  type: types.RESET_PASSWORD,
  payload: axiosInstance.post('/auth/reset-password')
});
