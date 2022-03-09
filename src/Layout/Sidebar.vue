<script lang="ts" setup>
import { NMenu, MenuOption } from "naive-ui";
import {ref, h, onMounted} from "vue";
import {routes} from "@/router/index";
import { RouteRecordRaw, RouterLink } from "vue-router";
// 
const activeMenu = ref("Dashbord");
const traverse = (routes: RouteRecordRaw) => {
  const menu: MenuOption = {
    label: () => h(
      RouterLink,
      {
        to: {
          name: routes.name || "no name"
        }
      },
      { default: () => routes.name || "没有配置"}
    ),
    key: routes.name as string
  }
  if (routes.children && routes.children.length) {
    menu.children = routes.children.map(traverse)
  }
  return menu;
}
const menuOptions = routes[0].children && routes[0].children.map(traverse)
onMounted(() => {
  console.log(routes)
})
</script>
<template>
<n-menu mode="vertical" v-model:value="activeMenu" :options="menuOptions" />
</template>

<style lang="scss">
</style>