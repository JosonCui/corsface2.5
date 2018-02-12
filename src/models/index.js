/**
 * Created by Jason on 2018/2/5.
 */

import { getIshomeModuleByRid } from '../services/index';
import { getRoleByUserName } from '../services/navigation';
import { isApiSuccess, apiData } from '../utils/utils';

export default {
  namespace: 'index',
  state: {
    initModule: {}
  },
  sunscriptions: {},
  effects: {
    * getIshomeModuleByRid({payload}, {put, call}) {
        // const regParent = new RegExp('(^| )parentId=([^;]*)(;|$)');
      const regName = new RegExp('(^| )cf_uname=([^;]*)(;|$)');
        // const parentId = document.cookie.match(regParent)[2];
      const userName = document.cookie.match(regName)[2];
      const roleId = yield call(getRoleByUserName, { userName });
      if (isApiSuccess(roleId)) {
        const data = apiData(roleId);
        const response = yield call(getIshomeModuleByRid, {roleId: data.roleId});
        if (isApiSuccess(response)) {
          const result = apiData(response);
          yield put({
            type: 'success',
            payload: {
              initModule: result
            }
          });
            // 将parentId存在cookie中，用于生成侧边栏
            document.cookie = `parentId=${result.parentId}`;
        }
      }
    }

  },
  reducers: {
    success(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
