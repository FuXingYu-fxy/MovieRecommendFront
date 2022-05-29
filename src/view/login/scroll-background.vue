<script lang="ts" setup>
import { onMounted, ref, onUnmounted } from "vue";
interface Props {
  src: string;
  speed?: number;
  direction?: "left" | "right";
}
const props = withDefaults(defineProps<Props>(), {
  speed: 1,
  direction: "right",
});

let imgW = 0,
  imgH = 0,
  rateX = 0,
  offsetX = 0,
  animationId = -1,
  cw = 0,
  ch = 0;

let picture: HTMLImageElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
const canvas = ref<HTMLCanvasElement | null>(null);
onUnmounted(cancelAnimation);
onMounted(() => {
  const img = new Image();
  img.src = props.src;
  img.onload = () => {
    const canvasValue = canvas.value;
    if (!canvasValue) return;
    ctx = canvasValue.getContext("2d");
    imgW = img.width;
    imgH = img.height;
    cw = canvasValue.width;
    ch = canvasValue.height;
    rateX = imgW / cw;
    draw();
  };
  // 动态挂载
  picture = img;
});

function cancelAnimation() {
  cancelAnimationFrame(animationId);
}
function draw() {
  if (props.direction === "right") {
    translateRight();
  } else {
    translateLeft();
  }
}

function translateLeft() {
  ctx!.clearRect(0, 0, cw, ch);
  offsetX = offsetX - props.speed < -cw ? 0: offsetX - props.speed;
  // 左边移出图像
  ctx!.drawImage(picture!, offsetX, 0, cw, ch);
  // 除了 picture 前四个参数描述的是源文件, 后四个参数描述的是缩放后的图像
  // 补全的图像
  ctx!.drawImage(picture!, 0, 0, imgW, imgH, cw + offsetX, 0, cw, ch);
  animationId = requestAnimationFrame(translateLeft);
}

function translateRight() {
  ctx!.clearRect(0, 0, cw, ch);
  offsetX = (offsetX + props.speed) % cw;
  // 移出去的图像
  ctx!.drawImage(picture!, offsetX, 0, cw, ch);
  // 补全的图像
  ctx!.drawImage(picture!, rateX * (cw - offsetX), 0, imgW, imgH, 0, 0, cw, ch);
  animationId = requestAnimationFrame(translateRight);
}
</script>
<template>
  <canvas
    @mouseleave="draw"
    @mouseenter="cancelAnimation"
    ref="canvas"
    width="1250"
    height="200"
  ></canvas>
</template>

<style>
canvas {
  cursor: pointer;
}
</style>
