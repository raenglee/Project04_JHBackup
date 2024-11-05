import axios from 'axios';

// const url = 'http://192.168.0.61:8080/api/v1/boards';
const url = 'http://localhost:8080/api/v1/boards';

export const saveProject = async (formData) => {
  console.log('저장axios 호출');
  // console.log('토큰: ', localStorage.getItem('token'));
  try {
    const res = await axios.post(`${url}`, 
      {
        title: formData.title,
        content: formData.content,
        imageUrl: formData.imageUrl, // 사용자가 입력한 이미지 URL
        projectPeriod: formData.projectPeriod,
        location: formData.location,
        startDate: formData.startDate,
        recruitEndDate: formData.recruitEndDate,
        boardTechStackList: formData.boardTechStackList, // 사용자가 선택한 기술 스택 리스트
        boardPositionList: formData.boardPositionList // 사용자가 입력한 포지션 리스트
      }, 
      {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(res.data);
    return res;
  } catch (e) {
    console.log('에러 발생:', e.response ? e.response.data : e.message);
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

export const listProject = async (pageNumber = 1, pageSize = 16) => {
  if (pageNumber == undefined) pageNumber = 0; // 예외방지

  try {
    const res = await axios.get(`${url}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getTechstacks = async () => {
  try {
    const res = await axios.get(`${url}/techstacks`);
    // console.log('getTechstacks axios호출: ', res);
    return res.data.result;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getPositions = async () => {
  try {
    const res = await axios.get(`${url}/positions`);
    // console.log('getPositions axios호출: ', res);
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getLocation = async () => {
  try {
    const res = await axios.get(`${url}/locations`);
    // console.log('getLocations axios호출: ', res);
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};
