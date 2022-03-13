<script lang="ts" setup>
import {NGradientText, NButton} from "naive-ui"
import {useRouter} from "vue-router"
const router = useRouter();
const handleClick = () => {
  router.push("/recommend")
}
</script>
<template>
<n-gradient-text>
  这里有你意想不到的最劲爆内容
  <n-button @click="handleClick">forwar</n-button>
</n-gradient-text>
</template>

<style lang="scss">
</style>