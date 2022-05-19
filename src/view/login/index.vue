<script lang="ts" setup>
import scrollBackground from "@/view/login/scroll-background.vue";
import customForm from "@/view/login/custom-form.vue";
import one from "/0.png";
import two from "/1.png";
import three from "/2.png";
import four from "/3.png";
import five from "/4.png";
</script>

<template>
  <div class="login-page">
    <div class="img-wrap">
      <scroll-background :src="one" :speed="0.75"></scroll-background>
      <scroll-background
        :src="two"
        direction="left"
        :speed="0.4"
      ></scroll-background>
      <scroll-background :src="three" :speed="0.65"></scroll-background>
      <scroll-background
        :src="four"
        direction="left"
        :speed="0.5"
      ></scroll-background>
      <scroll-background :src="five" :speed="0.5"></scroll-background>
    </div>
    <div class="login-body">
      <custom-form></custom-form>
    </div>
  </div>
</template>

<style lang="scss">
.img-wrap {
  transform: skewY(22deg) translateY(-187px);
}
.login-body {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}
.login-page {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient( 135deg, #FAB2FF 10%, #1904E5 100%);
  overflow: hidden;
}
</style>
