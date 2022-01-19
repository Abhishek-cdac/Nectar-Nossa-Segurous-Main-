import axios from "axios";

export const baseurl =  "http://159.65.145.21:3001";

// "http://2665-103-246-41-82.ngrok.io"
// "https://8170-103-246-40-178.ngrok.io";
const Token =  localStorage.getItem('token')
console.log('Header',Token)
const header = () => ({
  Authorization:localStorage.getItem('token')
  ,
});

export const doGet = async (path) => {
  const response = await axios.get(`${baseurl}/${path}`, {
    headers: header(),
  });

  return response.data;
};

export const doPost = async (path, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`${baseurl}/${path}`, data, {
        headers: header(),
      });
      if ([200, 201].includes(response.status)) {
        return resolve(response);
      }
      return reject(response);
    } catch (error) {
      return reject(error);
    }
  });
};

export const doPut = async (path, data) => {
  return new Promise(async (resolve, reject) => {
    const response = await axios.put(`${baseurl}/${path}`, data, {
      headers: header(),
    });

    if ([200, 201].includes(response.status)) {
      return resolve(response);
    }

    return reject(response);
  });
};

export const doDelete = async (path, data) => {
  return new Promise(async (resolve, reject) => {
    const response = await axios.delete(`${baseurl}/${path}`, {
      headers: header(),
      data,
    });

    if ([200, 201].includes(response.status)) {
      return resolve(response);
    }

    return reject(response);
  });
};
