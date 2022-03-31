<script lang="ts" setup>
import {NCard, NPageHeader } from "naive-ui";
import {useRouter} from "vue-router";
const router = useRouter()
const handleBack = () => {
  router.back()
}
</script>
<template>
  <n-card>
    <n-page-header subtitle="让你的听觉更懂视觉" @back="handleBack">
     <template #title>
      <a
        style="text-decoration: none; color: inherit"
      >系统设置</a>
    </template>
    </n-page-header>
  </n-card>
</template>

<style lang="scss">
</style>