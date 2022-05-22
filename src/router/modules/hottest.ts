import type { RouteRecordRaw } from "vue-router";
import Layout from "@/Layout/index.vue";
import {IosPeople} from "@vicons/ionicons4";

const route: RouteRecordRaw = {
  path: "/hottest",
  name: "Hottest",
  component: Layout,
  children: [
    {
      path: "hottestRecommend",
      name: "HottestRecommend",
      component: () => import("@/view/hottest/index.vue"),
      icon: IosPeople,
    }
  ]
}

export default route;