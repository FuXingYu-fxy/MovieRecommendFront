import type { Module } from "vuex";
import RootStateTypes from "@/store/interface";
import { getToken, removeToken } from "@/app/cookie";
import { getUserInfo } from "@/api/login";
interface Info {
  userId?: number;
  account?: string;
  userName?: string;
}
export interface User {
  roles: string[];
  token: string | undefined;
  info: Info;
}
const user: Module<User, RootStateTypes> = {
  namespaced: true,
  state: {
    token: getToken(),
    roles: [],
    info: {
      account: "",
      userId: -1,
      userName: "",
    },
  },
  getters: {
    userId: (state) => state.info.userId,
    token: (state) => state.token,
    account: (state) => state.info.account,
    userName: (state) => state.info.userName,
    roles: (state) => state.roles,
  },
  mutations: {
    SET_ROLES(state, roles: Array<string>) {
      state.roles = roles;
    },
    SET_TOKEN(state, token: string) {
      state.token = token;
    },
    SET_USER_INFO(state, payload: Info) {
      Object.assign(state.info, payload)
    },
  },
  actions: {
    async getInfo({ commit, state }) {
      if (!state.token) {
        throw new Error("未获取到token");
      }
      try {
        const {pass, roles, ...rest} = await getUserInfo({
          token: state.token,
        });
        if (!pass) {
          throw Error("用户不存在");
        }
        commit("SET_USER_INFO", rest);
        commit("SET_ROLES", roles);
      } catch (err: any) {
        throw Error(err.message || "未知的请求错误!!!");
      }
    },
    async resetToken({ commit }) {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
    },
    async resetUserInfo({ commit }) {
      commit("SET_USER_INFO", {
        userId: -1,
        userName: "",
        account: ""
      } as Info);
    },
  },
};

export default user;
