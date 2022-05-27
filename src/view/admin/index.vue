<script lang="ts" setup>
import {
  NButton,
  NGradientText,
  useMessage,
  NCard,
  NPageHeader,
  NDivider,
} from "naive-ui";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { shutDown } from "@/api/management";

const router = useRouter();
const isShuttingDown = ref(false);
const message = useMessage();
const back = () => {
  router.back();
};
const handleClick = () => {
  isShuttingDown.value = true;
  shutDown()
    .then(() => {
      message.success("系统已关闭");
    })
    .finally(() => {
      isShuttingDown.value = false;
    });
};
</script>
<template>
  <n-card>
    <n-page-header @back="back">
      <template #title>
        <a style="text-decoration: none; color: inherit">系统管理</a>
      </template>
    </n-page-header>
    <n-divider />
    <n-button @click="handleClick" :loading="isShuttingDown">关机</n-button>
  </n-card>
</template>

<style lang="scss"></style>
