import request from "@/app/request";
import type {AxiosResponse} from "axios"
interface UserInfo {
  roles: string[];
  token: string;
  userId: string;
}
export function getUserInfo(requestBody: { token: string }) {
  // return request({
  //   url: '/getUserInfo',
  //   data: requestBody
  // })

  return new Promise<AxiosResponse<UserInfo>>((resolve) => {
    setTimeout(() => {
      const response = {
        data: {
          roles: ['admin', 'editor'],
        }
      }
      resolve(response);
    }, 2000);
  });
}

export function login(requestBody: {account: string, password: string}) {
  return request({
    url: '/user/login',
    data: requestBody,
    method: 'post'
  })
}