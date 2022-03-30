<script lang="ts" setup>
import { routes } from "@/router/index";
import { NMenu, NGradientText } from "naive-ui";
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useNaiveUiMenuOptions } from "@/hooks/index";
// routes 现在是一个响应式对象, 所以在改变时computed 会重新触发
const menuOptions = computed(() => useNaiveUiMenuOptions(routes))
const props = defineProps<{
  collapsed: boolean;
}>();

const emit = defineEmits(["update:collapsed"]);
const collapsed = computed({
  get: () => props.collapsed,
  set: (val) => emit("update:collapsed", val),
});
const route = useRoute();
const activeMenu = computed(() => (route.name as string))

</script>
<template>
  <router-link to="/">
    <h1><n-gradient-text>电影推荐系统</n-gradient-text></h1>
  </router-link>
  <n-menu
    mode="vertical"
    :value="activeMenu"
    :options="menuOptions"
    :collapsed="collapsed"
  />
</template>

<style lang="scss" scoped></style>
