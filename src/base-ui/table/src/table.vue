<template>
  <div class="table">
    <div v-if="showHeader" class="header">
      <slot name="header"></slot>
    </div>

    <el-table
      :data="listData"
      border
      stripe
      style="width: 100%"
      header-row-class-name="table-header"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="showSelectionColumn"
        type="selection"
        align="center"
        width="55"
      />
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="70"
      >
        <template #default="scope">
          <!-- 自定义序号 -->
          <span>{{
            (pageInfo.currentPage - 1) * pageInfo.pageSize + (scope.$index + 1)
          }}</span>
        </template>
      </el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <!-- 通过作用域插槽 -->
            <slot :name="propItem.slotName" :row="scope.row">{{
              scope.row[propItem.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div class="footer clearfix">
      <slot name="footer">
        <el-pagination
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    listData: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: true
    },
    showSelectionColumn: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    pageInfo: {
      type: Object,
      default: () => ({
        currentPage: 0,
        pageSize: 10
      })
    }
  },
  emits: ['selectionChange', 'update:pageInfo'],
  setup(props, { emit }) {
    //将表格选择事件发送到父组件中：
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value);
    };

    //v-model的双向绑定
    const handleSizeChange = (pageSize: number) => {
      emit('update:pageInfo', { ...props.pageInfo, pageSize });
    };
    const handleCurrentChange = (currentPage: number) => {
      emit('update:pageInfo', { ...props.pageInfo, currentPage });
    };

    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    };
  }
});
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 10px;
}

:deep .table-header th.el-table__cell {
  background-color: #f5f7fa;
}

:deep .el-table .el-table__cell {
  padding: 6px 0;
}

.footer {
  padding-top: 10px;
}
:deep .el-pagination {
  float: right;
}
</style>
