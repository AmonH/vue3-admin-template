<template>
  <!-- 商品信息 -->
  <div class="goods">
    <page-search
      :searchFormConfig="searchFormConfig"
      @searchBtnClick="handleSearchClick"
      @resetBtnClick="handleResetClick"
    />

    <page-table ref="pageTableRef" :tableConfig="tableConfig" pageName="goods">
      <template #header>
        <el-button type="primary"><i-ep-plus />新增商品</el-button>
        <el-button><i-ep-refresh /></el-button>
      </template>
      <template #oldPrice="scope">
        <span>￥{{ scope.row.oldPrice }}</span>
      </template>
      <template #newPrice="scope">
        <span>￥{{ scope.row.newPrice }}</span>
      </template>
      <template #status="scope">
        <el-button link :type="scope.row.status === 1 ? 'success' : 'danger'">{{
          scope.row.status === 1 ? '在售' : '已下架'
        }}</el-button>
      </template>
      <template #imgUrl="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          :preview-teleported="true"
        />
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
