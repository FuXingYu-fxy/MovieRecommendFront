<script lang="ts" setup>
import {NSpace, NImage} from "naive-ui";
import picture from "../../../public/1.jpg";
</script>

<template>
  <n-space>
    <n-image
      v-for="item of 50"
      :src="picture"
      :key="item"
      :width="150"
    />
  </n-space>
</template>

<style lang="scss">
</style>