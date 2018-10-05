import types from './index.js';
import axiosInstance from '../services/axiosInstance.js';


export const createRequest = request => ({
  type: types.CREATE_REQUEST,
  payload: axiosInstance().post('/users/requests', request)
});
export const updateRequest = request => ({
  type: types.UPDATE_REQUEST,
  payload: axiosInstance().put(`/users/requests/${request.id}`, request)
});

export const getAllRequest = () => ({
  type: types.LOAD_REQUEST,
  payload: axiosInstance().get('/users/requests/')
});
