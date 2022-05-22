<script lang="ts" setup>
import { NGradientText, NButton } from 'naive-ui';
import { useRouter } from 'vue-router';
const router = useRouter();
const jump = () => {
  router.push({ name: 'Explore'});
}
</script>

<template>
<h1>
  <n-gradient-text type="info">
	<p>欢迎。</p>
	这里有海量的电影、剧集和人物等你来发现。快来探索吧！
  </n-gradient-text>
  <n-button @click="jump">开始探索</n-button>
</h1>
</template>
<style lang="scss" scoped>
</style>
