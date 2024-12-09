import Taro from "@tarojs/taro";
import { Toast } from '@/components/ui/Toast';
import { login } from '@/api/index'

export const doLogin = async () => {
    try {
      // 微信登录获取code
      const { code } = await Taro.login();
      if (!code) {
        throw new Error('微信登录失败');
      }
      
      // 后端登录获取token
      const { data } = await login(code);
      if (!data?.token) {
        throw new Error('获取token失败');
      }

      // 保存token并跳转
      await Taro.setStorageSync('token', data.token);
      Taro.navigateTo({
        url: "/pages/onboarding/fieldSelection/index",
      });
  
    } catch (error) {
      Toast.show({
        message: error.message || '登录失败，请重试',
      });
    }
}
