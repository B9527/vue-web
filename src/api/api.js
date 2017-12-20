import axios from 'axios';

let base = 'http://127.0.0.1:8000';
let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }

export const requestLogin = params => { return axios.post(`${base}/login/`, params).then(res => res.data); };
export const importUpload = params => { return axios.post(`${base}/import-data/upload/`, params, config).then(res => res.data); };
export const getTaskList = params => { return axios.get(`${base}/import-data/tasks/list/`,params).then(res => res.data); };
export const deleteTaskList = params => {return axios.post(`${base}/import-data/delete_task_view/`, params).then(res => res.data)};
export const ChangeStatusSubmit = params => {return axios.post(`${base}/import-data/change_status_submit/`, params).then(res => res.data)};
export const getTaskRecord = params => { return axios.post(`${base}/import-data/task/record/`,params).then(res => res.data); };