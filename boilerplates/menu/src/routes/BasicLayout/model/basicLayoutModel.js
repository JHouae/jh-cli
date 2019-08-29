import munu from '../../../conf/auth';
import { formatMenuList } from '../../../conf/menu.conf';


export default {

  namespace: 'basicLayoutModel',

  state: {
    menuList: formatMenuList(munu),
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {

  },

  reducers: {

  },

};
