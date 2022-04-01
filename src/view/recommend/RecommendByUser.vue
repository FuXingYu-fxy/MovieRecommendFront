<script lang="ts" setup>
import { NGradientText, NInput, NButton, NDivider, NCard, NGrid, NGi, NSpace, NImage} from "naive-ui";
import { ref, reactive } from "vue";
import { recommendByUserId } from "@/api/recommend";
const loading = ref(false);
const movieId = ref([]);
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
    movieId.value = data.data
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
    <n-divider />
    <n-card title="还没想好名字">
      <n-space justify="space-around">
        <n-image
          v-for="item of movieId"
          :src="`http://localhost:5500/cover/${~~item}_cover.jpg`"
          :key="item"
        />
      </n-space>
    </n-card>
  </div>
</template>

<style lang="scss" scoped>
.first {
  background-color: red;

}
.second {
  background-color: green;
}
.third {
  background-color: blue;
}

.fourth {
  background-color: yellow;
}
</style>
