import { shallowReactive, markRaw } from "vue";
import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";
import {MdGlobe} from "@vicons/ionicons4";
import {UserAdmin} from "@vicons/carbon";
import Layout from "@/Layout/index.vue";

// 自动导入 modules/ 下的文件
const modules = import.meta.globEager("./modules/*.ts");
const modulesRoute = Object.keys(modules).map((path) => {
  return modules[path].default as RouteRecordRaw;
});

export const routes: RouteRecordRaw[] = shallowReactive([
  {
    path: "/",
    name: "Home",
    component: Layout,
    children: [
      {
        path: "",
        name: "Fxy",
        hidden: true,
        component: () => import("@/view/index.vue"),
      },
      {
        path: "explore",
        name: "Explore",
        component: () => import("@/view/explore/index.vue"),
        icon: MdGlobe
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/view/login/index.vue"),
    hidden: true,
  },
  ...modulesRoute,
]);

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/admin",
    name: "Admin",
    meta: {
      roles: ["admin"],
    },
    component: Layout,
    children: [
      {
        path: "",
        name: "AdminConfig",
        component: () => import("@/view/admin/index.vue"),
        icon: UserAdmin,
      },
    ],
  },
  {
    hidden: true,
    // vue3 中, 必须使用自定义正则表达式匹配所有路径
    path: "/:catchAll(.*)",
    // 重定向到首页
    redirect: {name: "Fxy"},
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
