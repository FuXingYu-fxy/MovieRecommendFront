import axios from "axios"
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  timeout: 5000,
})

export default request;