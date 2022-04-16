<script lang="ts" setup>
import { NCard, NText, NRate } from "naive-ui";
import { ref } from "vue";
// import cover from "/halo_cover.jpg";
// import poster from "/halo_poster.jpg"
defineProps<{
  id: number,
  poster: string;
  cover: string;
  title: string;
  description: string;
}>()
const rate = ref(0);
const handleChangeRate = (val: number) => {
  rate.value = val
}
</script>
<template>
  <n-card>
    <div class="container">
      <div class="poster" :style="`background-image: url(${poster})`">
      </div>
      <div class="movie-info-container">
        <img class="cover" :src="cover"/>
        <div class="text-container">
          <span>{{title}}</span>
          <span>动作冒险</span>
          <p>剧情简介</p>
          <p>{{description}}</p>
          <p>看过这部电影？ 给个<n-text type="success">评分吧</n-text></p>
          <n-rate allow-half :value="rate" :on-update:value="handleChangeRate"/>
        </div>
      </div>
    </div>
    
  </n-card>
</template>

<style lang="scss" scoped>
.container {
  height: 500px;
  position: relative;
}
.poster {
  height: 100%;
  width: 100%;
  background: no-repeat center top / cover;
  filter: brightness(0.2);
  position: absolute;
}
.movie-info-container {
  display: flex;
  padding: 0 80px;
  justify-content: center;
  // align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .cover {
    display: block;
    transform: scale(.8);
    border-radius: 15px;
    cursor: pointer;
    transition: .5s;
    height: 100%;
    &:hover {
      cursor: wait;
    }
  }
  .text-container {
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    padding: 50px 0;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }
}
</style>
