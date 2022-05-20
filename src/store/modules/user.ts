import type { Module } from "vuex";
import RootStateTypes from "@/store/interface";
import { getToken, removeToken } from "@/app/cookie";
import { getUserInfo } from "@/api/login";
// import { asyncRoutes } from "@/router";
import { RouteRecordRaw } from "vue-router";
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

export function hasPermission(route: RouteRecordRaw, roles: string[]): boolean {
  if (route.meta && route.meta.roles) {
    return (route.meta.roles as string[]).some((item) => roles.includes(item));
  }
  return true;
}

const user: Module<User, RootStateTypes> = {
  namespaced: true,
  state: {
    roles: ["editor"],
    token: getToken(),
    info: {
      account: "",
      userId: -1,
      userName: "",
    },
  },
  getters: {
    roles: (state) => state.roles,
    userId: (state) => state.info.userId,
    token: (state) => state.token,
    account: (state) => state.info.account,
    userName: (state) => state.info.userName,
  },
  mutations: {
    SET_ROLES(state, roles: Array<string>) {
      state.roles = roles;
    },
    SET_TOKEN(state, token: string) {
      state.token = token;
    },
    // SET_USER_ID(state, userId: number) {
    //   state.userId = userId;
    // },
    // SET_USER_ACCOUNT(state, account: string) {
    //   state.account = account;
    // },
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
        const {pass, ...rest} = await getUserInfo({
          token: state.token,
        });
        if (!pass) {
          throw Error("用户不存在");
        }
        commit("SET_USER_INFO", rest);
      } catch (err: any) {
        throw Error(err.message || "未知的请求错误!!!");
      }
    },
    // async generateAsyncRoutes({ commit }, roles: string[]) {
    //   // TODO
    //   const result = asyncRoutes.filter((item) => {
    //     return hasPermission(item, roles);
    //   });
    //   console.log(result);
    //   return result;
    // },
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
