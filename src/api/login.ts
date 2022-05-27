import request from "@/app/request";
interface UserInfo {
  userId: number;
  account: string;
  userName: string;
  roles: string[];
  pass: boolean;
}
export function getUserInfo<T = UserInfo>(requestBody: { token: string }) {
  return request<T>({
    url: '/user/info',
    data: requestBody,
    method: 'post'
  })
}

interface RequestBody {
  account: string;
  password: string;
}
export function login<T = any>(requestBody: RequestBody) {
  return request<T>({
    url: '/user/login',
    data: requestBody,
    method: 'post'
  })
}

export function registry<T = any>(requestBody: RequestBody) {
  return request<T>({
    url: '/user/registry',
    data: requestBody,
    method: 'post',
  })
}