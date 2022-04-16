<script lang="ts" setup>
import { NSpace, NCard} from "naive-ui";
import picture from "/1.jpg";
import Empty from "@/components/Empty.vue";
import ImageContainer from "@/components/ImageContainer.vue";
// import {getMovieInfo} from "@/api/recommend";


</script>

<template>
  <n-card>
    <!-- <Empty v-if="data.length === 0"></Empty> -->
    <n-space justify="space-around">
      <image-container
        v-for="item of 50"
        :key="item"
        :src="picture"
        title="蜘蛛侠3: 英雄无归"
        description="故事发生在复仇者联盟3: 终局之战后。闪烁事件已发生5年, 地球上的秩序已恢复正常, 但是随着多元宇宙的开启, 越来越多的人对地球这块宝地虎视眈眈"
      />
    </n-space>
  </n-card>
</template>

<style lang="scss"></style>
