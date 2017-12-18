import axios from 'axios';

let base = 'http://127.0.0.1:8000';

export const requestLogin = params => { return axios.post(`${base}/login/`, params).then(res => res.data); };