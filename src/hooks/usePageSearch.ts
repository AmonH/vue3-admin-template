import { ref } from 'vue';
import PageTable from '@/components/page-table';

export function usePageSearch() {
  const pageTableRef = ref<InstanceType<typeof PageTable>>();

  const handleSearchClick = (searchInfo: any) => {
    pageTableRef.value?.getPageListData(searchInfo);
  };
  const handleResetClick = () => {
    pageTableRef.value?.getPageListData();
  };

  return [pageTableRef, handleSearchClick, handleResetClick];
}
