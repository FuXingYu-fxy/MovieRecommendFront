<script lang="ts" setup>
import { NLayout, NLayoutContent, NLayoutHeader, NLayoutSider } from "naive-ui";
import Sidebar from "@/Layout/Sidebar.vue";
import AppMain from "@/Layout/AppMain.vue";
import useStore from "@/hooks/store";
import Header from "./Header.vue";
import { computed } from "vue";
const store = useStore();
const collapsed = computed<boolean>({
  get() {
    return store.getters.collapsed;
  },
  set(val) {
    store.commit("TOGGLE_COLLAPSED", val);
  },
});

</script>
<template>
  <!-- 利用了 absolute + (top/right/bottom/left)=0 铺满全屏 -->
  <n-layout class="app-wrapper" position="absolute">
    <!-- header 48px -->
    <n-layout-header class="app-header">
      <Header v-model:collapsed="collapsed" />
    </n-layout-header>
    <!-- top 48px -->
    <n-layout has-sider class="app-content" position="absolute">
      <n-layout-sider
        @expand="collapsed = false"
        @collapse="collapsed = true"
        :bordered="!collapsed"
        :collapsed="collapsed"
        :collapsed-width="48"
        :native-scrollbar="false"
        :class="collapsed && 'app-sider-collapsed'"
        collapse-mode="width"
        show-trigger="arrow-circle"
      >
        <Sidebar />
      </n-layout-sider>
      <n-layout-content
        content-style="padding: 24px;"
        :native-scrollbar="false"
      >
        <AppMain />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style lang="scss" scoped>
$header-height: 48px;
.n-layout-header.app-header {
  height: $header-height;
  background: rgb(0, 0, 0);
}

.n-layout.app-content {
  top: $header-height;
}

.n-layout-sider.app-sider-collapsed {
  background: #101014;
}
</style>
