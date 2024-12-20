import Taro from "@tarojs/taro";

export const Toast = {
  show: async ({ message, duration = 2000,mask = true }) => {

    // if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
    //   return new Promise((resolve,reject) => {
    //     wx.showToast({
    //       title: message,
    //       icon: type === 'info' ? 'none' : type,
    //       duration,
    //       success: resolve,
    //       fail: reject
    //     })
    //   })
    // }

    return await Taro.showToast({
      title: message,
      icon: "none",
      duration,
      mask,
    });
  },
  showLoading: async (message = '加载中' ) => {
    return await Taro.showLoading({
      title: message,
    });
  },
  hideLoading: async () => {
    return await Taro.hideLoading();
  },
};
