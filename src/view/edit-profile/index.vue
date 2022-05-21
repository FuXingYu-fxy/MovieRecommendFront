<script lang="ts" setup>
import {
  NCard,
  NPageHeader,
  NInput,
  NSpace,
  NTag,
  NFormItem,
  NButton,
  useMessage,
  NDivider,
} from "naive-ui";
import { reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";
import crypto from "@/tools/crypto";
import {
  getUserPreference,
  updatePreference,
  updateUserInfo,
  isPasswordValid,
} from "@/api/user";
import { getAllTags } from "@/api/movie";
import useStore, {useUserInfo} from "@/hooks/store";

const store = useStore();
const user = useUserInfo();
const router = useRouter();
const message = useMessage();
const back = () => {
  router.back();
};
interface PreferenceResponse {
  id: number;
  tag_name: string;
}
const preferList = ref<PreferenceResponse[]>([]);
const isLoading = ref(false);

const curId = ref<number>(-1);

const formData = reactive<{
  newPassword: string;
  password: string;
  userName: string;
  hobbies: PreferenceResponse[];
}>({
  userName: store.getters["user/userName"],
  hobbies: [],
  password: "",
  newPassword: "",
});
const save = async () => {
  isLoading.value = true;
  let encryptPassword = "";
  if (formData.password) {
    encryptPassword = crypto.encrypt(formData.password);
    try {
      const res = await isPasswordValid({
        userId: user.userId,
        password: encryptPassword,
      });
      passwordPass.value = res.pass;
    } catch (err: any) {
      passwordPass.value = false;
      message.error(err.message);
    }
    if (!passwordPass.value) {
      isLoading.value = false;
      return;
    }
  }
  const preference = formData.hobbies.map((item) => item.id);
  // 更新偏好
  try {
    await updatePreference({
      userId: user.userId,
      preference,
    });
    // 更新用户名
    const userName = formData.userName || user.userName;
    if (userName || formData.newPassword) {
      const userInfo = {userName: "", password: ""};
      if (userName) {
        userInfo.userName = userName
      }
      if (formData.password && formData.newPassword) {
        userInfo.password = crypto.encrypt(formData.newPassword);
      }
      await updateUserInfo({
        userId: user.userId,
        userInfo,
      });
      store.dispatch("user/getInfo");
    }
    message.success("修改成功");
    setTimeout(back, 500);
  } catch (err: any) {
    message.error(err.message);
  } finally {
    isLoading.value = false;
  }
};
const colorList = [
  "#27ea27",
  "#d44e85",
  "#aca652",
  "#3ebfd9",
  "#c1bece",
  "#9aa27b",
  "#d6a460",
  "#d6ab00",
  "#eb13f2",
];
getUserPreference({
  userId: user.userId,
}).then((res) => {
  formData.hobbies = res;
  getAllTags().then((res) => {
    const ids = formData.hobbies.map((v) => v.id);
    preferList.value = res.filter((item) => !ids.includes(item.id));
  });
});

const addPreference = (id: number) => {
  const index = preferList.value.findIndex((item) => item.id === id);
  const [el] = preferList.value.splice(index, 1);
  formData.hobbies.push(el);
};
const cancelSelect = () => {
  const index = formData.hobbies.findIndex((item) => item.id === curId.value);
  const [el] = formData.hobbies.splice(index, 1);
  preferList.value.push(el);
};

const passwordPass = ref(true);
interface Validation{
  status: "error" | undefined;
  msg: string | undefined;
}
const validation = computed((): Validation => {
  if (passwordPass.value) {
    return {
      status: undefined,
      msg: undefined,
    };
  }
  return {
    status: "error",
    msg: "密码校验失败",
  };
});
</script>
<template>
  <n-card>
    <n-page-header subtitle="爱你的人越懂你" @back="back">
      <template #title>
        <a style="text-decoration: none; color: inherit">编辑用户资料</a>
      </template>
    </n-page-header>
    <n-divider />
    <n-form-item label="用户名">
      <n-input
        v-model:value="formData.userName"
        placeholder="请输入您的用户名"
        maxlength="20"
        show-count
        autosize
        style="min-width: 200px"
      />
    </n-form-item>

    <n-form-item
      label="修改密码"
      :validation-status="validation.status"
      :feedback="validation.msg"
    >
      <n-input
        placeholder="请输入旧密码"
        type="password"
        maxlength="10"
        show-count
        show-password-on="mousedown"
        autosize
        style="min-width: 200px"
        v-model:value="formData.password"
      />
      <n-input
        placeholder="请输入新密码"
        type="password"
        maxlength="10"
        show-count
        show-password-on="mousedown"
        v-model:value="formData.newPassword"
        autosize
        style="min-width: 200px; margin-left: 10px"
      />
    </n-form-item>

    <n-form-item label="我的偏好">
      <n-space>
        <n-tag
          v-for="(item, i) of formData.hobbies"
          :color="{
            textColor: colorList[i % colorList.length],
            borderColor: colorList[i % colorList.length],
          }"
          :key="item.id"
          closable
          @click.capture="curId = item.id"
          @close="cancelSelect"
          round
          class="tag"
          size="small"
          >{{ item.tag_name }}</n-tag
        >
      </n-space>
    </n-form-item>
    <p>添加你的偏好</p>
    <n-card>
      <n-tag
        v-for="item of preferList"
        class="alternative"
        :key="item.id"
        @click="addPreference(item.id)"
        >{{ item.tag_name }}</n-tag
      >
    </n-card>
    <n-button
      style="margin-top: 20px"
      type="primary"
      @click="save"
      :loading="isLoading"
      >保存修改</n-button
    >
  </n-card>
</template>

<style lang="scss" scoped>
.alternative {
  cursor: pointer;
  margin: 1px;
}
.tag {
  user-select: none;
}
</style>
