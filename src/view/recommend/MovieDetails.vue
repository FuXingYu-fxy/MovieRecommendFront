<script lang="ts" setup>
import {
  NCard,
  NText,
  NRate,
  NSpace,
  NButton,
  NIcon,
  NScrollbar,
  NTag,
} from "naive-ui";
import {
  addUserFavoriteMovie,
  queryRating,
  updateRating,
  delUserFavoriteMovie,
  queryFavoriteMovie,
  queryTagsByMovieId,
} from "@/api/movie";
import useStore from "@/hooks/store";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { CheckmarkCircleOutline, AddCircleOutline } from "@vicons/ionicons5";
import useActionCapture from "@/hooks/actionCapture";
import { movieTagMap } from "@/dicts";
const colorList = [
  "#0099CC",
  "#339966",
  "#FFCC33",
  "#33FF99",
  "#66CCFF",
  "#FF2277",
];
const store = useStore();
const props = defineProps<{
  id: number | string;
  poster: string;
  cover: string;
  title: string;
  description: string;
}>();
// 位于该页面8秒后, 认定用户对其有潜在兴趣
const [start, end, updateImplicit] = useActionCapture(
  props.id as number,
  8000,
  4
);
// 挂在完毕后就开始计时
onMounted(start);
onUnmounted(end);

const rate = ref(0);
const movieTags = ref<{ id: number; tag_name: string }[]>([]);
const userId = computed<number>(() => store.getters["user/userId"]);

const handleChangeRate = (val: number) => {
  updateRating({
    userId: userId.value,
    movieId: Number(props.id),
    rating: val,
  }).then(() => {
    rate.value = val;
    // 评分更新成功后, 将缓存更新状态设置为true, 接口就回去重新获取最新推荐结果
    store.commit("SET_MOVIE_UPDATED", true);
  });
};

// get 请求传入的参数都被视作字符串
queryRating({
  userId: String(userId.value),
  movieId: props.id as string,
}).then(({ rating }) => {
  rate.value = rating;
});

const isWatchLater = ref(false);
queryFavoriteMovie<{ movie_id: number }[]>({
  userId: userId.value,
  movieId: Number(props.id),
}).then((res) => {
  isWatchLater.value = Boolean(res.length);
});

const addWatchLater = () => {
  const requestApi = isWatchLater.value
    ? delUserFavoriteMovie
    : addUserFavoriteMovie;
  requestApi({
    userId: store.getters["user/userId"],
    movieId: Number(props.id),
  }).then(() => {
    isWatchLater.value = !isWatchLater.value;
    // favorite 页面会重新请求
    store.commit("SET_FAVORITE_UPDATED", true);
    // 认定用户对其有潜在兴趣
    updateImplicit(5);
  });
};

queryTagsByMovieId({
  movieId: Number(props.id),
}).then((res) => {
  if (res && res.length) {
    movieTags.value = res.map((item) => {
      return {
        id: item.id,
        tag_name: movieTagMap[item.tag_name],
      };
    });
  }
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
          <n-space>
            <n-tag
              v-for="(item, i) of movieTags"
              round
              size="small" 
              :key="item.id"
              :color="{
                borderColor: colorList[i % colorList.length],
                textColor: colorList[i % colorList.length],
              }"
            >
              {{ item.tag_name }}
            </n-tag>
          </n-space>
          <p>剧情简介</p>
          <n-scrollbar>
            {{ description }}
          </n-scrollbar>
          <n-space justify="space-between">
            <p>看过这部电影？ 给个<n-text type="success">评分吧</n-text></p>
            <n-button
              text
              size="large"
              @click="addWatchLater"
              :title="isWatchLater ? '已添加到稍后再看' : '添加到稍后再看'"
            >
              <template #icon>
                <n-icon>
                  <checkmark-circle-outline v-if="isWatchLater" />
                  <add-circle-outline v-else />
                </n-icon>
              </template>
            </n-button>
          </n-space>
          <n-rate
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
