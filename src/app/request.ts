import axios from "axios";
import QuickLRU from "quick-lru";
import type { AxiosRequestConfig } from "axios";
interface ResponseMsg {
  code: number;
  message: string;
  data: any;
}
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  timeout: 20000,
});
const lru = new QuickLRU({
  maxSize: 80,
  // 缓存5分钟
  maxAge: 1000 * 60 * 5,
});

export default function request<T = any>(
  requestConfig: AxiosRequestConfig,
  update?: boolean
): Promise<T> {
  let key =
    requestConfig.url +
    JSON.stringify(requestConfig.params)
  // 只缓存get请求
  if (lru.has(key) && !update && ["get", "GET", undefined].includes(requestConfig.method)) {
    return Promise.resolve(lru.get(key) as T);
  }
  return api(requestConfig).then((res) => {
    const result = (res.data as ResponseMsg).data;
    lru.set(key, result);
    return result;
  }) as Promise<T>;
}
