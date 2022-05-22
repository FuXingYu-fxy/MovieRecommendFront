import type { RouteRecordRaw } from "vue-router";
import Layout from "@/Layout/index.vue";
import {Recommend, UserFavorite} from "@vicons/carbon";
import {MdContacts} from "@vicons/ionicons4";
import {SparklesOutline} from "@vicons/ionicons5"

const route: RouteRecordRaw = {
  path: "/recommend",
  name: "Recommend",
  component: Layout,
  icon: Recommend,
  children: [
    {
      path: "recommendByUser",
      name: "RecommendByUser",
      component: () => import("@/view/recommend/RecommendByUser.vue"),
      icon: MdContacts
    },
    {
      path: "recommendByItem",
      name: "RecommendByItem",
      component: () => import("@/view/recommend/RecommendByItem.vue"),
      icon: SparklesOutline,
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
