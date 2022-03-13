import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";
import store from "@/store/index"
import Layout from "@/Layout/index.vue";

// 自动导入 modules/ 下的文件
const modules = import.meta.globEager("./modules/*.ts");
const modulesRoute = Object.keys(modules).map(path => {
  return modules[path].default as RouteRecordRaw
})

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/introduction",
    name: 'Home',
    component: Layout,
    children: [
      {
        path: "introduction",
        name: "Introduction",
        component: () => import("@/view/index.vue")
      }
    ]
  },
  ...modulesRoute
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

router.beforeEach((to, from, next) => {
  // 记录下来源 url 
  store.commit({
    type: "UPDATE_ORIGINAL_PATH",
    path: to.path
  })
  next();
})

export default router;