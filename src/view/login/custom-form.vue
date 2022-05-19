<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import useStore from "@/hooks/store";
import { NForm, NFormItem, NInput, NButton, NIcon, useMessage } from "naive-ui";
import type { FormInst } from "naive-ui";
import { Person, GlassesOutline, Glasses } from "@vicons/ionicons5";
import { login, registry } from "@/api/login";
import crypto from "@/tools/crypto";
import { setToken } from "@/app/cookie";

interface LoginResponse {
  pass: boolean;
  msg?: string;
  token?: string;
}
interface RegistryResponse {
  pass: boolean;
  msg: string;
  data: {
    token: string;
  } | null;
}
const router = useRouter();
const route = useRoute();
const store = useStore();
const message = useMessage();
const isLoging = ref(false);
const isRegistrying = ref(false);
const formRef = ref<FormInst | null>(null);
const formData = reactive({
  account: "",
  password: "",
});
const jumpRoute = () => {
  const target = (route.query.redirect || 'Fxy') as string;
  console.log(target);
  setTimeout(() => {
    router.push({name: target});
  }, 500);
}
const submit = async () => {
  try {
    await formRef.value?.validate();
  } catch {
    message.warning("请输入账号或密码");
    return;
  }
  isLoging.value = true;
  try {
    const result = await login<LoginResponse>({
      account: formData.account,
      password: crypto.encrypt(formData.password),
    });
    if (result.pass) {
      // 登录成功, 保存token
      store.commit("user/SET_TOKEN", result.token);
      setToken(result.token as string);
      message.success(result.msg || "登录成功");
      jumpRoute();
    } else {
      message.error(result.msg as string, {
        keepAliveOnHover: true,
      });
    }
  } finally {
    isLoging.value = false;
  }
};

const registryUser = async () => {
  try {
    await formRef.value?.validate();
  } catch {
    message.warning("请输入账号或密码");
    return;
  }
  isRegistrying.value = true;
  try {
    const result = await registry<RegistryResponse>({
      account: formData.account,
      password: crypto.encrypt(formData.password),
    });
    if (result.pass) {
      store.commit("user/SET_TOKEN", result.data!.token);
      setToken(result.data!.token);
      message.success(result.msg);
      jumpRoute();
    } else {
      message.error(result.msg);
    }
  } catch {
    message.error("请求错误");
  } finally {
    isRegistrying.value = false;
  }
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
      :model="formData"
      label-placement="left"
      label-align="left"
      :rules="formRules"
      ref="formRef"
    >
      <n-form-item class="tap" label="账户: " path="account">
        <n-input v-model:value="formData.account" placeholder="请输入账户">
          <template #suffix>
            <n-icon :component="Person" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item class="tap" label="密码: " path="password">
        <n-input
          v-model:value="formData.password"
          type="password"
          placeholder="请输入密码"
          style="color: black"
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
      <n-button
        :loading="isLoging"
        block
        @click="submit"
        type="primary"
        color="#05d28d"
      >
        登录
      </n-button>
      <span class="text">or</span>
      <n-button
        :loading="isRegistrying"
        block
        @click="registryUser"
        type="warning"
      >
        注册
      </n-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text {
  display: block;
  text-align: center;
  font-size: 20px;
  user-select: none;
  color: beige;
}

.title {
  color: #ffffff;
  font-weight: bold;
}
.tap {
  margin-top: 16px;
}
.login-form {
  width: 320px;
  // height: 350px;
  height: 445px;
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
    background-color: #7676767d;
    border-radius: 15px;
    backdrop-filter: blur(10px);
  }
}
.group-button {
  margin-top: 100px;
}
</style>
