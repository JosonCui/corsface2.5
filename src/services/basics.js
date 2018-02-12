/**
 * Created by Ethan on 2018/2/1.
 */
import request from '../utils/request';
import config from '../utils/config';
import {toQueryString} from '../utils/constant';

export async function historyPassList(params) {
  return request(`${config.api.historyPassList}?${toQueryString(params)}`);
}
export async function gitALLCamreaList(params) {
  return request(`${config.api.gitALLCamreaList}?${toQueryString(params)}`);
}
export async function getAlarmList(params) {
  return request(`${config.api.alarmList}?${toQueryString(params)}`);
}
export async function deleteTakeImgs(params) {
  return request(config.api.deleteTakeImgs, {
    method: 'post',
    data: params
  });
}
export async function bindFacetrackApi(params) {
  return request(config.api.bindFacetrackApi, {
    method: 'post',
    data: params
  });
}
export async function addByFacetrack(params) {
  return request(config.api.addByFacetrack, {
    method: 'post',
    data: params
  });
}
