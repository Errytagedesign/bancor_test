import Cookies from 'js-cookie';
import axios from 'axios';

const baseUrl = 'https://quizapi.laspg-online.com';

const baseAPI = axios.create({ baseURL: baseUrl });

baseAPI.interceptors.request.use(async (config) => {
  const userToken = Cookies.get('rancUserToken');
  // If userToken exists, set 'Authorization' and 'x-access-token' headers to the user token
  if (userToken) {
    config.headers['Authorization'] = `Bearer ${userToken}`;
    config.headers['x-access-token'] = userToken;
  }

  return config;
});

export default baseAPI;
