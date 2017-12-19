import axios from 'axios';

let base = 'http://127.0.0.1:8000';
let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }

export const requestLogin = params => { return axios.post(`${base}/login/`, params).then(res => res.data); };
export const importUpload = params => { return axios.post(`${base}/login/`, params, config).then(res => res.data); };