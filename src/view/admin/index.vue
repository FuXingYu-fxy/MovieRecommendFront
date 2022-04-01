<script lang="ts" setup>
import { NButton, NGradientText, useMessage } from "naive-ui";
const message = useMessage();
const handleClick = () => {
  message.success("欢迎您, 管理员!");
};
</script>
<template>
  <div>
    <n-gradient-text>
      <h1>这里是管理员页面</h1>
    </n-gradient-text>
    <n-button @click="handleClick">管理员</n-button>
  </div>
</template>

<style lang="scss"></style>
