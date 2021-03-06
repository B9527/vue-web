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
export const cleanUpload = params => { return axios.post(`${base}/clean-data/upload/`, params, config).then(res => res.data); };
export const getCleanTaskList = params => { return axios.get(`${base}/clean-data/task/list/`,params).then(res => res.data); };
export const cleanStatusSubmit = params => {return axios.post(`${base}/clean-data/task/resubmit/`, params).then(res => res.data)};
export const cleanTaskDelete = params => {return axios.post(`${base}/clean-data/task/delete/`, params).then(res => res.data)};
export const CleanDetailGet = params => {return axios.get(`${base}/clean-data/task/detail/`, params).then(res => res.data)};
export const CleanDetailPost = params => {return axios.post(`${base}/clean-data/task/detail/`, params).then(res => res.data)};
export const CleanMapPost = params => {return axios.post(`${base}/clean-data/task/map_list/`, params).then(res => res.data)};
export const HiveTableList =  params => {return axios.get(`${base}/import-data/hive_table_list/`, params).then(res => res.data)};
export const HiveTableToCleanTask =  params => {return axios.post(`${base}/clean-data/htable_task/`, params).then(res => res.data)};
export const getCleanBase =  params => {return axios.get(`${base}/clean-data/clean_baseTrans/`, params).then(res => res.data)};
export const postCleanBase =  params => {return axios.post(`${base}/clean-data/clean_baseTrans/`, params).then(res => res.data)};
export const getCleanExtent =  params => {return axios.get(`${base}/clean-data/clean_extentTrans/`, params).then(res => res.data)};
export const postCleanExtent =  params => {return axios.post(`${base}/clean-data/clean_extentTrans/`, params).then(res => res.data)};
export const getCleanCustom=  params => {return axios.get(`${base}/clean-data/clean_customTrans/`, params).then(res => res.data)};
export const postCleanCustom =  params => {return axios.post(`${base}/clean-data/clean_customTrans/`, params).then(res => res.data)};
