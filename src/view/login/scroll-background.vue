<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
    speed: {
      type: Number,
      default: 1,
    },
    direction: {
      type: String,
      default: "right",
    },
  },
  data() {
    return {
      cw: 0,
      ch: 0,
      imgW: 0,
      imgH: 0,
      rateX: 0, // 水平轴的缩放比例
      offsetX: 0, //  水平位移
      animationId: -1,
    };
  },
  mounted() {
    const img = new Image();
    img.src = this.src;
    img.onload = () => {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      this.cw = canvas.width;
      this.ch = canvas.height;
      this.imgW = img.width;
      this.imgH = img.height;
      this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      this.rateX = img.width / canvas.width;
      this.draw();
    };
    // 动态挂载
    this.img = img;
    
  },
  unmounted() {
    this.cancelAnimation();
  },
  methods: {
    draw() {
      if (this.direction === "right") {
        this.translateRight();
      } else {
        this.translateLeft();
      }
    },
    translateLeft() {
      this.ctx.clearRect(0, 0, this.cw, this.ch);
      let offsetX = this.offsetX - this.speed;
      this.offsetX = offsetX < -this.cw ? 0 : offsetX;
      this.ctx.drawImage(this.img, this.offsetX, 0, this.cw, this.ch);

      // 补全的图像
      this.ctx.drawImage(
        this.img,
        0,
        0,
        this.imgW,
        this.imgH,
        this.cw + this.offsetX,
        0,
        this.cw,
        this.ch
      );
      this.animationId = requestAnimationFrame(this.translateLeft);
    },
    translateRight() {
      this.ctx.clearRect(0, 0, this.cw, this.ch);
      this.offsetX = (this.offsetX + this.speed) % this.cw;
      // 移出去的图像
      this.ctx.drawImage(this.img, this.offsetX, 0, this.cw, this.ch);
      // 补全的图像
      this.ctx.drawImage(
        this.img,
        this.rateX * (this.cw - this.offsetX),
        0,
        this.imgW,
        this.imgH,
        0,
        0,
        this.cw,
        this.ch
      );
      this.animationId = requestAnimationFrame(this.translateRight);
    },
    cancelAnimation() {
      cancelAnimationFrame(this.animationId);
    }
  },
});
</script>
<template>
  <canvas ref="canvas" width="960" height="200"></canvas>
</template>