<template>
  <div class="page-search">
    <cm-form v-bind="searchFormConfig" v-model:formData="formData">
      <template #footer>
        <span class="footer-btn">
          <el-button type="primary" @click="handleSearchClick">查询</el-button>
          <el-button @click="handleResetClick">重置</el-button>
        </span>
      </template>
    </cm-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CmForm from '@/base-ui/form';

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    CmForm
  },
  emits: ['searchBtnClick', 'resetBtnClick'],
  setup(props, { emit }) {
    //表单查询
    const formOriginData: any = {};
    const formItems = props.searchFormConfig?.formItems ?? [];
    formItems.forEach((item: any) => {
      formOriginData[item.field] = '';
    });
    const formData: any = ref(formOriginData);

    //搜索查询操作
    const handleSearchClick = () => {
      emit('searchBtnClick', formData.value);
    };

    //重置按钮操作
    const handleResetClick = () => {
      /**
       * 方案一：
       * page-search.vue修改：
       * formData.value = { ...formOriginData };//此处若formData.value = formOriginData会修改原始值，会出现问题
       *
       * form.vue修改：
       * watch(
       *  () => props.formData,
       *  (newValue) => {
       *    selfFormData.value = newValue;
       *  }
       * );
       */

      for (const key in formOriginData) {
        formData.value[key] = formOriginData[key];
      }

      emit('resetBtnClick');
    };

    return {
      formData,
      handleSearchClick,
      handleResetClick
    };
  }
});
</script>

<style lang="scss" scoped></style>
