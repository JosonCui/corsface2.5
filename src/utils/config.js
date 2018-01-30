import window from 'global/window';

export const API_PREFIX = window.CF_API_PREFIX;
// websocket 请求地址
export const WEBSOCKET_URL = CF_WEBSOCKET;
// export const WEBSOCKET_URL = 'http://192.168.1.71:9192/ftmsg';
// export const WEBSOCKET_URL = 'http://10.1.205.169:9192/ftmsg';

// 版本号
export const BASE_VERSION = DF_VERSION;
export const API_VERSION = CF_API_VERSION;
export const WEB_VERSION = CF_WEB_VERSION;

// 分页数量（pageSize）
export const ROLE_CONFIG_PAGE_SIZE = 12;

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
      // 角色配置
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
    addSubOrgunit: `${API_PREFIX}/orgunit/addSubOrgunit.do`,
    deleteOrgunit: `${API_PREFIX}/orgunit/deleteOrgunit.do`,
    getParentByOrgId: `${API_PREFIX}/orgunit/getAllParentIdByOrgId.do`,
      // 设备管理
    getCamreaList: `${API_PREFIX}/camrea/list.do`,
    addCamrea: `${API_PREFIX}/camrea/add.do`,
    modifyCamrea: `${API_PREFIX}/camrea/modify.do`,
    deleteCamrea: `${API_PREFIX}/camrea/delete.do`,
      // 目标人管理
    getPoiList: `${API_PREFIX}/poi/list.do`,
    uploadFace: `${API_PREFIX}/poi/uploadFace.do`,
    addPoiByUpload: `${API_PREFIX}/poi/addByUpload.do`,
    modifyPoi: `${API_PREFIX}/poi/modify.do`,
    deletePoi: `${API_PREFIX}/poi/deletePersons.do`,
      // 目标分组
      getAllGroups: `${API_PREFIX}/group/listAll.do`,

    deletePoi: `${API_PREFIX}/poi/deletePersons.do `,
      // 规则管理
    alarmList: `${API_PREFIX}/alarmConfig/list.do `,
    addAlarm: `${API_PREFIX}/alarmConfig/add.do `,
    modifyAlarm: `${API_PREFIX}/alarmConfig/modify.do`,
    deleteAlarm: `${API_PREFIX}/alarmConfig/delete.do`

  }
};
