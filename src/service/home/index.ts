import cmRequest from '../index';

import { IDataType } from '../types';

export function getPageListData(url: string, queryInfo: any) {
  return cmRequest.post<IDataType>({
    url,
    data: queryInfo
  });
}

export function deletePageData(url: string) {
  return cmRequest.delete<IDataType>({
    url
  });
}

export function createPageData(url: string, data: any) {
  return cmRequest.post<IDataType>({
    url,
    data
  });
}

export function editPageData(url: string, data: any) {
  return cmRequest.patch<IDataType>({
    url,
    data
  });
}
