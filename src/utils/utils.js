import {Modal} from 'antd';

export function apiData({response, err}) {
  return response.data.result;
}

export function isApiSuccess({response, err}) {
  if (err) {
    return false;
  }
  const {data} = response;
  if (data && data.status === 0) {
    return true;
  }

  return false;
}

export function cfShowWarning(title, content, okText) {
  Modal.warn({title, content, okText});
}

export function cfShowApiFail({
  response,
  err
}, opt = {}) {
  // api status !=0  or http error, or else
  let {title, content, okText} = opt;
  let message;

  title = title || '操作失败';
  okText = okText || '确定';

  if (response) {
    const {data} = response;
    message = data.message;
  }

  if (err) {

    if (err.response) {
      message = `${err.response.status} ${err.response.statusText}`;
    } else if (err.request) {
      message = '网络错误';
    } else {
      message = '发生错误';
    }
  }

  content = content || message;

  Modal.warn({title, content, okText});
}