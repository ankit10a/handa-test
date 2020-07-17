import axios from 'axios';
import {server} from "./keys";

let token = localStorage.getItem('token');

export const userInstance = axios.create({
    baseURL:server+"/user",
    withCredentials:true,
    headers:{'x-custom-header':token || ""}
})