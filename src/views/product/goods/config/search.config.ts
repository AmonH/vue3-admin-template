import { IForm } from '@/base-ui/form';

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '商品名称',
      placeholder: '请输入商品名称'
    },
    {
      field: 'keywords',
      type: 'input',
      label: '关键词',
      placeholder: '请输入关键词'
    },
    {
      field: 'createTime',
      type: 'datepicker',
      label: '创建时间',
      dateOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
};
