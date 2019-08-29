import { customShopList, addShop, deleteShop, updateShop } from './api';

export default {

  namespace: 'store',

  state: {
    shopList: [],
    pageNow: 1,
    pageSize: 10,
    totalCount: 0,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    * customShopList({ payload }, { call, put }) {
      try {
        const data = yield call(customShopList, payload);
        yield put({ type: 'saveShopList', payload: data });
      } catch (error) {
        const { msg } = error.response || {};
        yield put({
          type: 'common/showError',
          msg: msg || 'Network request failed, please try again later',
        });
      }
    },
    * addShop({ payload }, { call, put }) {
      try {
        yield call(addShop, payload);
      } catch (error) {
        const { msg } = error.response || {};
        yield put({
          type: 'common/showError',
          msg: msg || 'Network request failed, please try again later',
        });
      }
    },
    * updateShop({ payload }, { call, put }) {
      try {
        yield call(updateShop, payload);
      } catch (error) {
        const { msg } = error.response || {};
        yield put({
          type: 'common/showError',
          msg: msg || 'Network request failed, please try again later',
        });
      }
    },
    * deleteShop({ payload }, { call, put }) {
      try {
        yield call(deleteShop, payload);
      } catch (error) {
        const { msg } = error.response || {};
        yield put({
          type: 'common/showError',
          msg: msg || 'Network request failed, please try again later',
        });
      }
    },
  },

  reducers: {
    saveShopList(state, { payload }) {
      return { ...state, shopList: payload.datas, pageNow: payload.pageNow, pageSize: payload.pageSize, totalCount: payload.totalCount };
    },
  },

};
