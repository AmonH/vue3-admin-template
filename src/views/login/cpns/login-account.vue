<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="70px"
    status-icon
  >
    <el-form-item label="账号：" prop="username">
      <el-input v-model="ruleForm.username" />
    </el-form-item>
    <el-form-item label="密码：" prop="password">
      <el-input v-model="ruleForm.password" show-password />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { FormInstance } from 'element-plus';
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';

import localCache from '@/utils/cache';
import { rules } from '../config/account-config';

export default defineComponent({
  setup() {
    const store = useStore();

    const ruleFormRef = ref<FormInstance>();
    const ruleForm = reactive({
      username: localCache.getCache('username') ?? '',
      password: localCache.getCache('password') ?? ''
    });

    const loginAction = (isKeepPassword: boolean) => {
      ruleFormRef.value?.validate((valid) => {
        if (valid) {
          //判断是否需要记住密码
          if (isKeepPassword) {
            //本地缓存
            localCache.setCache('username', ruleForm.username);
            localCache.setCache('password', ruleForm.password);
          } else {
            localCache.deleteCache('username');
            localCache.deleteCache('password');
          }

          //登录逻辑
          store.dispatch('login/accountLoginAction', {
            name: ruleForm.username,
            password: ruleForm.password
          });
        }
      });
    };

    return {
      ruleFormRef,
      ruleForm,
      rules,
      loginAction
    };
  }
});
</script>

<style lang="scss" scoped></style>
