import cookie from "js-cookie"

export function setToken(token: string) {
  // cookie 保存3天
  cookie.set('token', token, {expires: 3});
}

export function getToken() {
  return cookie.get('token');
}

export function removeToken() {
  cookie.remove("token");
}