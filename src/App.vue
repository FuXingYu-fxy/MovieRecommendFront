<script lang="ts" setup>
import { RouterView } from "vue-router";
import { darkTheme, NConfigProvider } from "naive-ui";
</script>
<template>
  <n-config-provider :theme="darkTheme">
    <router-view />
  </n-config-provider>
</template>

<style lang="scss"></style>
