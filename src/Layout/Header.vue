<script lang="ts" setup>
import { computed } from "vue";
// import { useRailStyle } from "@/hooks/index";
import { NSwitch, NInput, NIcon, NSpace, NButton } from "naive-ui";
import {
  MdSearch,
  LogoGithub,
  IosContact,
  IosConstruct,
} from "@vicons/ionicons4";

interface Props {
  collapsed: boolean;
}

const iconSize = 30;
const props = defineProps<Props>();
const emit = defineEmits(["update:collapsed"]);
const expand = computed<boolean>({
  get() {
    return !props.collapsed;
  },
  set(val) {
    emit("update:collapsed", !val);
  },
});

// const railStyle = useRailStyle("rgb(158,158,158)", "rgb(58,58,58)");
</script>
<template>
  <div class="header">
    <n-space>
      <n-switch v-model:value="expand">
        <template #unchecked> 打开菜单 </template>
      </n-switch>
      <n-input placeholder="搜索" size="small" round>
        <template #prefix>
          <n-icon :component="MdSearch" />
        </template>
      </n-input>
    </n-space>
    <!-- <n-space justify="space-around" style="min-width: 250px"> -->
    <n-button quaternary circle>
      <template #icon>
        <n-icon :component="LogoGithub" :size="iconSize" />
      </template>
    </n-button>

    <n-button>
      <template #icon>
        <n-icon :component="IosConstruct" :size="iconSize" />
      </template>
    </n-button>
    <n-button>
      <template #icon>
        <n-icon :component="IosContact" :size="iconSize" />
      </template>
    </n-button>
    <!-- </n-space> -->
  </div>
</template>

<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  min-width: 600px;
}
</style>
