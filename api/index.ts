import axios from "axios"

const API_ORIGIN = "https://need-compliments.herokuapp.com"

export const apiAxios = axios.create({
  baseURL: API_ORIGIN,
});

export * from "./compliments"
export * from "./goals"
export * from "./tasks"
export * from "./users"