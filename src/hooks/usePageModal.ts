import { ref } from 'vue';
import PageModal from '@/components/page-modal';

import { IFormItem } from '@/base-ui/form/types';

type CallbackFn = (item?: any) => void;
export function usePageModal(
  formItems?: IFormItem[],
  hiddenItems?: string[],
  addCallback?: CallbackFn,
  editCallback?: CallbackFn
) {
  const defaultFormData = ref({});
  const pageModalRef = ref<InstanceType<typeof PageModal>>();

  const hiddenFormItems: IFormItem[] = [];
  hiddenItems?.forEach((hiddenItem) => {
    const hiddenFormItem = formItems?.find(
      (formItem) => formItem.field === hiddenItem
    );

    if (hiddenFormItem) {
      hiddenFormItems.push(hiddenFormItem);
    }
  });

  //新增操作：
  const handleAddData = () => {
    defaultFormData.value = {};
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }

    //新增时，将需隐藏项isHidden设置为false
    hiddenFormItems.forEach((item) => (item.isHidden = false));

    //回调函数
    addCallback && addCallback();
  };

  //编辑操作：
  const handleEditData = (item: any) => {
    defaultFormData.value = { ...item };
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }

    //编辑时，将需隐藏项isHidden设置为true
    hiddenFormItems.forEach((item) => (item.isHidden = true));

    //回调函数
    editCallback && editCallback(item);
  };

  return [pageModalRef, handleAddData, handleEditData, defaultFormData];
}
