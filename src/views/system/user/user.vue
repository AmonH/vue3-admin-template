<template>
  <!-- 用户管理 -->
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @searchBtnClick="handleSearchClick"
      @resetBtnClick="handleResetClick"
    />

    <page-table
      ref="pageTableRef"
      :tableConfig="tableConfig"
      pageName="users"
      @addBtnClick="handleAddData"
      @editBtnClick="handleEditData"
    >
      <template #otherHeaderHandler>
        <el-button><i-ep-refresh /></el-button>
      </template>

      <template #status="scope">
        <el-button link :type="scope.row.enable === 1 ? 'success' : 'danger'">{{
          scope.row.enable === 1 ? '启用' : '禁用'
        }}</el-button>
      </template>
    </page-table>

    <page-modal
      ref="pageModalRef"
      pageName="users"
      :modalConfig="modalConfigRef"
      :defaultFormData="defaultFormData"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue';
import { useStore } from '@/store';

import PageSearch from '@/components/page-search';
import PageTable from '@/components/page-table';
import PageModal from '@/components/page-modal';

import { searchFormConfig } from './config/search.config';
import { tableConfig } from './config/table.config';
import { modalConfig } from './config/modal.config';

import { usePageSearch } from '@/hooks/usePageSearch';
import { usePageModal } from '@/hooks/usePageModal';

import { capitalizedKey } from '@/utils/types';

export default defineComponent({
  components: {
    PageSearch,
    PageTable,
    PageModal
  },
  setup() {
    const [pageTableRef, handleSearchClick, handleResetClick] = usePageSearch();
    const capitalized = inject(capitalizedKey);

    //动态添加部门和角色列表数据
    const store = useStore();
    const setItemOptions = (itemType: string) => {
      const newType = capitalized?.(itemType);
      const dataType = store.getters['getInitData'](newType);
      const dataItem = modalConfig.formItems.find(
        (item) => item.field === itemType + 'Id'
      );
      //!.排除和null和undefined
      dataItem!.options = dataType.map((item: any) => ({
        title: item.name,
        value: item.id
      }));
    };

    const modalConfigRef = computed(() => {
      setItemOptions('department');
      setItemOptions('role');

      return modalConfig;
    });

    const hiddenItems = ['password']; //设置当前页面编辑时需要隐藏的项，且在配置表里加上isHidden: true
    const [pageModalRef, handleAddData, handleEditData, defaultFormData] =
      usePageModal(modalConfig.formItems, hiddenItems);

    return {
      searchFormConfig,
      tableConfig,
      modalConfigRef,
      pageTableRef,
      handleSearchClick,
      handleResetClick,
      pageModalRef,
      handleAddData,
      handleEditData,
      defaultFormData
    };
  }
});
</script>

<style lang="scss" scoped></style>
