import { View, Text,Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
// import { GraduationCap } from "@/components/icons";
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import "./index.scss";
import logoImg from './../../../assets/logo.png'

export default function Welcome() {
  const handleStart = () => {
    Taro.navigateTo({
      url: "/pages/onboarding/fieldSelection/index",
    });
  };

  return (
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
            onClick={handleStart}
          >
            开始使用
          </Button>
        </View>
    </Container>
  );
}
