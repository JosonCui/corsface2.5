/**
 * Created by Ethan on 2018/1/9.
 */
import { isApiSuccess, apiData } from '../utils/utils';
import { navList, getSubModule, getRoleByUserName } from '../services/navigation';

export default {
  namespace: 'navigation',
  state: {
    navlist: [],
    navItem: []
  },
  subscriptions: {},
  effects: {
    * navList({ payload }, { put, call }) {
      const response = yield call(navList);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            navlist: result
          }
        });
      }
    },
    * getSubModule({ payload }, { put, call, select }) {
      const regParent = new RegExp('(^| )parentId=([^;]*)(;|$)');
      const regName = new RegExp('(^| )cf_uname=([^;]*)(;|$)');
      const parentId = document.cookie.match(regParent)[2];
      const userName = document.cookie.match(regName)[2];
      const roleId = yield call(getRoleByUserName, {userName});
      if (isApiSuccess(roleId)) {
        const response = yield call(getSubModule, { roleId: 1, parentId });
        if (isApiSuccess(response)) {
          const result = apiData(response);
          yield put({
            type: 'success',
            payload: {
              navItem: result
            }
          });
        } else {
          // TODO
        }
      } else {
        // TODO
      }
    }
  },
  reducers: {
    success(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
