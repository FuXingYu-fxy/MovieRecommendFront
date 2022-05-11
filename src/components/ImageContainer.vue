<script lang="ts">
import fallbackImg from "/fallback.jpg";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { updateRating } from "@/api/movie";
export default defineComponent({
  props: {
    cover: {
      type: String,
      default: fallbackImg,
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    description: {
      type: String,
      default: "抱歉，该电影还没有任何简介",
    },
    width: {
      type: Number,
      default: 200,
    },
    id: {
      type: Number,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      timer: -1,
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
    handleMouseEnter() {
      this.timer = (setTimeout(() => {
        this.timer = -1;
        // 鼠标悬停超过1.5s, 认为用户对其有兴趣
        updateRating({
          userId: this.userId,
          movieId: this.id,
          implicitRating: 1
        })
      }, 2000)) as unknown as number;
    },
    handleMouseLeave() {
      if (this.timer !== -1) {
        clearTimeout(this.timer);
        this.timer = -1;
      }
    }
  },
  computed: {
    ...mapGetters("user", ["userId"]),
  }
});
</script>

<template>
  <div
    @click="jumpToMovieDetails"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
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
