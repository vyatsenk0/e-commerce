import axios from 'axios';

const BASE_URL = 'https://gifted-wrap-seal.cyclic.app/api'
const persistedData = JSON.parse(localStorage.getItem("persist:root"));

const TOKEN =
  persistedData &&
  persistedData.currentUser &&
  persistedData.currentUser.accessToken;

  
export const publicRequest = axios.create({
    baseURL: BASE_URL,
})


export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token: `${TOKEN}` },
})