<template>
  <el-container class="main-container">
    <el-aside :width="isCollapsed ? '60px' : '210px'">
      <nav-menu :isCollapsed="isCollapsed" />
    </el-aside>
    <el-container class="page">
      <el-header class="page-header">
        <nav-header @foldChange="handleFoldChange" />
      </el-header>
      <el-main class="page-main">
        <div class="page-content">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import NavMenu from '@/components/nav-menu';
import NavHeader from '@/components/nav-header';

export default defineComponent({
  components: {
    NavHeader,
    NavMenu
  },
  setup() {
    const isCollapsed = ref(false);
    const handleFoldChange = (isFold: boolean) => {
      isCollapsed.value = isFold;
    };

    return {
      isCollapsed,
      handleFoldChange
    };
  }
});
</script>

<style lang="scss" scoped>
$headerH: 55px;

.main-container {
  height: 100%;
}
.el-aside {
  background: #004d61;
  transition: width 1s ease;
}
.page {
  background: #eaeaea;
}
.page-header {
  height: $headerH;
  line-height: $headerH;
  background-color: #f6f6e9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.page-main {
  height: calc(100% - 75px);
  .page-content {
    background: #fff;
    border-radius: 5px;
  }
}
</style>
