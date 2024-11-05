// import axios from 'axios';

// // const url = 'http://192.168.0.61:8080/api/v1/boards';
// const url = 'http://localhost:8080/api/v1/boards';

// export const saveProject = async () => {
//   console.log('저장axios 호출');
//   try {
//     const res = await axios.post(
//       `${url}`,
//       {
//         title: 'string',
//         content: 'string',
//         imageUrl: 'string',
//         projectPeriod: 1,
//         location: 'SEOUL',
//         startDate: '2024-11-04',
//         recruitEndDate: '2024-11-04',
//         boardTechStackList: [
//           {
//             techStackName: 'JAVA'
//           }
//         ],
//         boardPositionList: [
//           {
//             positionName: 'BackEnd',
//             requiredCount: 5,
//             currentCount: 0
//           }
//         ]
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       }
//     );
//     console.log(res.data);
//     return res;
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// };

// export const deleteProject = async (board_id) => {
//   try {
//     const res = await axios.delete(`${url}/${board_id}`);
//     return res;
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// };

// export const patchProject = async (board_id) => {
//   try {
//     const res = await axios.patch(`${url}/${board_id}`);
//     return res;
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// };

// export const listProject = async (pageNumber = 1, pageSize = 16) => {
//   if (pageNumber == undefined) pageNumber = 0; // 예외방지

//   try {
//     const res = await axios.get(`${url}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
//     console.log(res);
//     return res.data;
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// };

// export const getTechstacks = async () => {
//   try {
//     const res = await axios.get(`${url}/techstacks`);
//     // console.log('getTechstacks axios호출: ', res);
//     return res.data.result;
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// };

// export const getPositions = async () => {
//   try {
//     const res = await axios.get(`${url}/positions`);
//     // console.log('getPositions axios호출: ', res);
//     return res;
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// };

// export const getLocation = async () => {
//   try {
//     const res = await axios.get(`${url}/locations`);
//     console.log('getLocations axios호출: ', res);
//     return res;
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// };
