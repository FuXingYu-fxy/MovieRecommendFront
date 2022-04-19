<script lang="ts" setup>
import { NCard, NText, NRate } from "naive-ui";
import { queryRating, updateRating } from "@/api/movie";
import useStore from "@/hooks/store";
import { ref } from "vue";
const store = useStore();
const props = defineProps<{
  id: string;
  poster: string;
  cover: string;
  title: string;
  description: string;
}>();
const rate = ref(0);
const readonly = ref(false);
const handleChangeRate = (val: number) => {
  updateRating({
    userId: store.getters["user/userId"],
    movieId: Number(props.id),
    rating: val
  }).then(res => {
    console.log(res)
  })
  rate.value = val;
};
queryRating({
  userId: store.getters["user/userId"],
  movieId: Number(props.id),
}).then(({rating}) => {
  rate.value = rating;
  readonly.value = Boolean(rating)
});
</script>
<template>
  <n-card>
    <div class="container">
      <div class="poster" :style="`background-image: url(${poster})`"></div>
      <div class="movie-info-container">
        <img class="cover" :src="cover" />
        <div class="text-container">
          <span>{{ title }}</span>
          <span>动作冒险</span>
          <p>剧情简介</p>
          <p>{{ description }}</p>
          <p>看过这部电影？ 给个<n-text type="success">评分吧</n-text></p>
          <n-rate
            :readonly="readonly"
            allow-half
            :value="rate"
            :on-update:value="handleChangeRate"
          />
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
  // 文字不全时, center 会导致cover移动到中间
  // justify-content: center;
  // align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .cover {
    display: block;
    transform: scale(0.8);
    border-radius: 15px;
    cursor: pointer;
    transition: 0.5s;
    height: 100%;
    &:hover {
      cursor: wait;
    }
  }
  .text-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 50px 0;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    user-select: none;
  }
}
</style>
