<script lang="ts" setup>
import { ref } from "vue";
import useStore from "@/hooks/store";
import ImageContainer from "@/components/ImageContainer.vue";
import { recommend } from "@/api/recommend";
import { NSpace, useMessage } from "naive-ui";
import type { MessageReactive } from 'naive-ui'
import type { MovieInfo } from "@/api/recommend";

type MovieData = MovieInfo[] | null;
interface Props {
  type: "User" | "Item";
}
let messageReactive: MessageReactive | null = null
const message = useMessage();
const sotre = useStore();
const props = withDefaults(defineProps<Props>(), {
  type: "User",
});
const movieData = ref<MovieData>(null);
const generateRecommend = async () => {
  if (!messageReactive) {
    messageReactive = message.loading('正在生成个性化推荐, 请稍等...', {duration: 0});
  }
  try {
    const result = await recommend(
      {
        userId: sotre.getters["user/userId"],
        N: 30,
      },
      props.type
    );
    if (result.length) {
      movieData.value = result.map((item) => {
        const root = import.meta.env.VITE_BASE_URL;
        return {
          ...item,
          cover: `${root}/cover/${item.cover}`,
          poster: `${root}/poster/${item.poster}`,
        };
      });
    }
  } finally {
    if (messageReactive) {
      messageReactive.destroy();
      messageReactive = null;
    }
  }
};
generateRecommend();
</script>
<template>
  <n-space justify="space-around">
    <image-container
      v-for="movie of movieData"
      :key="movie.id"
      :id="movie.id"
      :poster="movie.poster"
      :cover="movie.cover"
      :title="movie.title_zh || movie.title_cn"
      :description="movie.description"
    />
  </n-space>
</template>

<style lang="scss" scoped></style>
