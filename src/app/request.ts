import axios from "axios"
import QuickLRU from "quick-lru"
import type { AxiosRequestConfig } from "axios"
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  timeout: 5000,
})
const lru = new QuickLRU({
  maxSize: 100,
  // 缓存5分钟
  // TODO change
  maxAge: 30
})
export default function request<T = any>(requestConfig: AxiosRequestConfig, update?: boolean): Promise<T> {
  let key = requestConfig.url + JSON.stringify(requestConfig.params) + JSON.stringify(requestConfig.data)
  if (lru.has(key) && !update) {
    return Promise.resolve(lru.get(key) as T);
  }
  return api(requestConfig).then(res => res.data) as Promise<T>;
};