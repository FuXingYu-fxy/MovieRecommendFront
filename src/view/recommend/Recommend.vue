<script lang="ts">
import {NSpace} from "naive-ui";
import { recommend } from "@/api/recommend";
import type { MovieInfo } from "@/api/recommend";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import ImageContainer from "@/components/ImageContainer.vue";

interface Data {
  movieData: MovieInfo[] | null;
}
export default defineComponent({
  components: { ImageContainer, NSpace},
  props: {
    type: {
      type: String,
      default: 'User'
    }
  },
  data(): Data {
    return {
      movieData: null,
    };
  },
  async created() {
    const data = await recommend(
      {
        userId: this.userId,
        N: 30,
      },
      this.type
    );
    if (data.length) {
      this.movieData = data.map(item => {
        const root = import.meta.env.VITE_BASE_URL
        return {
          ...item,
          cover: `${root}/cover/${item.cover}`,
          poster: `${root}/poster/${item.poster}`,
        }
      });
    }
  },
  computed: {
    ...mapGetters("user", ["userId"]),
  },
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