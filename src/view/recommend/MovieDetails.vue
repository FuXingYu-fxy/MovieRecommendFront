<script lang="ts" setup>
import { NGradientText } from "naive-ui";

interface Props {
  id: string;
}
defineProps<Props>();

</script>
<template>
  <n-gradient-text>电影详情页: {{ id }}</n-gradient-text>
</template>
<style lang="scss" scoped></style>
