import axios from 'axios';


const axiosInstance = () => {
  const apiHost = 'https://chidiebere-maintenance-api.herokuapp.com/api/v1';
  return axios.create({
    baseURL: apiHost,

    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.token,
      'x-access-token': localStorage.token
    }
  });
};


export default axiosInstance;
