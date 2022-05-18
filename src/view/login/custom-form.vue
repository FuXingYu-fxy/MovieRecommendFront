<script lang="ts" setup>
import { reactive, ref } from "vue";
import { NForm, NFormItem, NInput, NButton, NIcon } from "naive-ui";
import { Person, GlassesOutline, Glasses } from "@vicons/ionicons5";
interface Props {
  name: string;
}
defineProps<Props>();
const isLoading = ref(false);
const form = reactive({
  account: "",
  passsword: "",
});
const submit = async () => {
  console.log("登录");
};
const formRules = {
  account: {
    required: true,
    message: "账户不能为空",
    trigger: "blur",
  },
  password: {
    required: true,
    message: "密码不能为空",
    trigger: "blur",
  },
};
</script>
<template>
  <div class="login-form">
    <span class="text title">电影推荐系统登录</span>
    <n-form
      :model="form"
      label-placement="left"
      label-align="left"
      :rules="formRules"
    >
      <n-form-item label="账户: " path="account">
        <n-input v-model:value="form.account" placeholder="请输入账户">
          <template #suffix>
            <n-icon :component="Person" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item style="margin-top: 10px;" label="密码: " path="password">
        <n-input
          v-model:value="form.passsword"
          type="password"
          placeholder="请输入密码"
          show-password-on="click"
        >
          <template #password-visible-icon>
            <n-icon :size="16" :component="GlassesOutline" />
          </template>
          <template #password-invisible-icon>
            <n-icon :size="16" :component="Glasses" />
          </template>
        </n-input>
      </n-form-item>
    </n-form>
    <div class="group-button">
      <n-button block @click="submit" type="primary" color="#05d28d"
        >登录</n-button
      >
      <span class="text">or</span>
      <n-button block @click="submit" ghost type="info">注册</n-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  margin-bottom: 10px;
}
.text {
  display: block;
  text-align: center;
  font-size: 20px;
  user-select: none;
  color: beige;
}
.login-form {
  width: 320px;
  height: 350px;
  position: relative;
  padding: 10px;
  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background-color: #ded2d236;
    border-radius: 15px;
    // filter: drop-shadow(2px 6px 1px gray);
    backdrop-filter: blur(10px);
  } 
}
.group-button {
  margin-top: 60px;
}
</style>
