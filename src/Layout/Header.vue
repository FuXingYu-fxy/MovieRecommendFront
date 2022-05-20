<script lang="ts" setup>
import { computed, ref } from "vue";
import {
  NSwitch,
  NInput,
  NIcon,
  NSpace,
  NButton,
  useMessage,
  NDropdown,
} from "naive-ui";
import useStore from "@/hooks/store";
import {
  MdSearch,
  IosContact,
  IosConstruct,
  LogoGithub,
} from "@vicons/ionicons4";
import {
  PersonSharp as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
} from "@vicons/ionicons5";
import {renderIcon} from "@/tools/index"
import {useRouter} from "vue-router";


interface Props {
  collapsed: boolean;
}
const store = useStore();
const router = useRouter()
const message = useMessage();
const props = defineProps<Props>();
const emit = defineEmits(["update:collapsed"]);
const search = ref('');

const expand = computed<boolean>({
  get() {
    return !props.collapsed;
  },
  set(val) {
    emit("update:collapsed", !val);
  },
});

const iconSize = 30;
const handleSelect = async (key: string) => {
  message.info(key);
  if (key === 'logout') {
    // 退出登录
	await store.dispatch("user/resetToken");
    await store.dispatch("user/resetUserInfo");
	// 清除用户数据后再跳转到登陆页面
	router.push({name: 'Login'});
  }
};

const options = ref([
  {
    label: "用户资料",
    key: "profile",
    icon: renderIcon(UserIcon),
  },
  {
    label: "编辑用户资料",
    key: "editProfile",
    icon: renderIcon(EditIcon),
  },
  {
    label: "退出登录",
    key: "logout",
    icon: renderIcon(LogoutIcon),
  },
]);

const gotoGithub = () => {
  location.href = "https://github.com/FuXingYu-fxy/MovieRecommendFront";
};

const gotoSetting = () => {
  router.push({name: 'SystemSetting'});
}

const jump = () => {
  if (search.value === '') {
    return;
  }
  router.push({name: 'SearchResult', query: {key: search.value}});
}
// const railStyle = useRailStyle("rgb(158,158,158)", "rgb(58,58,58)");
</script>
<template>
  <div class="header">
    <n-space>
      <n-switch v-model:value="expand">
        <template #unchecked> 打开菜单 </template>
      </n-switch>
      <n-input placeholder="搜索" size="small" round v-model:value="search" @keyup.enter="jump">
        <template #prefix>
          <n-icon :component="MdSearch" />
        </template>
      </n-input>
    </n-space>

    <n-space justify="space-around" style="min-width: 250px">
      <n-button text @click="gotoGithub">
        <template #icon>
          <n-icon :component="LogoGithub" :size="iconSize" />
        </template>
      </n-button>

      <n-button text @click="gotoSetting">
        <template #icon>
          <n-icon :component="IosConstruct" :size="iconSize" />
        </template>
      </n-button>

      <n-dropdown show-arrow trigger="hover" :options="options" @select="handleSelect">
        <n-button text>
          <template #icon>
            <n-icon :component="IosContact" :size="iconSize" />
          </template>
        </n-button>
      </n-dropdown>
    </n-space>
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
