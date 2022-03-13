<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { NButton } from "naive-ui";
import { useStore } from "vuex";
const store = useStore()
const curPath = useRoute().path;
const tableData = ref();
onMounted(() => {
  setTimeout(() => {
    tableData.value = [
      {
        name: "Osborne",
        hacker: "THX",
      },
      {
        name: "Jadyn",
        hacker: "USB",
      },
      {
        name: "Rudolph",
        hacker: "HTTP",
      },
    ];
    if (store.state.originalPath === curPath && Object.keys(store.state.row).length) {
      const {index, name, hacker} = store.state.row;
      tableData.value[index] = {name, hacker}
    }
  }, 300);
});
const router = useRouter();
const handleEdit = (row: { name: string; hacker: string }, i: number) => {
  router.push({
    name: "ReportEdit",
    query: {
      ...row,
      index: i,
    },
  });
};
</script>
<template>
  <ul>
    <li v-for="(item, index) of tableData" :key="item.name">
      {{ item.name }} -- {{ item.hacker }} --
      <n-button @click="handleEdit(item, index)">edit</n-button>
    </li>
  </ul>
</template>

<style lang="scss"></style>
