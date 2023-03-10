import { Module } from 'vuex';
import { IRootState } from '../types';
import { IHomeState } from './types';

import {
  createPageData,
  deletePageData,
  editPageData,
  getPageListData
} from '@/service/home';

import capitalize from 'lodash/capitalize';

const systemModule: Module<IHomeState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      departmentList: [],
      departmentCount: 0,
      roleList: [],
      roleCount: 0,
      menuList: [],
      menuCount: 0,
      goodsList: [],
      goodsCount: 0
    };
  },
  getters: {
    getHomeStateList(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
      };
    },
    getHomeStateCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`];
      };
    }
  },
  mutations: {
    changeUsersList(state, list: any[]) {
      state.usersList = list;
    },
    changeUsersCount(state, count: number) {
      state.usersCount = count;
    },
    changeDepartmentList(state, list: any[]) {
      state.departmentList = list;
    },
    changeDepartmentCount(state, count: number) {
      state.departmentCount = count;
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list;
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count;
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list;
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count;
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list;
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count;
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageUrl = `/${payload.pageName}/list`;
      const pageResult = await getPageListData(pageUrl, payload.queryInfo);

      const { list, totalCount } = pageResult.data;
      commit(`change${capitalize(payload.pageName)}List`, list);
      commit(`change${capitalize(payload.pageName)}Count`, totalCount);
    },
    async deletePageDataAction({ dispatch }, payload: any) {
      const { pageName, id } = payload;
      const pageUrl = `/${pageName}/${id}`;

      //???????????????????????????
      await deletePageData(pageUrl);

      //???????????????????????????
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },
    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, formData } = payload;
      const pageUrl = `/${pageName}`;

      await createPageData(pageUrl, formData);

      //???????????????????????????
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },
    async editPageDataAction({ dispatch }, payload: any) {
      const { pageName, formData, id } = payload;
      const pageUrl = `/${pageName}/${id}`;

      await editPageData(pageUrl, formData);

      //???????????????????????????
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    }
  }
};

export default systemModule;
