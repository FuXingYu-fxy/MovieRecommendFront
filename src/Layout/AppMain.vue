<script lang="ts" setup>
import { RouterView } from "vue-router";
</script>
<template>
  <router-view v-slot="{Component, route}">
    <transition name="route" mode="out-in">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<style lang="scss" scoped>
.route-enter-from {
  transform: translateX(-15px);
  opacity: 0;
}
.route-leave-to {
  transform: translateX(15px);
  opacity: 0;
}
.route-enter-active,
.route-leave-active {
  transition: 0.4s;
}
</style>
