<script lang="ts">
import {defineComponent} from "vue";
import { mapGetters, mapMutations } from "vuex";
import { NSpace, NCard } from "naive-ui";
import { queryFavoriteMovieById } from "@/api/movie";
import ImageContainer from "@/components/ImageContainer.vue";
import type { MovieInfo } from "@/api/recommend";
interface Data {
  movieData: MovieInfo[];
}
export default defineComponent({
  components: {
    ImageContainer,
    NSpace,
    NCard,
  },
  data() {
    return {
      movieData: [],
    } as Data;
  },
  async mounted() {
     const data = await queryFavoriteMovieById<MovieInfo[]>({
      id: this.userId,
    }, this.requestUpdated);

      this.movieData = data.map(item => {
        const root = import.meta.env.VITE_BASE_URL
        return {
          ...item,
          cover: `${root}/cover/${item.cover}`,
          poster: `${root}/poster/${item.poster}`,
        }
      });
      if (this.requestUpdated) {
        this.toggleRequestUpdated(false);
      }
  },
  computed: {
    ...mapGetters("user", ["userId"]),
    ...mapGetters(["requestUpdated"]),
  },
  methods: {
    ...mapMutations({toggleRequestUpdated: "TOGGLE_REQUEST_UPDATED"})
  }
})

</script>

<template>
  <n-card>
    <n-space v-if="movieData.length" justify="space-around">
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
    <span v-else>这里空空如也哦~~</span>
  </n-card>
</template>

<style lang="scss"></style>
