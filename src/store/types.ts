import { ILoginState } from './login/types';
import { IHomeState } from './home/types';
import { IAnalysis } from './analysis/types';

export interface IRootState {
  allDepartmentData: any[];
  allRoleData: any[];
  allMenuData: any[];
}

export interface IRootWithModule {
  login: ILoginState;
  home: IHomeState;
  analysis: IAnalysis;
}

export type IStoreType = IRootState & IRootWithModule;
