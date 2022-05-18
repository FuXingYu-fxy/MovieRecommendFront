import { shallowReactive } from "vue";
import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";
import Layout from "@/Layout/index.vue";

// 自动导入 modules/ 下的文件
const modules = import.meta.globEager("./modules/*.ts");
const modulesRoute = Object.keys(modules).map((path) => {
  return modules[path].default as RouteRecordRaw;
});

export const routes: Array<RouteRecordRaw> = shallowReactive([
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
        path: "introduction",
        name: "Introduction",
        component: () => import("@/view/introduction.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/view/login/index.vue"),
  },
  ...modulesRoute,
]);

export const asyncRoutes: Array<RouteRecordRaw> = [
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
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
