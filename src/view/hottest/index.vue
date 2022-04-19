<script lang="ts" setup>
import { NSpace } from "naive-ui";
import { ref } from "vue";
import { hottestMovie } from "@/api/recommend";
import type {MovieInfo } from "@/api/recommend";
import ImageContainer from "@/components/ImageContainer.vue";

const movieData = ref<MovieInfo[]>();
hottestMovie().then((data) => {
  movieData.value = data.map((item) => {
    const root = import.meta.env.VITE_BASE_URL;
    return {
      ...item,
      cover: `${root}/cover/${item.cover}`,
      poster: `${root}/poster/${item.poster}`,
    };
  });
});
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
