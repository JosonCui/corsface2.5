/**
 * Created by Ethan on 2018/1/9.
 */
import { routerRedux } from 'dva/router';

import { isApiSuccess, apiData } from '../utils/utils';
import { navList, getSubModule, getRoleByUserName } from '../services/navigation';

export default {
  namespace: 'navigation',
  state: {
    navlist: [],
    navItem: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({pathname}) => {
        dispatch({type: 'permissions', payload: {pathname} });
      });
    }
  },
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
    * permissions({ payload }, {put, call, select}) {
      const navlist = yield select(store => store.navigation.navlist);
      const {pathname} = payload;
      const path = pathname.substring(1);
      const permissList = [];
      if (navlist.length === 0) {
        yield put({type: 'navList'});
        return false;
      }
        // 递归出所有的模块， 与路由匹配
      console.log(navlist);
      navlist.map(value => value.subNavigationDataList.filter(item => {
        if (path === item.url) { permissList.push(path); }
      }));
      console.log(permissList);
      if (path === 'nav') { return false; }
      if (permissList.length === 0) {
        yield put(routerRedux.goBack());
          alert('您当前权限无法访问此页面，请于管理员联系！');
      }
      return false;
    },
    * getSubModule({ payload }, { put, call, select }) {
      const regParent = new RegExp('(^| )parentId=([^;]*)(;|$)');
      const regName = new RegExp('(^| )cf_uname=([^;]*)(;|$)');
      const parentId = document.cookie.match(regParent)[2];
      const userName = document.cookie.match(regName)[2];
      const roleId = yield call(getRoleByUserName, {userName});
      if (isApiSuccess(roleId)) {
        const data = apiData(roleId);
        const response = yield call(getSubModule, { roleId: data.roleId, parentId });
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
