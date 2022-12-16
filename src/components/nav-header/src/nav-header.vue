<template>
  <span class="nav-icon" @click="handleFoldClick">
    <i-ep-fold v-if="isFold" class="icon i-ep-fold" />
    <i-ep-expand v-else class="icon i-ep-expand" />
  </span>

  <cm-breadcrumb :breadcrumbs="breadcrumbs" />

  <div class="nav-right">
    <i-ep-SwitchButton class="icon" @click="handleExitClick" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store';
import localCache from '@/utils/cache';

import CmBreadcrumb from '@/base-ui/breadcrumb';
import { pathMapBreadcrumb } from '@/utils/map-menus';

export default defineComponent({
  components: {
    CmBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false);
    const handleFoldClick = () => {
      isFold.value = !isFold.value;
      emit('foldChange', isFold.value);
    };

    //面包屑的数据
    const store = useStore();
    const userMenus = store.state.login.userMenus;
    const route = useRoute();
    const breadcrumbs = computed(() => {
      return pathMapBreadcrumb(userMenus, route.path);
    });

    //退出操作
    const router = useRouter();
    const handleExitClick = () => {
      localCache.deleteCache('token');
      router.push('/home');
    };

    return {
      isFold,
      handleFoldClick,
      breadcrumbs,
      handleExitClick
    };
  }
});
</script>

<style lang="scss" scoped>
.nav-icon {
  display: inline-block;
  width: 28px;
  height: 28px;
  cursor: pointer;
  .icon {
    width: 100%;
    height: auto;
    vertical-align: middle;
  }
}

.nav-breadcrumb {
  display: inline-block;
  padding-left: 20px;
}
.nav-right {
  float: right;
  color: #666;
  .icon {
    vertical-align: middle;
    cursor: pointer;
    &:hover {
      color: rgb(215, 42, 42);
    }
  }
}
</style>
