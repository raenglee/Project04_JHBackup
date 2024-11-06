import axios from 'axios';
// import { GLOBAL_URL } from './util';

// const url = 'http://192.168.0.61:8080';
const url = 'http://localhost:8080';
// const url = GLOBAL_URL

export const authSocial = async () => {
  try {
    const res = await axios.get(`${url}/api/v1/auth/social`);
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const loginUsers = async () => {
  try {
    const res = await axios.get(`${url}/api/v1/users`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    // console.log(res.data);///
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
