/**
 * Created by Jason on 2018/1/16.
 */
import MD5 from 'crypto-js/md5';

import { ROLE_CONFIG_PAGE_SIZE } from '../utils/config';
import { isApiSuccess, apiData } from '../utils/utils';
import {getRoleList,
        getAllRoles,
        addRole,
        editRole,
        deleteRole,
        getAllModule,
        bindRoleModule,
        getRoleExceptInit,
        searchRolePower,
        getUserList,
        addUser,
        editUser,
        deleteUser,
        getGroupTree,
    getOrgunitById,
    modifyOrgunit,
    addSubOrgunit,
    deleteOrgunit,
    getParentByOrgId
      } from '../services/system';

export default {
  namespace: 'system',
  state: {
    confirmVisiable: false,
    roleCfg: {
      getRoleParams: {
        pageSize: ROLE_CONFIG_PAGE_SIZE,
        pageNo: 1,
        roleId: ''
      },
      roleTableList: [],
      roleListPage: {},
      roleList: [],
      addRoleModalVisiable: false,
      modifyRole: {
        id: '',
        name: '',
        memo: ''
      },
      deleteRole: {
        id: ''
      }
    },
    userCfg: {
      getUserParams: {
        pageSize: 10,
        pageNo: 1,
        roleId: '',
        orgunitId: '',
        name: ''
      },
      userListPage: {},
      addUserModalVisiable: false,
      modifyUser: {
        id: '',
        name: '',
        loginName: '',
        password: '',
        phone: '',
        roleId: '',
        orgunitId: '',
        email: '',
        memo: ''
      },
      deleteUser: {
        type: 1,
        ids: ''
      }
    },
    powerCfg: {
      bindRoleModuleParams: {
        powerRoleId: '',
        moduleId: []
      },
      powerList: [],
      moduleList: []
    },
    groupCfg: {
      groupTree: [],
      dataList: [],
      parentList: [],
      orgunitMsg: {
        id: '',
        name: '',
        parentId: '',
        coordinate: '',
        memo: '',
        code: '',
        sort_num: ''
      },
      newSubOrgunitParams: {
        name: '',
        parentId: '',
        coordinate: '',
        memo: '',
        code: '',
        sort_num: ''
      },
      comfirmVisiable: false
    }
  },
  sunscriptions: {

  },
  effects: {
    // 角色管理
    * getRoleList({ payload }, { put, call, select }) {
      const roleCfg = yield select(store => store.system.roleCfg);
      const { getRoleParams } = roleCfg;
      const response = yield call(getRoleList, getRoleParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            roleCfg: {
              ...roleCfg,
              roleTableList: result.list,
              roleListPage: result.page
            }
          }
        });
        yield put({ type: 'getAllRoles' });
      } else {
          // TODO
      }
    },
    * getAllRoles({ payload }, { put, call, select }) {
      const roleCfg = yield select(store => store.system.roleCfg);
      const response = yield call(getAllRoles);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            roleCfg: {
              ...roleCfg,
              roleList: result
            }
          }
        });
      } else {
          // TODO
      }
    },

    * addRole({ payload }, { put, call, select }) {
      const roleCfg = yield select(store => store.system.roleCfg);
      const { modifyRole } = roleCfg;
      const response = yield call(addRole, modifyRole);
      if (isApiSuccess(response)) {
        yield put({type: 'getRoleList'});
        yield put({
          type: 'success',
          payload: {
            roleCfg: {
              ...roleCfg,
              addRoleModalVisiable: false,
              modifyRole: {
                roleId: '',
                name: '',
                memo: ''
              }
            }
          }

        });
      } else {
        // 提示错误 TODO
      }
    },

    * modifyRole({ payload }, { put, call, select }) {
      const roleCfg = yield select(store => store.system.roleCfg);
      const { modifyRole } = roleCfg;
      const response = yield call(editRole, modifyRole);
      if (isApiSuccess(response)) {
        yield put({type: 'getRoleList'});
        yield put({
          type: 'success',
          payload: {
            roleCfg: {
              ...roleCfg,
              addRoleModalVisiable: false,
              modifyRole: {
                roleId: '',
                name: '',
                memo: ''
              }
            }
          }

        });
      } else {
        // 提示错误 TODO
      }
    },
    * deleteRole({ payload }, { put, call, select }) {
      const roleCfg = yield select(store => store.system.roleCfg);
      const params = roleCfg.deleteRole;
      const response = yield call(deleteRole, params);
      if (isApiSuccess(response)) {
        yield put({type: 'getRoleList'});
        yield put({
          type: 'success',
          payload: {
            confirmVisiable: false,
            roleCfg: {
              ...roleCfg,
              deleteRole: {
                id: ''
              }
            }
          }
        });
      } else {
        // 提示错误 TODO
      }
    },
    // 权限配置
    * getPowerRoles({ payload }, { put, call, select }) {
      const powerCfg = yield select(store => store.system.powerCfg);
      const response = yield call(getRoleExceptInit);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            powerCfg: {
              ...powerCfg,
              powerList: result
            }
          }
        });
      } else {
          // TODO
      }
    },
    * getAllModule({ payload }, { put, call, select }) {
      const powerCfg = yield select(store => store.system.powerCfg);
      const response = yield call(getAllModule);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            powerCfg: {
              ...powerCfg,
              moduleList: result
            }
          }
        });
        yield put({ type: 'getPowerRoles' });
      } else {
          // TODO
      }
    },
    * searchRolePower({ payload }, { call, put, select }) {
      const powerCfg = yield select(store => store.system.powerCfg);
      const { bindRoleModuleParams } = powerCfg;
      const response = yield call(searchRolePower, { roleId: bindRoleModuleParams.powerRoleId});
      if (isApiSuccess(response)) {
        const result = apiData(response);
        const moduleId = result && result.length > 0 ? result.map(item => item.moduleId) : [];
        yield put({
          type: 'success',
          payload: {
            powerCfg: {
              ...powerCfg,
              bindRoleModuleParams: {
                ...bindRoleModuleParams,
                moduleId // TODO
              }
            }
          }
        });
      } else {
     // 提示错误 TODO
      }
    },
    * bindRoleModule({ payload }, { put, call, select }) {
      const powerCfg = yield select(store => store.system.powerCfg);
      const { bindRoleModuleParams } = powerCfg;
      const moduleIds = bindRoleModuleParams.moduleId.join(',');
      if (moduleIds === '') {
        return false;// modal
      }
      const response = yield call(bindRoleModule, {
        roleId: bindRoleModuleParams.powerRoleId,
        moduleIds
      });
      if (isApiSuccess(response)) {
        const result = apiData(response);
      } else {
          // TODO
      }
    },
    * rolePageTranslate({ payload }, { put, select }) {
      const { pageNo, pageSize } = payload;
      const roleCfg = yield select(store => store.system.roleCfg);
      const {getRoleParams} = roleCfg;
      yield put({
        type: 'success',
        payload: {
          roleCfg: {
            ...roleCfg,
            getRoleParams: {
              ...getRoleParams,
              pageSize,
              pageNo
            }
          }
        }
      });
      yield put({
        type: 'getRoleList'
      });
    },

    // 角色配置

    * getUserList({ payload }, { put, call, select }) {
      const userCfg = yield select(store => store.system.userCfg);
      const { getUserParams } = userCfg;
      const response = yield call(getUserList, getUserParams);
      console.log(response);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            userCfg: {
              ...userCfg,
              userTableList: result.list,
              userListPage: result.page
            }
          }
        });
      } else {
          // TODO
      }
    },
    * addUser({ payload }, { put, call, select }) {
      const userCfg = yield select(store => store.system.userCfg);
      const { modifyUser } = userCfg;
      modifyUser.orgunitId -= 0;
      const { password } = modifyUser;
      const pwdMD5 = MD5(password).toString();
      const response = yield call(addUser, {...modifyUser, password: pwdMD5, phone: '18519334233'});
      if (isApiSuccess(response)) {
        yield put({type: 'getUserList'});
        yield put({
          type: 'success',
          payload: {
            userCfg: {
              ...userCfg,
              addUserModalVisiable: false,
              modifyUser: {
                id: '',
                name: '',
                loginName: '',
                password: '',
                phone: '',
                roleId: '',
                orgunitId: '',
                email: '',
                memo: ''
              }
            }
          }

        });
      } else {
        // 提示错误 TODO
      }
    },
    * modifyUser({ payload }, { put, call, select }) {
      const userCfg = yield select(store => store.system.userCfg);
      const { modifyUser } = userCfg;
      const response = yield call(editUser, modifyUser);
      if (isApiSuccess(response)) {
        yield put({type: 'getUserList'});
        yield put({
          type: 'success',
          payload: {
            userCfg: {
              ...userCfg,
              addUserModalVisiable: false,
              modifyUser: {
                id: '',
                name: '',
                loginName: '',
                password: '',
                phone: '',
                roleId: '',
                orgunitId: '',
                email: '',
                memo: ''
              }
            }
          }

        });
      } else {
        // 提示错误 TODO
      }
    },
    * deleteUser({ payload }, { put, call, select }) {
      const userCfg = yield select(store => store.system.userCfg);
      const params = userCfg.deleteUser;
      const response = yield call(deleteUser, params);
      if (isApiSuccess(response)) {
        yield put({type: 'getUserList'});
        yield put({
          type: 'success',
          payload: {
            confirmVisiable: false,
            userCfg: {
              ...userCfg,
              deleteUser: {
                ...params,
                ids: ''
              }
            }
          }
        });
      } else {
        // 提示错误 TODO
        console.log(response);
      }
    },
    * roleUserTranslate({ payload }, { put, select }) {
      const { pageNo, pageSize } = payload;
      const userCfg = yield select(store => store.system.userCfg);
      const { getUserParams } = userCfg;
      yield put({
        type: 'success',
        payload: {
          userCfg: {
            ...userCfg,
            getUserParams: {
              ...getUserParams,
              pageSize,
              pageNo
            }
          }
        }
      });
      yield put({
        type: 'getUserList'
      });
    },
    // 组织配置
    * getGroupTree({ payload }, { put, call, select }) {
      const groupCfg = yield select(store => store.system.groupCfg);
      const response = yield call(getGroupTree);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        const groupTree = [result];
        yield put({
          type: 'success',
          payload: {
            groupCfg: {
              ...groupCfg,
              groupTree
            }
          }
        });
        yield put({
          type: 'generateList',
          payload: { data: groupTree }
        });
      } else {
          // TODO
      }
    },
    * generateList({ payload }, { put, select }) {
      const groupCfg = yield select(store => store.system.groupCfg);
      const { dataList } = groupCfg;
      const { data } = payload;
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.id;
        const title = node.title;
        dataList.push({ key, title });
        if (node.children) {
          yield put({
            type: 'generateList',
            payload: {
              data: node.children
            }
          });
        }
      }
      yield put({
        type: 'success',
        payload: {
          groupCfg: {
            ...groupCfg,
            dataList
          }
        }
      });
    },
    * getOrgunitById({ payload }, { put, select, call }) {
      const { orgunitId } = payload;
      const groupCfg = yield select(store => store.system.groupCfg);
      const { orgunitMsg } = groupCfg;
      const response = yield call(getOrgunitById, { orgunitId });
      if (isApiSuccess(response)) {
        const result = apiData(response);
        console.log(result);
        yield put({
          type: 'success',
          payload: {
            groupCfg: {
              ...groupCfg,
              orgunitMsg: {
                ...orgunitMsg,
                id: result.orgunitId,
                name: result.orgunitName,
                parentId: result.parent_id,
                coordinate: result.coordinate,
                memo: result.memo,
                code: result.code,
                sort_num: result.sort_num
              }
            }
          }
        });
      } else {
      // 提示错误 TODO
      }
    },
    * modifyOrgunit({ payload }, { put, select, call }) {
      // 检查必要参数是否为空 TODO
      const groupCfg = yield select(store => store.system.groupCfg);
      const params = groupCfg.orgunitMsg;
      const response = yield call(modifyOrgunit, params);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'getGroupTree'
        });
      } else {
          // TODO
      }
    },
    * newOrgunit({ payload }, { put, select, call }) {
          // 检查必要参数是否为空 TODO
      const groupCfg = yield select(store => store.system.groupCfg);
      const params = groupCfg.newSubOrgunitParams;
      const response = yield call(addSubOrgunit, params);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'getGroupTree'
        });
      } else {
        // TODO
      }
    },
    * deleteOrgunit({ payload }, { put, select, call }) {
          // 检查必要参数是否为空 TODO
      const groupCfg = yield select(store => store.system.groupCfg);
      const { orgunitId } = payload;
      const response = yield call(deleteOrgunit, {id: orgunitId});
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'getGroupTree'
        });
        yield put({
          type: 'success',
          payload: {
            groupCfg: {
              ...groupCfg,
              orgunitMsg: {
                id: '',
                name: '',
                parentId: '',
                coordinate: '',
                memo: '',
                code: '',
                sort_num: ''
              }
            }
          }
        });
      } else {
        // TODO
      }
    },
    * getParentByOrgId({ payload }, { put, call, select }) {
      const groupCfg = yield select(store => store.system.groupCfg);
      console.log(groupCfg);
      const response = yield call(getParentByOrgId, { orgunitId: payload.id });
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            groupCfg: {
              ...groupCfg,
              parentList: result
            }
          }
        });
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
