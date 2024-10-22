import axios from "axios";

// const apiUrl: string = import.meta.env.API_URL || '';
const apiUrl: string = 'http://localhost:3000';
const apiVersion = 'v1';

// const token = getJwtToken();

export const api = axios.create({
    baseURL: apiUrl + '/' + apiVersion + '/',
    // headers: {
    //     Authorization: 'Bearer ' + token
    // }
})
