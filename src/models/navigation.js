/**
 * Created by Ethan on 2018/1/9.
 */
import { isApiSuccess, apiData } from '../utils/utils';
import { navList, getSubModule } from '../services/navigation';

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
      const reg = new RegExp('(^| )parentId=([^;]*)(;|$)');
      const parentId = document.cookie.match(reg)[2];

      //TODO
      const response = yield call(getSubModule, { roleId: 1, parentId });
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            navItem: result
          }
        });
      }
    }
  },
  reducers: {
    success(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
