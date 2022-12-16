import { Module } from 'vuex';
import { IRootState } from '../types';
import { IAnalysis } from './types';

import {
  getGoodsCount,
  getGoodsSale,
  getGoodsFavor,
  getCityGoodsSale
} from '@/service/analysis/dashboard';

const analysisModule: Module<IAnalysis, IRootState> = {
  namespaced: true,
  state() {
    return {
      goodsCount: [],
      goodsSale: [],
      goodsFavor: [],
      cityGoodsSale: []
    };
  },
  mutations: {
    changeGoodsCount(state, list) {
      state.goodsCount = list;
    },
    changeGoodsSale(state, list) {
      state.goodsSale = list;
    },
    changeGoodsFavor(state, list) {
      state.goodsFavor = list;
    },
    changeCityGoodsSale(state, list) {
      state.cityGoodsSale = list;
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const goodsCountRes = await getGoodsCount();
      commit('changeGoodsCount', goodsCountRes.data);

      const goodsSaleRes = await getGoodsSale();
      commit('changeGoodsSale', goodsSaleRes.data);

      const goodsFavorRes = await getGoodsFavor();
      commit('changeGoodsFavor', goodsFavorRes.data);

      const cityGoodsSaleRes = await getCityGoodsSale();
      commit('changeCityGoodsSale', cityGoodsSaleRes.data);
    }
  }
};

export default analysisModule;
