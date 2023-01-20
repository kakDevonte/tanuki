import axios from 'axios';

const instance = axios.create({
  //baseURL: 'https://297349.simplecloud.ru/api/',
  //baseURL: 'http://localhost:4000/api/',
  baseURL: 'https://server.bulochkin.site/api/',
});

export const tanukiAPI = {
  getUser(id) {
    return instance.get(`users/${id}`);
  },
  updateUser(user) {
    return instance.put(`users/`, user);
  },
  createUser(user) {
    return instance.post(`users/`, user);
  },
  getUsers() {
    return instance.get(`users/`);
  },
  endGame() {
    return instance.get(`stats/end`);
  },
};
