<script lang="ts" setup>
import { routes } from "@/router/index";
import { NMenu } from "naive-ui";
import {ref} from "vue";
import {useNaiveUiMenuOptions} from "@/hooks/index"
const collapsed = ref(false)
const activeMenu = ref("Dashbord");
const menuOptions = useNaiveUiMenuOptions(routes);

</script>
<template>
<n-menu 
  mode="vertical" 
  v-model:value="activeMenu" 
  :options="menuOptions" 
  :collapsed="collapsed"
/>
</template>

<style lang="scss">
</style>