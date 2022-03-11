import { h, CSSProperties } from "vue";
import { RouteRecordName, RouterLink } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import type { MenuOption } from "naive-ui";
import {routeNameMap} from "@/dicts/index"


export function useNaiveUiMenuOptions(routes: RouteRecordRaw[]) {
  if (routes && routes.length) {
    return routes.map(traverseRoute)
  }
  return [];
}

export function useRailStyle(checkedColor = "#d03050", uncheckedColor = "#2080f0") {
  return ({ focused, checked }: { focused: boolean; checked: boolean }) => {
    const style: CSSProperties = {};
    if (checked) {
      style.background = checkedColor;
      if (focused) {
        style.boxShadow = "0 0 0 2px #d0305040";
      }
    } else {
      style.background = uncheckedColor;
      if (focused) {
        style.boxShadow = "0 0 0 2px #2080f040";
      }
    }
    return style;
  };
}

function traverseRoute(routes: RouteRecordRaw) {
  const menu: MenuOption = {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: routes.name || "no name"
          },
        },
        { default: () => routes.name ? routeNameMap[routes.name as keyof (typeof routeNameMap)] || "no name" : "no name"  }
      ),
    key: routes.path,
  };
  if (routes.children && routes.children.length) {
    menu.children = [];
    for (let i = 0; i < routes.children.length; i++) {
      const item = routes.children[i]
      if (item.hidden) {
        // 侧边栏里不显示带有 hidden 的属性
        continue;
      }
      menu.children.push(traverseRoute(item))
    }
    // 如果二级菜单只有一个路由, 默认只显示这个子路由
    // 在路由配置里 awalysShow: true, 覆盖此行为
    if (routes.children.length === 1 && !routes.alwaysShow) {
      return menu.children[0]
    }
  }
  return menu;
}