import axios from 'axios';

export const GET_USERS = async () => {
  const { data } = await axios.get('http://localhost:3000/users');
  return data;
};

export const ADD_USER = (data) => {
  return axios.post('http://localhost:3000/users', data);
};

export const UPDATE_USER = (data) => {
  return axios.put('http://localhost:3000/users', data);
};

export const DELETE_USER = (id) => {
  return axios.delete(`http://localhost:3000/users/${id}`);
};
