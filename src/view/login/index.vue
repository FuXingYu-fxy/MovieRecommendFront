<script lang="ts" setup>
import { NForm, NFormItem, NInput, NButton } from "naive-ui";
import { reactive, ref} from "vue";
import { login } from "@/api/login";
import useStore from "@/hooks/store";
import { setToken } from "@/app/cookie";
const store = useStore();

const isLoading = ref(false)
const form = reactive({
  id: "",
  passsword: "",
});

const submit = async () => {
  isLoading.value = true
  try {
    const {data: {data: {token}}} = await login({
      id: Number(form.id),
      passwd: form.passsword
    });
    store.commit('user/SET_TOKEN', token);
    setToken(token)
  } catch (err: any) {
    console.log(err.message)
  }
  isLoading.value = false
};
</script>

<template>
  <n-form inline :label-width="80" :model="form">
    <n-form-item label="id" :path="form.id">
      <n-input v-model:value.number="form.id" placeholder="请输入用户id" />
    </n-form-item>
    <n-form-item label="password" :path="form.passsword">
      <n-input
        type="password"
        placeholder="请输入密码"
        @keyup.enter="submit"
        v-model:value="form.passsword"
      />
    </n-form-item>
    <n-form-item>
      <n-button type="success" @click="submit" :loading="isLoading">提交</n-button>
    </n-form-item>
  </n-form>
</template>

<style lang="scss"></style>
