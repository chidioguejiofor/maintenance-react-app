import types from './index.js';
import axiosInstance from '../services/axiosInstance.js';


export const signUp = user => ({
  type: types.SIGN_UP,
  payload: axiosInstance().post('/auth/signup', user)
});

export const login = user => ({
  type: types.LOGIN,
  payload: axiosInstance()
    .post('/auth/login', user)
});

export const resetPassword = () => ({
  type: types.RESET_PASSWORD,
  payload: axiosInstance.post('/auth/reset-password')
});
