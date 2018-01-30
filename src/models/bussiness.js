/**
 * Created by Ethan on 2018/1/22.
 */
import {
  getCamreaList,
  addCamrea,
  modifyCamrea,
  delCamrea,
  getPoiList,
  addPoiByUpload,
  modifyPoi,
  deletePoi,
    getAllGroups
  } from '../services/bussiness';
import { getGroupTree } from '../services/system';
import { isApiSuccess, apiData } from '../utils/utils';

export default {
  namespace: 'bussiness',
  state: {
    device: {
      addCameraModule: false,
      getCameraParams: {
        pageSize: 10,
        pageNo: 1,
        name: '',
        id: '',
        orgunitId: '',
        ip_address: ''
      },
      cameraTableList: [],
      cameraTablePage: {},
      modifyCamera: {
        srcId: '',
        name: '',
        modelType: '',
        categoryId: 1,
        orgunit_id: '',
        ipAddress: '',
        playUrl: '',
        cjdUrl: '',
        cameraUsername: '',
        cameraPassword: '',
        memo: '',
        cjdUuid: '',
        cjdSubid: '',
        config: ''
      },
      deleteCamrea: {
        srcId: ''
      }
    },
    rule: {
      addRuleModule: false
    },
    poiPerson: {
      getPoiListParams: {
        pageSize: 6,
        pageNo: 1,
        name: '',
        gender: '',
        identityCard: '',
        orgunitId: '',
        groupId: '',
        threshold: ''
      },
      poiPersonList: [],
      poiPersonPage: {},
      deletePerson: {
        type: 0,
        personIds: ''
      },
      addPoiParams: {
        personId: '',
        faceCount: 1,
        originCount: 1,
        img_path_1: '',
        originImg_path_1: '',
        name: '',
        gender: '',
        threshold: '',
        groupId: '',
        orgunitId: '',
        identityCard: '',
        impTag: '',
        memo: ''
      },
      imgUrl: '',
      addPoiModalVisiable: false
    },
    poiGroup: {
      allGroups: []
    },
    groupTree: [],
    confirmVisiable: false
  },
  sunscriptions: {},
  effects: {
    // 设备管理
    * getCameraList({ payload }, { put, call, select }) {
      const device = yield select(store => store.bussiness.device);
      const { getCameraParams } = device;
      const response = yield call(getCamreaList, getCameraParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            device: {
              ...device,
              cameraTableList: result.list,
              cameraTablePage: result.page
            }
          }
        });
      } else {
        // TODO
      }
    },
    * addCamera({ payload }, { put, call, select }) {
      const device = yield select(store => store.bussiness.device);
      const { modifyCamera } = device;
      const response = yield call(addCamrea, modifyCamera);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({type: 'getCameraList'});
        yield put({
          type: 'success',
          payload: {
            device: {
              ...device,
              addCameraModule: false,
              modifyCamera: {
                srcId: '',
                name: '',
                modelType: '',
                categoryId: 1,
                orgunit_id: '',
                ipAddress: '',
                playUrl: '',
                cjdUrl: '',
                cameraUsername: '',
                cameraPassword: '',
                memo: '',
                cjdUuid: '',
                cjdSubid: '',
                config: ''
              }
            }
          }
        });
      } else {
        // TODO
      }
    },
    * modifyCamrea({ payload }, { put, call, select }) {
      const device = yield select(store => store.bussiness.device);
      const { modifyCamera } = device;
      const response = yield call(modifyCamrea, modifyCamera);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({type: 'getCameraList'});
        yield put({
          type: 'success',
          payload: {
            device: {
              ...device,
              addCameraModule: false,
              modifyCamera: {
                srcId: '',
                name: '',
                modelType: '',
                categoryId: 1,
                orgunit_id: '',
                ipAddress: '',
                playUrl: '',
                cjdUrl: '',
                cameraUsername: '',
                cameraPassword: '',
                memo: '',
                cjdUuid: '',
                cjdSubid: '',
                config: ''
              }
            }
          }
        });
      } else {
        // TODO
      }
    },
    * deleteCamrea({ payload }, { put, call, select }) {
      const device = yield select(store => store.bussiness.device);
      const {deleteCamrea} = device;
      const response = yield call(delCamrea, deleteCamrea);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({type: 'getCameraList'});
        yield put({
          type: 'success',
          payload: {
            confirmVisiable: false,
            device: {
              ...device,
              deleteCamrea: {
                srcId: ''
              }
            }
          }
        });
      } else {
        // TODO
      }
    },
    * cameraListTranslate({ payload }, { put, select }) {
      const { pageNo, pageSize } = payload;
      const device = yield select(store => store.bussiness.device);
      const { getCameraParams } = device;
      yield put({
        type: 'success',
        payload: {
          device: {
            ...device,
            getCameraParams: {
              ...getCameraParams,
              pageSize,
              pageNo
            }
          }
        }
      });
      yield put({
        type: 'getCameraList'
      });
    },
    * getGroupTree({ payload }, { put, call, select }) {
      const groupTree = yield select(store => store.bussiness.groupTree);
      const response = yield call(getGroupTree);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        const groupTree = [result];
        yield put({
          type: 'success',
          payload: {
            groupTree
          }
        });
      } else {
        // TODO
      }
    },

      // 目标管理
    * getPoiList({payload}, {call, put, select}) {
      const poiPerson = yield select(store => store.bussiness.poiPerson);
      const { getPoiListParams } = poiPerson;
      const response = yield call(getPoiList, getPoiListParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            poiPerson: {
              ...poiPerson,
              poiPersonList: result.list,
              poiPersonPage: result.page
            }
          }
        });
      } else {
            // TODO
      }
    },
    * getAllGroups({payload}, {call, put, select}) {
      const poiGroup = yield select(store => store.bussiness.poiGroup);
      const response = yield call(getAllGroups);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            poiGroup: {
              ...poiGroup,
              allGroups: result
            }
          }
        });
      } else {
            // TODO
      }
    },
    * addPoiByUpload({payload}, {call, put, select}) {
      const poiPerson = yield select(store => store.bussiness.poiPerson);
      const { addPoiParams } = poiPerson;
      const response = yield call(addPoiByUpload, addPoiParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        console.log(result);
        yield put({type: 'getPoiList'});
        yield put({
          type: 'success',
          payload: {
            poiPerson: {
              ...poiPerson,
              addPoiParams: {
                faceCount: 1,
                originCount: 1,
                img_path_1: '',
                originImg_path_1: '',
                name: '',
                gender: '',
                threshold: '',
                groupId: '',
                orgunitId: '',
                identityCard: '',
                impTag: '',
                memo: ''
              },
              addPoiModalVisiable: false,
              imageUrl: ''
            }
          }
        });
      } else {
            // TODO
      }
    },
    * modifyPoi({payload}, {call, put, select}) {
      const poiPerson = yield select(store => store.bussiness.poiPerson);
      const { addPoiParams } = poiPerson;
      const response = yield call(modifyPoi, addPoiParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        console.log(result);
        yield put({type: 'getPoiList'});
        yield put({
          type: 'success',
          payload: {
            poiPerson: {
              ...poiPerson,
              addPoiParams: {
                faceCount: 1,
                originCount: 1,
                img_path_1: '',
                originImg_path_1: '',
                name: '',
                gender: '',
                threshold: '',
                groupId: '',
                orgunitId: '',
                identityCard: '',
                impTag: '',
                memo: ''
              },
              addPoiModalVisiable: false,
              imageUrl: ''
            }
          }
        });
      } else {
            // TODO
      }
    },
    * deletePoi({payload}, {call, put, select}) {
      const poiPerson = yield select(store => store.bussiness.poiPerson);
      const {deletePerson} = poiPerson;
      const response = yield call(deletePoi, deletePerson);
      if (isApiSuccess(response)) {
        yield put({ type: 'success',
          payload: {
            confirmVisiable: false
          }});
        yield put({type: 'getPoiList'});
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
