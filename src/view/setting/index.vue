<script lang="ts" setup>
import {NCard, NPageHeader, NH1, NText, NDivider } from "naive-ui";
import {useRouter} from "vue-router";
const router = useRouter()
const handleBack = () => {
  router.back()
}
</script>
<template>
  <n-card>
    <n-page-header @back="handleBack">
     <template #title>
      <a
        style="text-decoration: none; color: inherit"
      >系统设置</a>
    </template>
    </n-page-header>
    <n-divider />
    <n-h1>
      <n-text type="success">
        现在还没有什么可以设置, 以后再来探索吧!
      </n-text>
    </n-h1>
  </n-card>
</template>

<style lang="scss">
</style>