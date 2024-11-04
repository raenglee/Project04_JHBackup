import axios from 'axios';

const url = 'http://localhost:8080/api/v1/boards';

export const saveProject = async (formData) => {
  console.log('저장axios 호출');
  try {
    const res = await axios.post(
      `${url}`,
      {
        title: 'string',
        content: 'string',
        imageUrl: 'string',
        projectPeriod: 1,
        location: 'SEOUL',
        startDate: '2024-11-04',
        recruitEndDate: '2024-11-04',
        boardTechStackList: [
          {
            techStackName: 'JAVA'
          }
        ],
        boardPositionList: [
          {
            positionName: 'BackEnd',
            requiredCount: 5,
            currentCount: 0
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
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
    const res = await axios.get(`${url}`);
    return res.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
