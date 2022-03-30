import store from "@/store";
import router, { asyncRoutes, routes } from "@/router";
import { getToken } from "@/app/cookie";
import type { RouteRecordRaw } from "vue-router";

// setTimeout(() => {
//   asyncRoutes.forEach((route) => {
//     router.addRoute(route);
//   });
//   routes.push(...asyncRoutes);
// }, 2000);

// 白名单页面的
// const whiteList = ["Login", "Introduce"];
// router.beforeEach(async (to, from, next) => {
//   // TODO 改回来
//   const hasToken = getToken();
//   // let hasToken = "fHv3H1";
//   if (hasToken) {
//     if (to.name === "Login") {
//       next({ name: "Introduction" });
//     } else {
//       const roles = store.getters["user/roles"]
//       const hasRoles =  roles && roles.length > 0;
//       console.log(hasRoles)
//       if (!hasRoles) {
//         // 没有用户权限信息
//         try {
//           const { roles } = await store.dispatch("user/getInfo");
//           // 根据用户权限信息动态生成路由表
//           const accessRoutes: RouteRecordRaw[] = await store.dispatch(
//             "user/generateAsyncRoutes",
//             roles
//           );
//           accessRoutes.forEach((route) => {
//             router.addRoute(route);
//           });
//           next({ ...to, replace: true });
//         } catch (error: any) {
//           await store.dispatch("user/resetToken");
//           console.log(error.message || "has Error");
//           next({ name: "Login", query: { redirect: to.name as string } });
//         }
//       } else {
//         // 有token, 而且还有 roels, 放行
//         next();
//       }
//     }
//   } else {
//     // 没有token
//     if (whiteList.includes(to.name as string)) {
//       // 白名单, 放行
//       next();
//     } else {
//       // 记录下目的路径, 稍后登录成功后直接跳转
//       const redirect = to.name as string;
//       next({ name: "Login", query: {redirect} });
//     }
//   }
// });
