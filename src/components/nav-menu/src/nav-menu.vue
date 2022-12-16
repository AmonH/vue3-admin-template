<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.png" alt="logo" />
      <span v-show="!isCollapsed" class="title">Vue3 + TS</span>
    </div>

    <el-menu
      :default-active="defaultActive"
      active-text-color="#ffd04b"
      background-color="#004d61"
      class="el-menu-vertical"
      :collapse="isCollapsed"
      text-color="#fff"
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <svg-icon
                v-if="item.icon"
                :iconClass="filterIconName(item.icon)"
              />
              <span class="menu-title">{{ item.name }}</span>
            </template>

            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <svg-icon
                  v-if="subitem.icon"
                  :iconClass="filterIconName(subitem.icon)"
                />
                <span class="menu-title">{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item
            :index="item.id + ''"
            @click="handleMenuItemClick(item)"
          >
            <svg-icon v-if="item.icon" :iconClass="filterIconName(item.icon)" />
            <span class="menu-title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
import { pathMapToMenu } from '@/utils/map-menus';

export default defineComponent({
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore();
    const userMenus = computed(() => store.state.login.userMenus);

    const router = useRouter();
    const route = useRoute();

    const currentMenu = pathMapToMenu(userMenus.value, route.path);
    const defaultActive = ref(currentMenu.id + '');

    const filterIconName = (str: string) => {
      const req = /^el-icon-(.+)$/g;
      return str.replace(req, '$1');
    };

    const handleMenuItemClick = (item: any) => {
      const newUrl = item.url.replace(/^\/main(.+)$/g, '$1');
      router.push({ path: newUrl ?? '/not-found' });
    };

    return {
      userMenus,
      defaultActive,
      filterIconName,
      handleMenuItemClick
    };
  }
});
</script>

<style lang="scss" scoped>
$logoH: 36px;

.nav-menu {
  overflow: hidden;
}
.logo {
  height: $logoH;
  line-height: $logoH;
  padding: 20px 0;
  text-align: center;
  color: #fff;
  img {
    height: 100%;
    vertical-align: middle;
  }
  .title {
    padding-left: 10px;
  }
}

.el-menu {
  border-right: none;
  .menu-title {
    padding-left: 5px;
  }
}
</style>
