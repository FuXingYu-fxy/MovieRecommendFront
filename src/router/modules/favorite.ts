import type { RouteRecordRaw } from "vue-router";
import {MdHeart} from "@vicons/ionicons4";
import Layout from "@/Layout/index.vue";

const route: RouteRecordRaw = {
  path: "/favorite",
  name: "Favorite",
  component: Layout,
  children: [
    {
      path: "favorite-movie",
      name: "FavoriteMovie",
      component: () => import("@/view/favorite/index.vue"),
      icon: MdHeart,
    },
  ]
}

export default route