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
    {
      path: "user-profile",
      name: "UserProfile",
      component: () => import("@/view/profile/index.vue"),
    }
  ],
};

export default route