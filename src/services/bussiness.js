/**
 * Created by Ethan on 2018/1/22.
 */
import request from '../utils/request';
import config from '../utils/config';
import {toQueryString} from '../utils/constant';

export async function getCamreaList(params) {
  return request(`${config.api.getCamreaList}?${toQueryString(params)}`);
}
export async function getPoiList(params) {
  return request(`${config.api.getPoiList}?${toQueryString(params)}`);
}
export async function getAllGroups(params) {
  return request(`${config.api.getAllGroups}?${toQueryString(params)}`);
}
export async function getGroupsList(params) {
  return request(`${config.api.getGroupsList}?${toQueryString(params)}`);
}

export async function alarmRuleList(params) {
  return request(`${config.api.alarmRuleList}?${toQueryString(params)}`);
}

export async function getPoiByOrgIdAndGroupId(params) {
  return request(`${config.api.getPoiByOrgIdAndGroupId}?${toQueryString(params)}`);
}
export async function getGroupListAll(params) {
  return request(`${config.api.getGroupListAll}?${toQueryString(params)}`);
}

export async function addCamrea(params) {
  return request(config.api.addCamrea, {
    method: 'post',
    data: params
  });
}
export async function modifyCamrea(params) {
  return request(config.api.modifyCamrea, {
    method: 'post',
    data: params
  });
}
export async function delCamrea(params) {
  return request(config.api.deleteCamrea, {
    method: 'post',
    data: params
  });
}
export async function uploadFace(params) {
  return request(config.api.uploadFace, {
    method: 'post',
    data: params
  });
}
export async function addPoiByUpload(params) {
  return request(config.api.addPoiByUpload, {
    method: 'post',
    data: params
  });
}
export async function modifyPoi(params) {
  return request(config.api.modifyPoi, {
    method: 'post',
    data: params
  });
}
export async function deletePoi(params) {
  return request(config.api.deletePoi, {
    method: 'post',
    data: params
  });
}
export async function addGroup(params) {
  return request(config.api.addGroup, {
    method: 'post',
    data: params
  });
}
export async function modifyGroup(params) {
  return request(config.api.modifyGroup, {
    method: 'post',
    data: params
  });
}
export async function deleteGroup(params) {
  return request(config.api.deleteGroup, {
    method: 'post',
    data: params
  });
}
export async function addAlarmRule(params) {
  return request(config.api.addAlarmRule, {
    method: 'post',
    data: params
  });
}
export async function modifyAlarmRule(params) {
  return request(config.api.modifyAlarmRule, {
    method: 'post',
    data: params
  });
}
export async function deleteAlarmRule(params) {
  return request(config.api.deleteAlarmRule, {
    method: 'post',
    data: params
  });
}
