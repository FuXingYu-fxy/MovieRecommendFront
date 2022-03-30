import cookie from "js-cookie"

export function setToken(token: string) {
  cookie.set('token', token);
}

export function getToken() {
  return cookie.get('token');
}

export function removeToken() {
  cookie.remove("token");
}