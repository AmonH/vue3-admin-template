import { createStore, Store, useStore as useVuexStore } from 'vuex';

import login from './login';
import home from './home';
import analysis from './analysis';

import { getPageListData } from '@/service/home';

import { IRootState, IStoreType } from './types';

const store = createStore<IRootState>({
  state() {
    return {
      allDepartmentData: [],
      allRoleData: [],
      allMenuData: []
    };
  },
  getters: {
    getInitData(state) {
      return (type: string) => {
        return (state as any)[`all${type}Data`];
      };
    }
  },
  mutations: {
    changeAllDepartmentData(state, list) {
      state.allDepartmentData = list;
    },
    changeAllRoleData(state, list) {
      state.allRoleData = list;
    },
    changeMenuData(state, menuList) {
      state.allMenuData = menuList;
    }
  },
  actions: {
    async getInitDataAction({ commit }) {
      // 请求部门数据
      const departmentRes = await getPageListData('/department/list', {
        offset: 0,
        size: 9999
      });
      commit('changeAllDepartmentData', departmentRes.data.list);

      // 请求角色数据
      const roleRes = await getPageListData('/role/list', {
        offset: 0,
        size: 9999
      });
      commit('changeAllRoleData', roleRes.data.list);

      //请求菜单数据
      const menuRes = await getPageListData('/menu/list', {
        offset: 0,
        size: 9999
      });
      commit('changeMenuData', menuRes.data.list);
    }
  },
  modules: {
    login,
    home,
    analysis
  }
});

//重新初始化store数据
export function setupStore() {
  store.dispatch('login/loadLocalLogin');
}

//重写useStore，以此使得typescript更好得兼容vuex
export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default store;
