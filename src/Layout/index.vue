<script lang="ts" setup>
import { NLayout, NLayoutContent, NLayoutHeader, NLayoutSider, NSwitch } from "naive-ui";
import Header from "@/Layout/Header.vue";
import Sidebar from "@/Layout/Sidebar.vue";
import AppMain from "@/Layout/AppMain.vue";
import { ref } from "vue";
const collapsed = ref(false);
</script>
<template>
  <n-layout class="app-wrapper">
    <n-layout-header class="app-header" bordered>
      <n-switch v-model:value="collapsed">fa</n-switch>
    </n-layout-header>
    <n-layout has-sider>
      <n-layout-sider
        bordered
        collapse-mode="transform"
        :collapsed="collapsed"
        :collapsed-width="48"
        :width="140"
        content-style="padding: 10px 0"
        @collapse="collapsed = true"
        @expand="collapsed = false"
        show-trigger="arrow-circle"
        class="app-sider"
        :native-scrollbar="false"
      >
        <Sidebar />
      </n-layout-sider>
      <n-layout-content class="app-content" content-style="padding: 24px;" :native-scrollbar="false">
        <AppMain />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style lang="scss">
$header-height: 48px;
.app-header {
  height: $header-height;
}

.app-content {
  height: calc(100vh - $header-height);
  border: 1px solid red;
}
.app-sider {
  height: calc(100vh - $header-height);
}
</style>
