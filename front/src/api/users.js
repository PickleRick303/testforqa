import axios from 'axios';

export const GET_USERS = async () => {
  const { data } = await axios.get('/users');
  return data;
};

export const ADD_USER = (data) => {
  return axios.post('/users', data);
};

export const UPDATE_USER = (data) => {
  return axios.put('/users', data);
};

export const DELETE_USER = (id) => {
  return axios.delete(`/users/${id}`);
};
