import request from "@/app/request";

export function getUserPreference<
  T = { id: number; tag_name: string }[]
>(requestBody: { userId: number }) {
  return request<T>({
    url: "/user/preference",
    method: "POST",
    data: requestBody,
  });
}

interface UpdatePreferenceBody {
  userId: number;
  preference: number[];
}

export function updatePreference(requestBody: UpdatePreferenceBody) {
  return request({
    url: "/user/updatePreference",
    method: "POST",
    data: requestBody,
  });
}
interface UpdateUserInfo {
  userId: number;
  userInfo:
    | {
        password: string;
        userName?: string;
      }
    | {
        password?: string;
        userName: string;
      };
}
export function updateUserInfo(requestBody: UpdateUserInfo) {
  return request({
    url: "/user/updateUserInfo",
    method: "POST",
    data: requestBody,
  });
}


export function isPasswordValid(requestBody: {userId: number; password: string}) {
  return request<{pass: boolean;}>({
    url: "/user/checkPassword",
    method: "POST",
    data: requestBody,
  })
}