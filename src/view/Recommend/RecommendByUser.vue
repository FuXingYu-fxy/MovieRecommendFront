<script lang="ts" setup>
import { NGradientText, NInput, NButton } from "naive-ui";
import { ref } from "vue";
import { recommendByUserId } from "@/api/recommend";
const loading = ref(false);
const result = ref([]);
const userId = ref("");
const handleClick = async () => {
  if (!userId.value) {
    return;
  }
  loading.value = true;
  try {
    const { data } = await recommendByUserId({
      userId: userId.value,
      N: 20
    });
    result.value = data;
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div>
    <n-gradient-text> 基于用户的协同过滤推荐算法 </n-gradient-text>
    <n-input
      v-model:value="userId"
      @keyup.enter="handleClick"
      placeholder="请输入用户id"
      :disabled="loading"
    ></n-input>

    <n-button @click="handleClick" :loading="loading">请求</n-button>
    <div v-for="(item, index) of result" :key="item">
      {{ item }}----{{ index }}
    </div>
  </div>
</template>

<style lang="scss"></style>
