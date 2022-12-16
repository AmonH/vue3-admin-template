import cmRequest from '../index';

import { IDataType } from '../types';
import { IAccount, ILoginResult } from './types';

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', //用户信息
  UserMenus = '/role/' //用户菜单
}

export function accountLoginRequest(account: IAccount) {
  return cmRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  });
}

export function requestUserInfoById(id: number) {
  return cmRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  });
}

export function requestUserMenusByRoleId(id: number) {
  return cmRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  });
}
