import { useState,useEffect } from "react";
import { View, Text,Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
// import { GraduationCap } from "@/components/icons";
import { Container } from '@/components/layout/Container';
import { getUserSubscriptions } from "@/api/index";
import { Toast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import "./index.scss";
// import logoImg from './../../../assets/logo.png'
import { doLogin } from '@/utils/login'

const logoImg = 'data:image/png;base64,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'

export default function Welcome() {
  const [showPage, setShowPage] = useState(false)
  
  const onLunch = async () => {
    const token = Taro.getStorageSync('token')
    
    // 未登录状态,需要先登录
    if (!token) {
      setShowPage(true)
      return
    }
    
    try {
      // 获取用户订阅信息
      Toast.showLoading()
      const res = await getUserSubscriptions()
      const hasSubscriptions = res.data && res.data.length > 0

      // 没有订阅,跳转到订阅页面
      if (!hasSubscriptions) {
        Taro.redirectTo({
          url: '/pages/onboarding/fieldSelection/index'
        })
        return
      }
      
      await Taro.switchTab({
        url: '/pages/home/index'
      })
    } finally {
      Toast.hideLoading()
    }
  }

  useEffect(() => {
    onLunch()
  },[])

  return showPage && (
    <Container className="flex flex-col items-center justify-center min-h-screen">
      {/* <GraduationCap className="welcome-icon" /> */}
      <Image className="lucide lucide-graduation-cap w-24 h-24 text-blue-600 mb-8" src={logoImg} />

        <Text className="text-3xl font-bold text-center mb-4">欢迎使用爱学术订阅</Text>

        <Text className="text-gray-600 text-center mb-8 px-6">
          基于AI技术，为您提供个性化的前沿研究进展订阅服务
        </Text>

        <View className="space-y-4 w-full px-6 box-border">
          <Button
            className="w-full"
            size="lg"
            onClick={doLogin}
          >
            开始使用
          </Button>
        </View>
    </Container>
  );
}
