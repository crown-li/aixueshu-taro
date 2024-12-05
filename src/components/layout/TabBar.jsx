import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { HomeIcon, ProfileIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function TabBar() {
  const currentPath = Taro.getCurrentInstance().router?.path;

  const tabs = [
    { icon: HomeIcon, label: "首页", path: "/pages/home/index" },
    { icon: ProfileIcon, label: "我的", path: "/pages/profile/index" },
  ];

  const handleTabClick = (path) => {
    Taro.switchTab({ url: path });
  };

  return (
    <View className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe-bottom">
      <View className="flex justify-around">
        {tabs.map(({ icon: Icon, label, path }) => (
          <View
            key={path}
            onClick={() => handleTabClick(path)}
            className={cn(
              "flex flex-col items-center py-2 px-4",
              currentPath === path ? "text-blue-600" : "text-gray-600"
            )}
          >
            <Icon className="h-6 w-6" />
            <Text className="text-xs mt-1">{label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
