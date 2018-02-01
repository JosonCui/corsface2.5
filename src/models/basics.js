/**
 * Created by Ethan on 2018/2/1.
 */
import {} from '../services/basics';
import { isApiSuccess, apiData } from '../utils/utils';

export default {
  namespace: 'basics',
  state: {
    historyPass: {
      passDetailsModal: false,
      addTargetModal: false
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
