<template>
  <el-dialog
    class="page-modal"
    title="新增"
    v-model="dialogVisible"
    width="30%"
    center
    destroy-on-close
  >
    <cm-form
      v-bind="modalConfig"
      v-model:formData="formData"
      :isSearchForm="false"
    >
    </cm-form>

    <slot></slot>
    <div class="footer-btn">
      <el-button type="primary" @click="handleConfirmClick">确定</el-button>
      <el-button @click="handleCancelClick">取消</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useStore } from '@/store';
import CmForm from '@/base-ui/form';

export default defineComponent({
  components: {
    CmForm
  },
  props: {
    pageName: {
      type: String,
      required: true
    },
    modalConfig: {
      type: Object,
      required: true
    },
    defaultFormData: {
      type: Object,
      default: () => ({})
    },
    otherFormData: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const store = useStore();
    const formData: any = ref({});
    const dialogVisible = ref(false);

    watch(
      () => props.defaultFormData,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[item.field] = newValue[item.field];
        }
      }
    );

    //确定操作
    const handleConfirmClick = () => {
      dialogVisible.value = false;

      if (!Object.keys(props.defaultFormData).length) {
        //新增时确定操作
        store.dispatch('home/createPageDataAction', {
          pageName: props.pageName,
          formData: { ...formData.value, ...props.otherFormData }
        });
      } else {
        //编辑时确定操作
        store.dispatch('home/editPageDataAction', {
          pageName: props.pageName,
          id: props.defaultFormData.id,
          formData: { ...formData.value, ...props.otherFormData }
        });
      }
    };
    const handleCancelClick = () => {
      dialogVisible.value = false;
    };

    return {
      formData,
      dialogVisible,
      handleConfirmClick,
      handleCancelClick
    };
  }
});
</script>

<style lang="scss" scoped>
.footer-btn {
  text-align: center;
}
</style>
