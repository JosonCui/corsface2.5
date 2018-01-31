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
export const POI_PERSON_PAGE_SIZE = 6;
export const POI_GROUP_PAGE_SIZE = 10;
// 分组类型
export const GROUP_TYPE = ['默认', '白名单', '黑名单'];

// 摄像头参数
export const CAMERA_CONFIG = '{\n' +
        '    "FaceMethods": {\n' +
        '        "detector": "4", \n' +
        '        "detectorCheck": "4", \n' +
        '        "alignment": "0", \n' +
        '        "tracker": "1"\n' +
        '    }, \n' +
        '    "PykoParam": {\n' +
        '        "scalefactor": 1.08, \n' +
        '        "stridefactor": 0.1, \n' +
        '        "qthreshold": 0\n' +
        '    }, \n' +
        '    "ThetaParam": {\n' +
        '        "scalefactor": 0.75, \n' +
        '        "xstep": 0.0125, \n' +
        '        "ystep": 0.0125\n' +
        '    }, \n' +
        '    "IntraParam": {\n' +
        '        "threshold": 0.75\n' +
        '    }, \n' +
        '    "FaceFeatureParam": {\n' +
        '        "gpu_threads": 1, \n' +
        '        "gpudevice": 0\n' +
        '    }, \n' +
        '    "FaceTrackParam": {\n' +
        '        "face_minsize": 0.05, \n' +
        '        "face_maxsize": 0.8, \n' +
        '        "track_facenum": 30, \n' +
        '        "gap": 3, \n' +
        '        "detect_gap": 5, \n' +
        '        "track_gap": 1, \n' +
        '        "margin": 0.5, \n' +
        '        "edge_remove": true, \n' +
        '        "minsize": 50, \n' +
        '        "duration_unvalid": 1.5, \n' +
        '        "duration_valid": 3.5, \n' +
        '        "freq_threshold": 0.35, \n' +
        '        "update_valid_times": 6, \n' +
        '        "face2face_threshold": 0.55, \n' +
        '        "bufferframes": 100, \n' +
        '        "second_removed_live": 2, \n' +
        '        "second_live": 5, \n' +
        '        "faces_live": 15\n' +
        '    }, \n' +
        '    "VideoParam": {\n' +
        '        "area_left": 0.05, \n' +
        '        "area_top": 0.05, \n' +
        '        "area_width": 0.9, \n' +
        '        "area_height": 0.9, \n' +
        '        "det_only": true, \n' +
        '        "track_size_w": 500, \n' +
        '        "det_size_w": 400, \n' +
        '        "orig_size_w": 0, \n' +
        '        "orig_aspect": -1.3333, \n' +
        '        "rotate_angle": 0, \n' +
        '        "check_frontface": true\n' +
        '    }, \n' +
        '    "BgParam": {\n' +
        '        "width": 400, \n' +
        '        "height": 226, \n' +
        '        "submitted": true, \n' +
        '        "submit_orig": true, \n' +
        '        "width_orig": 400, \n' +
        '        "count_orig": 4\n' +
        '    }, \n' +
        '    "IPCameraParam": {\n' +
        '        "url": "http://fms.cntv.lxdns.com/live/flv/channel63.flv", \n' +
        '        "dynamic_background": false, \n' +
        '        "vlc_option": "net-caching=300", \n' +
        '        "video_player": 0, \n' +
        '        "live_port": 8554, \n' +
        '        "live_width": 480, \n' +
        '        "live_buffer": 10\n' +
        '    }\n' +
        '}';


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
    getAllGroups: `${API_PREFIX}/group/listAll.do`, // 无分页
    getGroupsList: `${API_PREFIX}/group/list.do`, // 有分页
    addGroup: `${API_PREFIX}/group/add.do`,
    modifyGroup: `${API_PREFIX}/group/modify.do`,
    deleteGroup: `${API_PREFIX}/group/delete.do`,


      // 规则管理
    alarmRuleList: `${API_PREFIX}/alarmConfig/list.do`,
    addAlarmRule: `${API_PREFIX}/alarmConfig/add.do`,
    modifyAlarmRule: `${API_PREFIX}/alarmConfig/modify.do`,
    deleteAlarmRule: `${API_PREFIX}/alarmConfig/delete.do`

  }
};
