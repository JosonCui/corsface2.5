/**
 * Created by Ethan on 2018/2/1.
 */
import { historyPassList, gitALLCamreaList, deleteTakeImgs, bindFacetrackApi, addByFacetrack, getAlarmList } from '../services/basics';
import { getAllGroups } from '../services/bussiness';
import { getGroupTree } from '../services/system';
import { isApiSuccess, apiData } from '../utils/utils';

export default {
  namespace: 'basics',
  state: {
    historyPass: {
      getPassListParams: {
        pageSize: 10,
        pageNo: 1,
        cmOrgunitId: '',
        srcId: '',
        startTime: '',
        endTime: '',
        startPercent: '',
        endPercent: '',
        name: '',
        idCard: '',
        gender: '',
        age: '',
        isglasses: 0,
        ismoustache: 0,
        ishat: 0
      },
      facetrackList: [],
      facetrackPage: {}
    },
    historyPolice: {
      takeImgModal: false
    },
    detailsModal: false,
    addTargetModal: false,
    detailsModalData: {},
    checkTakeImgs: [],
    originImgs: [],
    bindFacetrack: {
      facetrackId: '',
      personId: ''
    },
    newFacetrack: {
      facetrackId: '',
      name: '',
      gender: '',
      threshold: '',
      groupId: '',
      orgunitId: '',
      identityCard: '',
      household_register: ''
    },
    groupTree: [],
    allGroups: [],
    camreaAll: []

  },
  sunscriptions: {},
  effects: {
    * historyPassList({ payload }, { put, call, select }) {
      const historyPass = yield select(store => store.basics.historyPass);
      const { getPassListParams } = historyPass;
      const response = yield call(historyPassList, getPassListParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            historyPass: {
              ...historyPass,
              facetrackList: result.list,
              facetrackPage: result.page
            }
          }
        });
      } else {
        // TODO
      }
    },
    * passListTranslate({ payload }, { put, select }) {
      const { pageNo, pageSize } = payload;
      const historyPass = yield select(store => store.basics.historyPass);
      const { getPassListParams } = historyPass;
      yield put({
        type: 'success',
        payload: {
          historyPass: {
            ...historyPass,
            getPassListParams: {
              ...getPassListParams,
              pageSize,
              pageNo
            }
          }
        }
      });
      yield put({
        type: 'getAlarmRuleList'
      });
    },
    * getGroupTree({ payload }, { put, call }) {
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
    * getAllGroups({payload}, {call, put, select}) {
      const response = yield call(getAllGroups);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            allGroups: result
          }
        });
      } else {
        // TODO
      }
    },

    * gitALLCamreaList({ payload }, { put, call }) {
      const response = yield call(gitALLCamreaList);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            camreaAll: result
          }
        });
      } else {
        // TODO
      }
    },
    * deleteTakeImgs({ payload }, { put, call, select }) {
      const checkTakeImgs = yield select(store => store.basics.checkTakeImgs);
      const checkTakeImgsString = checkTakeImgs.join(',');
      const detailsModalData = yield select(store => store.basics.detailsModalData);
      const originImgs = yield select(store => store.basics.originImgs);
      const { code } = detailsModalData;
      const response = yield call(deleteTakeImgs, {imgNames: checkTakeImgsString, facetrackId: code});
      // 更新detailsModalData数据
      const { imgs } = detailsModalData;
      originImgs.map(value => {
        const index = imgs.indexOf(value);
        imgs.splice(index, 1);
      });
      if (isApiSuccess(response)) {
        yield put({type: 'historyPassList'});
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            checkTakeImgs: '',
            detailsModalData: {
              ...detailsModalData,
              imgs
            },
            originImgs: []
          }
        });
      } else {
        // TODO
      }
    },
    * bindFacetrack({ payload }, { put, call, select }) {
      const bindFacetrack = yield select(store => store.basics.bindFacetrack);
      const response = yield call(bindFacetrackApi, bindFacetrack);

      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            bindFacetrack: {
              facetrackId: '',
              personId: ''
            }
          }
        });
      } else {
        // TODO
      }
    },
    * addFacetrack({ payload }, { put, call, select }) {
      const newFacetrack = yield select(store => store.basics.newFacetrack);
      const detailsModalData = yield select(store => store.basics.detailsModalData);
      const { code } = detailsModalData;
      const response = yield call(addByFacetrack, {...newFacetrack, facetrackId: code});
      if (isApiSuccess(response)) {
        yield put({
          type: 'success',
          payload: {
            newFacetrack: {
              facetrackId: '',
              name: '',
              gender: '',
              threshold: '',
              groupId: '',
              orgunitId: '',
              identityCard: '',
              household_register: ''
            }
          }
        });
      } else {
        const result = apiData(response);
        console.log(result);
      }
    },
    * getAlarmList({payload}, {put, call, select}) {
      const response = yield call(getAlarmList, {pageSize: 10, pageNo: 1});
      if (isApiSuccess(response)) {
        const result = apiData(response);
        console.log(result);
      }
    }

  },
  reducers: {
    success(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
