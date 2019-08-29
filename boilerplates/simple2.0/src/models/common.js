import { message } from 'antd';

message.config({
  maxCount: 1,
});

export default {

  namespace: 'common',

  state: {},

  effects: {

  },

  reducers: {
    showTips(state, action) {
      message.config({
        maxCount: 1,
      });
      message.info(action.msg).then(() => message.destroy());
      return {};
    },
    showError(state, action) {
      message.config({
        maxCount: 1,
      });
      message.error(action.msg).then(() => message.destroy());
      return {};
    },
    showSuccess(state, action) {
      message.config({
        maxCount: 1,
      });
      message.success(action.msg).then(() => message.destroy());
      return {};
    },
  },
};
