<script lang="ts" setup>
import { NSpace, NImage, NCard } from "naive-ui";
import {reactive} from "vue"
import picture from "../../../public/1.jpg";
import Empty from "@/components/Empty.vue";
</script>

<template>
  <n-card>
    <!-- <Empty v-if="data.length === 0"></Empty> -->
    <n-space justify="space-around">
      <n-image v-for="item of 50" :src="picture" :key="item" :width="150" />
    </n-space>
  </n-card>
</template>

<style lang="scss"></style>
