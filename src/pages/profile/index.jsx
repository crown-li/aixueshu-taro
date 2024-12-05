import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtList, AtListItem, AtIcon } from "taro-ui";
import "taro-ui/dist/style/components/icon.scss";
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import "./index.scss";


export default function Profile() {
  const menuItems = [
    {
      title: "关注设置",
      icon: "bookmark",
      description: "管理您关注的领域和研究方向",
      url: "/pages/onboarding/fieldSelection/index",
    },
    {
      title: "我的收藏",
      icon: "star",
      description: "查看已收藏的文章",
      url: "/pages/profile/favorites/index",
    },
    {
      title: "阅读历史",
      icon: "clock",
      description: "浏览最近阅读的文章",
      url: "/pages/profile/history/index",
    },
    {
      title: "推送设置",
      icon: "settings",
      description: "设置文章推送频率和方式",
      url: "/pages/profile/settings/index",
    },
  ];

  const handleClick = (url) => {
    Taro.navigateTo({ url });
  };

  return (
    <View className="profile-container">
      <Header title="个人中心" showBack={false} />
      <Container className="mt-6 pt-[calc(3.5rem+env(safe-area-inset-top))] pb-[calc(4rem+env(safe-area-inset-bottom))]">
        <View className="space-y-6">
            {menuItems.map((item) => (
                <View
                    key={item.title}
                    className="w-full flex items-center p-4 bg-white rounded-lg shadow-sm box-border"
                    onClick={() => handleClick(item.url)}
                >
                    <View className="menu-item-icon w-6 h-6">
                        {/* <AtIcon value={item.icon} size="24" color="#2563eb" /> */}
                        <View className={`at-icon at-icon-${item.icon} text-[#2563eb] text-2xl`}></View>
                    </View>
                    <View className="ml-4 flex-1 text-left">
                        <View className="font-medium">{item.title}</View>
                        <Text className="text-sm text-gray-500">{item.description}</Text>
                    </View>
                    <AtIcon value="chevron-right" className="w-5 h-5 text-gray-400" size="16" color="#999" />
                </View>
            ))}
        </View>
      </Container>
    </View>
  );
}
