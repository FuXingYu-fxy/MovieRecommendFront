<script lang="ts" setup>
import fallbackImg from "/fallback.jpg";
import { useRouter } from "vue-router";
import useActionCapture from "@/hooks/actionCapture";
interface Props {
  cover?: string;
  title?: string;
  description?: string;
  width?: number;
  poster: string;
  id: number;
}
const router = useRouter();
const props = withDefaults(defineProps<Props>(), {
  cover: fallbackImg,
  title: "",
  description: "抱歉，该电影还没有任何简介",
  width: 200,
});
const [start, end] = useActionCapture(props.id);

const jumpToMovieDetails = () => {
  end();
  router.push({
    name: "MovieDetails",
    params: {
      id: props.id,
      poster: props.poster,
      cover: props.cover,
      title: props.title,
      description: props.description,
    }
  })
}
</script>

<template>
  <div
    @click="jumpToMovieDetails"
    @mouseenter="start"
    @mouseleave="end"
    class="img-wrapper"
    :style="`width: ${width}px`"
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
