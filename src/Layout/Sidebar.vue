<script lang="ts" setup>
import { routes } from "@/router/index";
import { NMenu, NGradientText } from "naive-ui";
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { useNaiveUiMenuOptions } from "@/hooks/index";
const activeMenu = ref("introduction");
const menuOptions = useNaiveUiMenuOptions(routes);
const props = defineProps<{
  collapsed: boolean;
}>();
const emit = defineEmits(["update:collapsed"]);
const collapsed = computed({
  get: () => props.collapsed,
  set: (val) => emit("update:collapsed", val),
});
</script>
<template>
  <router-link to="/">
    <h1><n-gradient-text>电影推荐系统</n-gradient-text></h1>
  </router-link>
  <n-menu
    mode="vertical"
    v-model:value="activeMenu"
    :options="menuOptions"
    :collapsed="collapsed"
  />
</template>

<style lang="scss" scoped></style>
