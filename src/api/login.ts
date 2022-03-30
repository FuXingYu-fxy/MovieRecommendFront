import request from "@/app/request";
import type {AxiosResponse} from "axios"
interface Response {
  data: {
    roles: string[];
  }
}

export function getUserInfo(requestBody: { token: string }) {
  // return request({
  //   url: '/getUserInfo',
  //   data: requestBody
  // })

  return new Promise<Response>((resolve) => {
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

export function login(requestBody: {id: number, passwd: string}) {
  return request({
    url: '/login',
    data: requestBody,
    method: 'post'
  })
}