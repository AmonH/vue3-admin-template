<template>
  <div class="not-found">
    <h2 class="title">OOPS!!!</h2>
    <span>can't find it.</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
.not-found {
  text-align: center;
  padding-top: 100px;

  .title {
    color: #ff3300;
  }
}
</style>
