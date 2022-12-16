<template>
  <div class="login">
    <login-form class="login-panel" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginForm from './cpns/login-form.vue';

export default defineComponent({
  components: {
    LoginForm
  },
  setup() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(to right, rgb(116, 235, 213), rgb(172, 182, 229));
}
.login-panel {
  width: 500px;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
