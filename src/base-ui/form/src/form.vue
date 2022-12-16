<template>
  <div class="cm-form">
    <div class="header">
      <slot name="header"></slot>
    </div>

    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-model="selfFormData[item.field]"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-model="selfFormData[item.field]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.title"
                    :value="option.value"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.dateOptions"
                  v-model="selfFormData[item.field]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>

        <el-col v-if="isSearchForm" v-bind="colLayout">
          <el-form-item :style="itemStyle">
            <slot name="footer"></slot>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { IFormItem } from '../types';

export default defineComponent({
  props: {
    isSearchForm: {
      //是否是在查询栏使用该组件
      type: Boolean,
      default: true
    },
    formData: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '0 20px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:formData'],
  setup(props, { emit }) {
    const selfFormData = ref({ ...props.formData });

    watch(
      selfFormData,
      (newValue) => {
        emit('update:formData', newValue);
      },
      { deep: true }
    );

    return {
      selfFormData
    };
  }
});
</script>

<style lang="scss" scoped>
.cm-form {
  padding-top: 22px;
}
.el-input,
.el-select {
  width: 100%;
}
</style>
