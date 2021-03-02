import axios from 'axios';

const API_KEY = 'yH70Z5n0oU15qLEnrj0K';
const BASE = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';

const save = (name, score) => {
  axios.post(`${BASE}/${API_KEY}/scores`, {
    user: name,
    score,
  });
};
const get = () => axios.get(`${BASE}/${API_KEY}/scores`);

export { save, get };