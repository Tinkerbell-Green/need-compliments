import axios from "axios"

const API_ORIGIN = "https://need-compliments.herokuapp.com"

export const apiAxios = axios.create({
  baseURL: API_ORIGIN,
  timeout: 3000
});