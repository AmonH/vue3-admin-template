<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="80px"
    status-icon
  >
    <el-form-item label="手机号：" prop="phoneNum">
      <el-input v-model="ruleForm.phoneNum" />
    </el-form-item>
    <el-form-item label="验证码：" prop="code">
      <el-col :span="11">
        <el-input v-model="ruleForm.code" />
      </el-col>
      <el-col :span="2"> </el-col>
      <el-col :span="11">
        <el-button type="primary">获取验证码</el-button>
      </el-col>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { rules } from '../config/phone-config';

export default defineComponent({
  setup() {
    const ruleForm = reactive({
      phoneNum: null,
      code: null
    });

    return {
      ruleForm,
      rules
    };
  }
});
</script>

<style lang="scss" scoped></style>
