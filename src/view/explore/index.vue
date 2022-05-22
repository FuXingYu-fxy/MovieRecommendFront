<script lang="ts" setup>
import {
  NCard,
  NButton,
  NSpace,
  NH1,
  NText,
  NDivider,
  NPagination,
} from "naive-ui";
import { getAllTags, queryMovieByPage } from "@/api/movie";
import { ref, reactive, computed } from "vue";
import ImageContainer from "@/components/ImageContainer.vue";
import { movieTagMap } from "@/dicts";
import type { MovieInfo } from "@/api/recommend";
import fallback from "/fallback.jpg";

const tags = ref<{ id: number; tag_name: string }[]>([]);
const currentSelectedId = ref<number>(-1);
const movieData = ref<MovieInfo[]>([]);
let prevSelect: number;
getAllTags().then((res) => {
  const data = res.map((item) => {
    return {
      id: item.id,
      tag_name: movieTagMap[item.tag_name],
    };
  });
  data.unshift({ id: -1, tag_name: "显示全部电影" });
  tags.value = data;
});
const clickTag = (id: number) => {
  if (id === prevSelect) return;
  currentSelectedId.value = id;
  requestMovieData(1);
  prevSelect = id;
};

const pagination = reactive({
  current: 1,
  total: 0,
  pageSize: 14,
});

const count = computed(() => {
  return Math.ceil(pagination.total / pagination.pageSize);
});

const requestMovieData = async (current: number) => {
  // tagId === -1 代表全部
  current && (pagination.current = current);
  const body = {
    current: pagination.current,
    pageSize: pagination.pageSize,
    tagId: currentSelectedId.value,
  };
  // try {
  const { movieData: data, total } = await queryMovieByPage(body);
  if (data.length) {
    pagination.total = total;
    movieData.value = data.map((item) => {
      const root = import.meta.env.VITE_BASE_URL;
      const cover = `${root}/cover/${item.cover}`;
      return {
        ...item,
        cover: item.cover ? cover : fallback,
        poster: `${root}/poster/${item.poster}`,
      };
    });
  }
  // }
};

const pageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize;
  requestMovieData(1);
};
const pageSizes = [
  {
    value: 14,
    label: "14 每页",
  },
  {
    value: 21,
    label: "21 每页",
  },
  {
    value: 35,
    label: "35 每页",
  },
  {
    value: 56,
    label: "56 每页",
  },
];
requestMovieData(1);
</script>
<template>
  <n-card>
    <n-h1>
      <n-text type="primary"> 按标签分类 </n-text>
    </n-h1>
    <n-space>
      <n-button
        v-for="item of tags"
        :key="item.id"
        text
        :type="currentSelectedId === item.id ? 'success' : 'default'"
        @click="clickTag(item.id)"
        >{{ item.tag_name }}</n-button
      >
    </n-space>
    <n-divider />
    <n-space>
      <image-container
        v-for="movie of movieData"
        :key="movie.id"
        :id="movie.id"
        :poster="movie.poster"
        :cover="movie.cover"
        :title="movie.title_zh || movie.title_cn"
        :description="movie.description"
        :width="150"
      />
    </n-space>
    <n-divider />
    <n-pagination
      v-model:page="pagination.current"
      @update:page="requestMovieData"
      @update:page-size="pageSizeChange"
      size="small"
      :page-count="count"
      :page-slot="7"
      :page-sizes="pageSizes"
      show-size-picker
      show-quick-jumper
    >
      <template #goto> 跳转到 </template>
    </n-pagination>
  </n-card>
</template>

<style lang="scss" scoped></style>
