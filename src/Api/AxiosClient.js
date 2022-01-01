import axios from 'axios';
import queryString from 'query-string';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {REACT_APP_TOUR_MANAGER_API_KEY} = process.env;
console.log(REACT_APP_TOUR_MANAGER_API_KEY);
const axiosClient = axios.create({
  baseURL: 'http://192.168.1.81:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async config => {
  // Handle token here ...
  const validateToken = AsyncStorage.getItem('accessTokenCustomer') !== null;
  let token = '';
  if (validateToken) {
    await AsyncStorage.getItem('accessTokenCustomer').then(value => {
      if (value !== null) {
        //console.log(value);
        var obj = JSON.parse(value);
        token = obj.accessToken;
      }
    });
  }
  config.headers['Authorization'] = 'bearer ' + token;
  return config;
});

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    // console.log(response.status);
    return response.status;
  },
  error => {
    throw error;
  },
);

export default axiosClient;
