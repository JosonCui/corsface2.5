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
