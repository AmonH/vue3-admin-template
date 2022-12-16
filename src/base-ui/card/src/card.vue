<template>
  <div class="cm-card">
    <el-card>
      <template #header>
        <h2 class="title">{{ title }}</h2>
      </template>
      <slot></slot>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
.cm-card {
  .title {
    padding: 0;
    margin: 0;
    font-size: 17px;
  }
  :deep .el-card__header {
    padding: 15px 10px;
    background: #f6f6f6;
  }
}
</style>
