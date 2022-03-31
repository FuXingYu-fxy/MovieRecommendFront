import type { RouteRecordRaw } from "vue-router";
import Layout from "@/Layout/index.vue";
const route: RouteRecordRaw = {
  path: "/recommend",
  name: "Recommend",
  component: Layout,
  children: [
    {
      path: "recommendByUser",
      name: "RecommendByUser",
      component: () => import("@/view/Recommend/RecommendByUser.vue"),
    },
    {
      path: "recommendByItem",
      name: "RecommendByItem",
      component: () => import("@/view/Recommend/RecommendByItem.vue"),
    },
  ],
};

export default route;
