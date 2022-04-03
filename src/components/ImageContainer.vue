<script lang="ts" setup>
import fallbackImg from "../../public/fallback.jpg";
import { withDefaults, computed } from "vue";
interface Props {
  width?: number;
  src: string;
  title: string;
  description: string;
}

const props = withDefaults(defineProps<Props>(), {
  src: fallbackImg,
  title: "",
  description: "暂无描述",
});

const dynamicHeight = computed(() => {
  const { width } = props;
  return {
    height: (width ? 1.4 * width : 200) + "px",
  };
});
</script>

<template>
  <div class="img-wrapper" :style="`width: ${width ? width + 'px' : ''}`">
    <img :src="src" />
    <span class="title">{{ title }}</span>
    <div class="tips" :style="dynamicHeight">
      {{ description }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
$offset: -10px;
$transition-duraiton: 0.3s;
.img-wrapper {
  width: 150px;
  position: relative;
  // overflow: auto;
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
    .tips {
      opacity: 1;
      transition: 0.3s $transition-duraiton ease-in;
    }
  }
}
.tips {
  position: absolute;
  top: $offset;
  opacity: 0;
  background: rgba(0, 0, 0, 0.604);
  overflow: hidden;
  user-select: none;
  text-align: justify;
}

img {
  width: 100%;
  height: auto;
  transition: transform $transition-duraiton cubic-bezier(0.29, 0.1, 0.5, 2.31);
}
</style>
