import type { Module } from "vuex";
import RootStateTypes from "@/store/interface";
import { toRaw } from "vue";
import { asyncRoutes, routes } from "@/router";
import { RouteRecordRaw } from "vue-router";

export interface Permission {
  accessRoutes: RouteRecordRaw[];
  constantRoutes: RouteRecordRaw[];
}

const permission: Module<Permission, RootStateTypes> = {
  namespaced: true,
  state: {
    accessRoutes: [],
    constantRoutes: routes,
  },
  getters: {
    accessRoutes: (state) => {
      return toRaw(state.constantRoutes)
    }
  },
  mutations: {
    SET_ROUTES(state, hasPermissionRoutes: RouteRecordRaw[]) {
      state.accessRoutes = hasPermissionRoutes;
      state.constantRoutes = routes.concat(hasPermissionRoutes);
    },
  },
  actions: {
    async generateAsyncRoutes({commit}, roles: string[]) {
      const result = asyncRoutes.filter((item) => {
        return hasPermission(item, roles);
      });
      commit('SET_ROUTES', result);
      return result;
    }
  }
}

function hasPermission(route: RouteRecordRaw, roles: string[]): boolean {
  // 管理员拥有所有页面的访问权限
  if (roles.includes('admin')) {
    return true;
  }
  // 没有 roles 的页面不需要验证权限
  if (route.meta && route.meta.roles) {
    return (route.meta.roles as string[]).some((item) => roles.includes(item));
  }
  return true;
}

export default permission;