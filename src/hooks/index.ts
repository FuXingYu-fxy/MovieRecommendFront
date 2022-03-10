import { h, CSSProperties } from "vue";
import { RouterLink } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import type { MenuOption } from "naive-ui";
export function useNaiveUiMenuOptions(routes: RouteRecordRaw[]) {
  if (!routes || !routes.length || !routes[0].children) {
    return [];
  }
  return routes[0].children.map(traverseRoute);
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
            name: routes.name || "no name",
          },
        },
        { default: () => routes.name || "没有配置" }
      ),
    key: routes.path,
  };
  if (routes.children && routes.children.length) {
    menu.children = routes.children.map(traverseRoute);
  }
  return menu;
}