import type { RouteRecordRaw } from "vue-router";
import Layout from "@/Layout/index.vue";

const route: RouteRecordRaw = {
  path: "/setting",
  component: Layout,
  name: "Setting",
  hidden: true,
  children: [
    {
      path: "system-setting",
      name: "SystemSetting",
      component: () => import("@/view/Setting/index.vue"),
    },
  ],
};

export default route