<script lang="ts" setup>
import { NCard, NGradientText } from "naive-ui";
</script>
<template>
  <n-card>
    <n-gradient-text class="gradient-text" type="success">
      I'm OK
      不要忘了留姓名
      电话和其他事情
      不要说的太快免得我没写下你大名
      或许你不再打来
      我却等到头发白
      希望有一天你会打来
    </n-gradient-text>
  </n-card>
</template>

<style lang="scss">
.gradient-text {
  white-space: pre-wrap;
  font-size: 40px;
}
</style>
