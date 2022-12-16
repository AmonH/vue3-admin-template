<template>
  <!-- 角色管理 -->
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @searchBtnClick="handleSearchClick"
      @resetBtnClick="handleResetClick"
    />

    <page-table
      ref="pageTableRef"
      :tableConfig="tableConfig"
      pageName="role"
      @addBtnClick="handleAddData"
      @editBtnClick="handleEditData"
    >
      <template #otherHeaderHandler>
        <el-button><i-ep-refresh /></el-button>
      </template>
    </page-table>

    <page-modal
      ref="pageModalRef"
      pageName="role"
      :modalConfig="modalConfig"
      :defaultFormData="defaultFormData"
      :otherFormData="otherFormData"
    >
      <div class="menu-tree">
        <el-tree
          :data="menuTree"
          show-checkbox
          node-key="id"
          :default-checked-keys="defaultCheckedKeys"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from '@/store';

import PageSearch from '@/components/page-search';
import PageTable from '@/components/page-table';
import PageModal from '@/components/page-modal';

import { searchFormConfig } from './config/search.config';
import { tableConfig } from './config/table.config';
import { modalConfig } from './config/modal.config';

import { usePageSearch } from '@/hooks/usePageSearch';
import { usePageModal } from '@/hooks/usePageModal';

export default defineComponent({
  components: {
    PageSearch,
    PageTable,
    PageModal
  },
  setup() {
    const [pageTableRef, handleSearchClick, handleResetClick] = usePageSearch();

    const store = useStore();
    const menuTree = computed(() => store.state.allMenuData);

    const otherFormData = ref({});
    const defaultCheckedKeys = ref<any>([]);
    const handleCheckChange = (nodeObject: any, selectObject: any) => {
      const checkedKeys = selectObject.checkedKeys;
      const halfCheckedKeys = selectObject.halfCheckedKeys;
      const menuList = [...checkedKeys, ...halfCheckedKeys];
      otherFormData.value = { menuList };
    };

    //新增逻辑的回调
    const addCallback = () => {
      defaultCheckedKeys.value = [];
    };
    //编辑逻辑的回调
    const editCallback = (item: any) => {
      const newList: any[] = [];

      const filterIds = (list: any[]) => {
        list.forEach((v) => {
          if (!v.children || !v.children.length) {
            newList.push(v.id);
          } else {
            filterIds(v.children);
          }
        });
      };
      filterIds(item.menuList);

      //通过ElTree组件的setDefaultKeys方法也可以实现该功能
      defaultCheckedKeys.value = newList;
    };

    const [pageModalRef, handleAddData, handleEditData, defaultFormData] =
      usePageModal([], [], addCallback, editCallback);

    return {
      searchFormConfig,
      tableConfig,
      modalConfig,
      pageTableRef,
      handleSearchClick,
      handleResetClick,
      pageModalRef,
      handleAddData,
      handleEditData,
      defaultFormData,
      menuTree,
      otherFormData,
      defaultCheckedKeys,
      handleCheckChange
    };
  }
});
</script>

<style lang="scss" scoped>
.menu-tree {
  padding-left: 100px;
  padding-bottom: 20px;
}
</style>
