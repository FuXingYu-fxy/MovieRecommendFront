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
      component: () => import("@/view/recommend/RecommendByUser.vue"),
    },
    {
      path: "recommendByItem",
      name: "RecommendByItem",
      component: () => import("@/view/recommend/RecommendByItem.vue"),
    },
    {
      path: "movie-details",
      name: "MovieDetails",
      hidden: true,
      props: true,
      component: () => import("@/view/recommend/MovieDetails.vue")
    }
  ],
};

export default route;
