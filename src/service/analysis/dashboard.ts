import cmRequest from '../index';
import { IDataType } from '../types';

enum DashboardAPI {
  goodsCount = '/goods/category/count',
  goodsSale = '/goods/category/sale',
  goodsFavor = '/goods/category/favor',
  cityGoodsSale = '/goods/address/sale'
}

export function getGoodsCount() {
  return cmRequest.get<IDataType>({
    url: DashboardAPI.goodsCount
  });
}

export function getGoodsSale() {
  return cmRequest.get<IDataType>({
    url: DashboardAPI.goodsSale
  });
}

export function getGoodsFavor() {
  return cmRequest.get<IDataType>({
    url: DashboardAPI.goodsFavor
  });
}

export function getCityGoodsSale() {
  return cmRequest.get<IDataType>({
    url: DashboardAPI.cityGoodsSale
  });
}
