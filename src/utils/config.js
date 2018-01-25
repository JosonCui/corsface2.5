import window from 'global/window';

const API_PREFIX = window.CF_API_PREFIX;
// websocket 请求地址
export const WEBSOCKET_URL = CF_WEBSOCKET;
// export const WEBSOCKET_URL = 'http://192.168.1.71:9192/ftmsg';
// export const WEBSOCKET_URL = 'http://10.1.205.169:9192/ftmsg';

// 版本号
export const BASE_VERSION = DF_VERSION;
export const API_VERSION = CF_API_VERSION;
export const WEB_VERSION = CF_WEB_VERSION;


export const INDEX_ALARM_SIZE = 100;
export const INDEX_FACE_SIZE = 300;

export const ACTUAL_ALARM_SIZE = 12;

// export const FACE_PAGE_SIZE = 33;
export const FACE_PAGE_SIZE = 40;

export const ALARM_PAGE_SIZE = 15;

export const EXPAND_IMG_SIZE = 18;

export const NEW_PERSON_FACE_IMG_SIZE = 10;

export const CONTRAST_FACE_PAGE_SIZE = 8;

export const SYSTEM_TARGET_GROUP_SIZE = 11;

export const SYSTEM_TARGET_PERSON_IMAGE_UPLOAD_SIZE = 10;

export const SEARCH_FACE_PAGE_SIZE = 20;
export const SEARCH_POI_PAGE_SIZE = 21;

export const ALARM_TYPE = ['白名单', '黑名单'];

export const SYSTEM_TARGET_PERSON_SIZE = 32;

export const CAMERA_PAGE_SIZE = 11;


export default {
  api: {
    // 导航模块
    navList: `${API_PREFIX}/navigation/getNavigationList.do`,
      getSubModule: `${API_PREFIX}/module/getSubModuleByRlIdAndMdId.do`,
    // 用户模块
    getUserList: `${API_PREFIX}/scuser/list.do`,
    addUser: `${API_PREFIX}/scuser/add.do`,
    editUser: `${API_PREFIX}/scuser/modify.do`,
    deleteUser: `${API_PREFIX}/scuser/delete.do`,
      // 角色配置模块
    getRoleList: `${API_PREFIX}/mqrole/list.do`,
    getAllRoles: `${API_PREFIX}/mqrole/getAllRole.do`,
    addRole: `${API_PREFIX}/mqrole/add.do`,
    editRole: `${API_PREFIX}/mqrole/modify.do`,
    deleteRole: `${API_PREFIX}/mqrole/delete.do`,
    // 权限管理
    getRoleExceptInit: `${API_PREFIX}/mqrole/getRoleExceptInit.do`,
    getAllModule: `${API_PREFIX}/module/getAllModule.do`,
    bindRoleModule: `${API_PREFIX}/module/bindRoleModule.do`,
    searchRolePower: `${API_PREFIX}/module/getModuleByRole.do`,
      // 组织管理
    getGroupTree: `${API_PREFIX}/orgunit/getTree.do`,
    getOrgunitById: `${API_PREFIX}/orgunit/getOrgunitById.do`,
    modifyOrgunit: `${API_PREFIX}/orgunit/modifySubOrgunit.do`,
      addSubOrgunit: `${API_PREFIX}/orgunit/addSubOrgunit.do` ,
      deleteOrgunit: `${API_PREFIX}/orgunit/deleteOrgunit.do`,
      getParentByOrgId: `${API_PREFIX}/orgunit/getAllParentIdByOrgId.do`,
  }
};
