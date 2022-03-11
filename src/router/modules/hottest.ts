import type { RouteRecordRaw } from "vue-router";
import Layout from "@/Layout/index.vue";

const route: RouteRecordRaw = {
  path: "/hottest",
  name: "Hottest",
  component: Layout,
  children: [
    {
      path: "recommend",
      name: "HottestRecommend",
      component: () => import("@/components/Hottest/index.vue"),
    }
  ]
}

export default route;