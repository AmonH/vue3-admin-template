<template>
  <div class="login-form">
    <h1 class="login-title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <i-ep-user class="icon i-ep-user" />
          <span class="text">账户登录</span>
        </template>

        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <i-ep-iphone class="icon i-ep-iphone" />
          <span class="text">手机登录</span>
        </template>

        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="login-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link tppe="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoginAccount from './login-account.vue';
import LoginPhone from './login-phone.vue';

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    //定义属性
    const isKeepPassword = ref(true);
    const accountRef = ref<InstanceType<typeof LoginAccount>>();
    const currentTab = ref<string>('account');

    //定义方法
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        //账号登录
        accountRef.value?.loginAction(isKeepPassword.value);
      } else {
        //手机登录
      }
    };

    return {
      isKeepPassword,
      accountRef,
      currentTab,
      handleLoginClick
    };
  }
});
</script>

<style lang="scss" scoped>
.login-form {
  padding: 0 20px 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 2px 5px 12px 2px rgba(0, 0, 0, 0.2);
}

.login-title {
  text-align: center;
  color: #666;
  font-size: 24px;
}

.el-tabs__item {
  .icon {
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }
  .text {
    padding-left: 5px;
  }
}

.login-control {
  padding: 10px 0;
  .el-link {
    float: right;
    line-height: 32px;
  }
}
.login-btn {
  width: 100%;
}
</style>
