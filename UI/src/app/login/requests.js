const axios = require('axios');
const qs = require('qs');

const API_BASE_URL = 'http://localhost:8000/api/v1/aruba';
const AUTH_TOKEN = 'Bearer ';

export const loginReq = async (username, password) => {
  console.log('Logging in...');
  let data = qs.stringify({
    username: 'test',
    password: 'test',
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://localhost:8000/api/v1/login`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  };

  try {
    //const response = await axios.request(config);
    const response = {
      success: true,
      data: { accessToken: '258320234709234' },
    };
    console.log(JSON.stringify(response.data));
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('Failed login');
  }
};
