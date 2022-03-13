<script lang="ts" setup>
import { RouterView } from "vue-router";
import { darkTheme, NConfigProvider, NMessageProvider } from "naive-ui";
</script>
<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>

<style lang="scss" scoped></style>
