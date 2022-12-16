<template>
  <!-- 部门管理 -->
  <div class="department">
    <page-search
      :searchFormConfig="searchFormConfig"
      @searchBtnClick="handleSearchClick"
      @resetBtnClick="handleResetClick"
    />

    <page-table
      ref="pageTableRef"
      :tableConfig="tableConfig"
      pageName="department"
    >
      <template #header>
        <el-button type="primary"><i-ep-plus />新增部门</el-button>
        <el-button><i-ep-refresh /></el-button>
      </template>
    </page-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import PageSearch from '@/components/page-search';
import PageTable from '@/components/page-table';

import { searchFormConfig } from './config/search.config';
import { tableConfig } from './config/table.config';

import { usePageSearch } from '@/hooks/usePageSearch';

export default defineComponent({
  components: {
    PageSearch,
    PageTable
  },
  setup() {
    const [pageTableRef, handleSearchClick, handleResetClick] = usePageSearch();

    return {
      searchFormConfig,
      tableConfig,
      pageTableRef,
      handleSearchClick,
      handleResetClick
    };
  }
});
</script>

<style lang="scss" scoped></style>
