import { Module } from 'vuex';
import router from '@/router';

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login';

import localCache from '@/utils/cache';
import { mapMenusToRoutes } from '@/utils/map-menus';

import { IRootState } from '../types';
import { ILoginState } from './types';
import { IAccount } from '@/service/login/types';

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;

      //将获取的路由动态的添加到router中
      const routes = mapMenusToRoutes(userMenus);
      routes.forEach((route) => {
        router.addRoute('Home', route); //第一个参数为路由表中路由的name属性值
      });
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      //1. 实现登录逻辑
      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult.data;

      commit('changeToken', token);
      localCache.setCache('token', token);

      //2. 请求用户信息数据
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      commit('changeUserInfo', userInfo);
      localCache.setCache('userInfo', userInfo);

      //3. 请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      commit('changeUserMenus', userMenus);
      localCache.setCache('userMenus', userMenus);

      //4. 跳转到首页
      router.push('/home');

      // 发送初始化的请求（allRoleData, allDepartmentData）
      // 模块里dispatch根里的请求，需设置root为true
      dispatch('getInitDataAction', null, { root: true });
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token');
      if (token) {
        commit('changeToken', token);
      }

      const userInfo = localCache.getCache('userInfo');
      if (userInfo) {
        commit('changeUserInfo', userInfo);
      }

      const userMenus = localCache.getCache('userMenus');
      if (userMenus) {
        commit('changeUserMenus', userMenus);
      }

      dispatch('getInitDataAction', null, { root: true });
    }
  }
};

export default loginModule;
