<script lang="ts" setup>
import scrollBackground from "@/view/login/scroll-background.vue";
import customForm from "@/view/login/custom-form.vue";
import { reactive, ref } from "vue";
import { login } from "@/api/login";
import useStore from "@/hooks/store";
import { setToken } from "@/app/cookie";
import one from "/0.png";
import two from "/1.png";
import three from "/2.png";
import four from "/3.png";
import five from "/4.png";
const store = useStore();


</script>

<template>
  <div class="login-page">
    <div class="img-wrap">
      <scroll-background :src="one"></scroll-background>
      <scroll-background
        :src="two"
        direction="left"
        :speed="1.25"
      ></scroll-background>
      <scroll-background :src="three" :speed="1.5"></scroll-background>
      <scroll-background
        :src="four"
        :speed="1.5"
        direction="left"
      ></scroll-background>
      <scroll-background :src="five" :speed="1.75"></scroll-background>
    </div>
    <div class="login-body">
      <custom-form name='登录' />
    </div>
  </div>
</template>

<style lang="scss">
.img-wrap {
  transform: skewY(22deg) translateY(-135px);
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
