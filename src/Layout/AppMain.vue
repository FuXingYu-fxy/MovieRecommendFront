<script lang="ts" setup>
import { RouterView } from "vue-router";
import { Transition } from "vue";
</script>
<template>
  <router-view v-slot="{Component, route}">
    <transition name="route" mode="out-in">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<style lang="scss">
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
  transition: 0.5s linear;
}
</style>
