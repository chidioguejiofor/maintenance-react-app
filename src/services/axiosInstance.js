import axios from 'axios';


const axiosInstance = () => {
  const apiHost = 'https://chidiebere-maintenance-api.herokuapp.com/api/v1';
  let token = '';
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
  }
  return axios.create({
    baseURL: apiHost,

    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  });
};


export default axiosInstance;
