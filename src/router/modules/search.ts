import type { RouteRecordRaw } from "vue-router";
import Layout from "@/Layout/index.vue";

const route: RouteRecordRaw = {
  path: "/search",
  component: Layout,
  name: "Search",
  hidden: true,
  children: [
    {
      path: "search-result",
      name: "SearchResult",
      component: () => import("@/view/search/index.vue"),
    },
  ],
}

export default route;