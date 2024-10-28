import axios from 'axios';

const url = 'http://localhost:8080';

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
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};
