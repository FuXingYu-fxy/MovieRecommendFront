<script lang="ts">
import { defineComponent } from "vue";
import { outsiteSearch, search } from "@/api/movie";
import ImageContainer from "@/components/ImageContainer.vue";
import type { MovieInfo } from "@/api/recommend";
import { NCard, NSpace, NButton, NEmpty } from "naive-ui";
interface Movie {
  href: string;
  title: string;
}
interface Data {
  result: MovieInfo[];
  outsiteResult: Movie[];
  key: string;
}
export default defineComponent({
  components: {
    NCard,
    NSpace,
    ImageContainer,
    NButton,
    NEmpty,
  },
  data(): Data {
    return {
      // 站外搜索结果
      result: [],
      outsiteResult: [],
      key: "",
    };
  },
  watch: {
    $route: {
      handler(route) {
        this.key = route.query.key;
        // this.searchOutsite(this.key);
        this.search(this.key);
      },
      immediate: true,
    },
  },
  methods: {
    async searchOutsite(key: string) {
      if (key === "") {
        return;
      }
      const data = await outsiteSearch<Movie[]>({
        key: encodeURIComponent(key),
      });
      this.outsiteResult = data.map((item) => {
        item.href = `https://www.themoviedb.org${item.href}`;
        return item;
      });
    },
    async search(key: string) {
      if (key === "") {
        return;
      }
      const data = await search<MovieInfo[]>({
        key: encodeURIComponent(key),
      });
      this.result = data.map((item) => {
        const root = import.meta.env.VITE_BASE_URL;
        return {
          ...item,
          cover: `${root}/cover/${item.cover}`,
          poster: `${root}/poster/${item.poster}`,
        };
      });
    },
  },
});
</script>

<template>
  <n-card>
    <n-space v-if="result.length" justify="space-around">
      <image-container
        v-for="movie of result"
        :key="movie.id"
        :id="movie.id"
        :poster="movie.poster"
        :cover="movie.cover"
        :title="movie.title_zh || movie.title_cn"
        :description="movie.description"
      />
    </n-space>
    <div v-else>
      <n-space v-if="outsiteResult.length">
        <a class="outsite-link" v-for="item of outsiteResult" :key="item.href" :href="item.href">
          {{ item.title }}
        </a>
      </n-space>
      <n-empty v-else size="large" description="抱歉、该电影本站未收录哦">
        <template #extra>
          <n-button size="small" @click="searchOutsite(key)">
            尝试站外搜索
          </n-button>
        </template>
      </n-empty>
    </div>
  </n-card>
</template>

<style lang="scss">
.outsite-link {
  font-size: 2em;
  color: white;
}
</style>
