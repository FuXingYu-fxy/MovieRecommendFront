import type {_RouteRecordBase} from "vue-router"
import type {Component} from "vue";

declare module "vue-router" {
  interface _RouteRecordBase {
    /**
     * 是否在侧边栏显示路由
     */
    hidden?: boolean | string | undefined;
    /**
     * 如果二级菜单只有一个路由时，是否始终显示父路由
     */
    alwaysShow?: boolean | string | undefined;
    /**
     * 侧边栏菜单
     */
    icon?: Component;
  }
}