import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";
import Layout from "@/Layout/index.vue";
import route from "@/router/modules/hottest";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/introduction",
    name: 'Home',
    component: Layout,
    children: [
      {
        path: "introduction",
        name: "Introduction",
        component: () => import("@/components/index.vue")
      }
    ]
  },
  route
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});


export default router;