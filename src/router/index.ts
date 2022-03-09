import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";
import Layout from "../Layout/index.vue";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashbord",
    children: [
      {
        path: "dashbord",
        name: "Dashbord",
        component: () => import("@/components/Dashbord.vue"),
      },
      {
        path: "fitsr",
        name: "First",
        component: () => import("@/components/First.vue"),
      },
      {
        path: "second",
        name: "Second",
        component: () => import("@/components/Second.vue"),
      },
      {
        path: "a",
        name: "A",
        component: () => import("@/components/A.vue"),
      },
      {
        path: "b",
        name: "B",
        component: () => import("@/components/B.vue"),
      },
      {
        path: "fitsr",
        name: "First",
        component: () => import("@/components/First.vue"),
      },
      {
        path: "second",
        name: "Second",
        component: () => import("@/components/Second.vue"),
      },
      {
        path: "a",
        name: "A",
        component: () => import("@/components/A.vue"),
      },
      {
        path: "b",
        name: "B",
        component: () => import("@/components/B.vue"),
      },
      {
        path: "fitsr",
        name: "First",
        component: () => import("@/components/First.vue"),
      },
      {
        path: "second",
        name: "Second",
        component: () => import("@/components/Second.vue"),
      },
      {
        path: "a",
        name: "A",
        component: () => import("@/components/A.vue"),
      },
      {
        path: "b",
        name: "B",
        component: () => import("@/components/B.vue"),
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
