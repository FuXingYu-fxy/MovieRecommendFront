import type { RouteRecordRaw } from "vue-router";
import Layout from "@/Layout/index.vue";

const route: RouteRecordRaw = {
  path: "/profile",
  component: Layout,
  name: "Profile",
  hidden: true,
  children: [
    {
      path: "edit-profile",
      name: "EditProfile",
      component: () => import("@/view/edit-profile/index.vue"),
    },
  ],
};

export default route