import type { RouteRecordRaw } from "vue-router";
import Layout from "@/Layout/index.vue";

const route: RouteRecordRaw = {
  path: "/report",
  name: "Report",
  component: Layout,
  children: [
    {
      path: "report-table",
      name: "ReportTable",
      component: () => import("@/view/Report/index.vue")
    },
    {
      path: "report-edit",
      name: "ReportEdit",
      props: true,
      hidden: true,
      component: () => import("@/view/Report/edit.vue")
    }
  ]
}

export default route