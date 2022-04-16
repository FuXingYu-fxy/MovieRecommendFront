import type { Module } from "vuex";
import RootStateTypes from "@/store/interface";
import {getToken, removeToken} from "@/app/cookie";
import { getUserInfo } from "@/api/login";
import { asyncRoutes } from "@/router";
import { RouteRecordRaw } from "vue-router";

export interface User {
  roles: string[];
  token: string | undefined;
  userId: string;
}

export function hasPermission(route: RouteRecordRaw, roles: string[]): boolean {
  if (route.meta && route.meta.roles) {
    return (route.meta.roles as string[]).some(item => roles.includes(item))
  }
  return true;
}

const user: Module<User, RootStateTypes> = {
  namespaced: true,
  state: {
    roles: ['editor'],
    token: getToken(),
    userId: '134',
  },
  getters: {
    roles: state => state.roles,
    userId: state => state.userId,
  },
  mutations: {
    SET_ROLE(state, roles) {
      state.roles = roles;
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_ID(state, userId) {
      state.userId = userId;
    }
  },
  actions: {
    async getInfo({commit, state}) {
      if (!state.token) {
        throw new Error('未获取到token')
      }
      try {
        const { data } = await getUserInfo({token: state.token})
        commit("SET_ROLE", data.roles);
        commit("SET_USER_ID", data.userId);
        return data.roles;
      } catch (err: any) {
        throw Error(err.message || '未知的请求错误!!!')
      }
    },
    async generateAsyncRoutes({commit}, roles: string[]) {
      // TODO 
      const result = asyncRoutes.filter(item => {
        return hasPermission(item, roles)
      })
      console.log(result)
      return result;
    },
    async resetToken({commit}) {
      commit("SET_TOKEN", "")
      commit("SET_ROLES", [])
      removeToken()
    }
  }
}


export default user;