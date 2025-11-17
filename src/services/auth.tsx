import axios from 'axios';
const API_BASE_URL = 'https://doctortime.inventstarts.com:5007/api/';

export async function userLogin(data: any) {
    const response = await axios.post(`${API_BASE_URL}Account/login`, data);
    return response.data;

}