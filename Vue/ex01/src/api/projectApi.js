import axios from 'axios';

const url = 'http://localhost:8080/api/v1/boards';

export const saveProject = async (formData) => {
  console.log('여기오나');
  try {
    const res = await axios.post(`${url}`, formData, {
      Headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(res.data);
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const deleteProject = async (board_id) => {
  try {
    const res = await axios.delete(`${url}/${board_id}`);
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const patchProject = async (board_id) => {
  try {
    const res = await axios.patch(`${url}/${board_id}`);
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const listProject = async () => {
  try {
    const res = await axios.get(`${url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};
