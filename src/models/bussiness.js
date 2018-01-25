/**
 * Created by Ethan on 2018/1/22.
 */
import { isApiSuccess, apiData } from '../utils/utils';

export default {
  namespace: 'bussiness',
  state: {
    device: {
      addCameraModule: false
    }
  },
  sunscriptions: {},
  effects: {

  },
  reducers: {
    success(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
