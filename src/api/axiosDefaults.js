import axios from "axios";

axios.defaults.baseURL = 'https://md82-drfapi-4f3d2bfe57a7.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true

export const axiosReq = axios.create();
export const axiosRes = axios.create();