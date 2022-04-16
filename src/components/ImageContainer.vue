<script lang="ts">
import fallbackImg from "/fallback.jpg";
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    cover: {
      type: String,
      default: fallbackImg,
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    width: {
      type: Number,
      default: 200,
    },
    id: {
      type: Number,
    },
    poster: {
      type: String,
    }
  },
  methods: {
    jumpToMovieDetails() {
      this.$router.push({
        name: "MovieDetails",
        params: {
          id: this.id,
          poster: this.poster,
          cover: this.cover,
          title: this.title,
          description :this.description,
        },
      });
    },
  },
});
</script>

<template>
  <div
    @click="jumpToMovieDetails"
    class="img-wrapper"
    :style="`width: ${width ? width + 'px' : ''}`"
  >
    <img :src="cover" />
    <span class="title">{{ title }}</span>
  </div>
</template>
<style lang="scss" scoped>
$offset: -10px;
$transition-duraiton: 0.3s;
.img-wrapper {
  width: 150px;
  position: relative;
  cursor: pointer;
  text-align: center;
  &:hover {
    img {
      transform: translateY($offset);
      box-shadow: 0 2px 8px 0 #63e2b7;
    }
    .title {
      color: cyan;
    }
  }
}

img {
  width: 100%;
  height: auto;
  transition: transform $transition-duraiton cubic-bezier(0.29, 0.1, 0.5, 2.31);
}
</style>
