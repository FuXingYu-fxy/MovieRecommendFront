import store from "@/store";
import router from "@/router";
import { getToken } from "@/app/cookie";
import type { RouteRecordRaw } from "vue-router";

// 白名单页面的
const whiteList = ["Login"];
router.beforeEach(async (to, from, next) => {
  const hasToken = getToken();
  if (hasToken) {
    if (to.name === "Login") {
      next({ name: "Fxy" });
    } else {
      const account = store.getters["user/account"];
      const userId = store.getters["user/userId"];
      if (account === "" || userId === -1) {
        // 没有获取到用户信息
        try {
          // 保存到了 vuex里
          await store.dispatch("user/getInfo");
          // 根据用户权限信息动态生成路由表
          const accessRoutes: RouteRecordRaw[] = await store.dispatch(
            "permission/generateAsyncRoutes",
            store.getters["user/roles"]
          );
          accessRoutes.forEach((route) => {
            router.addRoute(route);
          });
          next({ ...to, replace: true });
        } catch (error: any) {
          await store.dispatch("user/resetToken");
          console.log(error.message);
          next({ name: "Login", query: { redirect: to.name as string } });
        }
      } else {
        // 有token, 而且还有user info, 放行
        next();
      }
    }
  } else {
    // 没有token
    if (whiteList.includes(to.name as string)) {
      // 白名单, 放行
      next();
    } else {
      // 记录下目的路径, 稍后登录成功后直接跳转
      const redirect = to.name as string;
      next({ name: "Login", query: { redirect } });
    }
  }
});
