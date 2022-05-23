<script lang="ts" setup>
import { NH2, NButton, NH1, NText } from "naive-ui";
import { useRouter } from "vue-router";
import welcome from "/welcome.jpg";
const router = useRouter();
const jump = () => {
  router.push({ name: "Explore" });
};
</script>

<template>
  <div>
    <img :src="welcome" class="cover-image" />
    <div class="text">
      <n-h1>
        <n-text strong depth="1" style="font-size: 2em">欢迎。</n-text>
      </n-h1>
      <n-h2>
        <n-text depath="2">
          这里有海量的电影、剧集和人物等你来发现。快来探索吧！
        </n-text>
      </n-h2>
      <n-button @click="jump">开始探索</n-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cover-image {
  position: fixed;
  width: 100vw;
  transform: translate(-24px, -24px);
  transition: .5s;
  filter: brightness(0.3);
}
.text {
  // padding-top: 50px;
  padding: 50px 0 0 10px;
  position: relative;
  z-index: 3;
}
</style>
