<script lang="ts" setup>
import { NInput, NButton } from "naive-ui";
import { useRouter, useRoute } from "vue-router";
import { reactive } from "vue";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const route = useRoute();
const row = reactive(route.query);
const handleClick = () => {
  store.commit({
    type: "UPDATE_ROW",
    row
  })
  router.go(-1);
};
</script>
<template>
  <div>
    <n-input v-model:value="(row.name as string)" />
    <n-input v-model:value="(row.hacker as string)" />
    <n-button @click="handleClick">save</n-button>
  </div>
</template>
