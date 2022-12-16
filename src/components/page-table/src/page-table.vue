<template>
  <div class="page-table">
    <cm-table
      :listData="listData"
      :listCount="listCount"
      v-bind="tableConfig"
      v-model:pageInfo="pageInfo"
    >
      <template #header>
        <el-button type="primary" @click="handleAddClick">{{
          tableConfig.addBtnText
        }}</el-button>
        <slot name="otherHeaderHandler"></slot>
      </template>
      <template #handler="scope">
        <slot name="handler">
          <el-button type="text" @click="handleEditClick(scope.row)"
            ><i-ep-edit />编辑</el-button
          >
          <el-button type="text" @click="handleDeleteClick(scope.row)"
            ><i-ep-delete />删除</el-button
          >
        </slot>
      </template>

      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>

      <!-- 动态插入剩余的插槽 -->
      <template
        v-for="item in filterHandlers"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
    </cm-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { useStore } from '@/store';

import CmTable from '@/base-ui/table';

export default defineComponent({
  props: {
    tableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    CmTable
  },
  emits: ['addBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore();

    //设置并监听page数据
    const pageInfo = ref({ currentPage: 1, pageSize: 10 });
    watch(pageInfo, () => getPageListData());

    //请求表格数据
    const getPageListData = (searchInfo: any = {}) => {
      store.dispatch('home/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...searchInfo
        }
      });
    };
    getPageListData();

    //从store中获取当前页面的数据
    const listData = computed(() =>
      store.getters['home/getHomeStateList'](props.pageName)
    );
    const listCount = computed(() =>
      store.getters['home/getHomeStateCount'](props.pageName)
    );

    //获取过滤后的动态插槽：
    const defaultSlots = ['createAt', 'updateAt', 'handler']; //默认固定插槽
    const filterHandlers = props.tableConfig.propList.filter((item: any) => {
      const isInDefaultSlots = defaultSlots.includes(item.slotName);
      if (isInDefaultSlots || !item.slotName) {
        return false;
      }

      return true;
    });

    //删除操作：
    const handleDeleteClick = (row: any) => {
      store.dispatch('home/deletePageDataAction', {
        pageName: props.pageName,
        id: row.id
      });
    };

    //新增操作
    const handleAddClick = () => {
      emit('addBtnClick');
    };

    //编辑操作
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item);
    };

    return {
      listData,
      listCount,
      pageInfo,
      filterHandlers,
      getPageListData,
      handleDeleteClick,
      handleAddClick,
      handleEditClick
    };
  }
});
</script>

<style lang="scss" scoped>
.page-table {
  padding: 20px;
  border-top: 20px solid #eaeaea;
}
</style>
