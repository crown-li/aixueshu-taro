import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import "taro-ui/dist/style/components/icon.scss";
import { cn } from "@/lib/utils";

export function Header({
  title,
  readProgress = 0,
  showBack = true,
  onBack,
  className,
  rightElement,
}) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      Taro.navigateBack();
    }
  };

  return (
    // Taro.getEnv() === Taro.ENV_TYPE.WEB && (
    <View className={cn(
      "w-full fixed top-[0] left-[0] right-[0] bg-white  border-gray-200 pt-safe-top",
      className
    )}>
      <View>
        <View className="flex items-center justify-between h-14 px-4">
          {showBack && (
            <View onClick={handleBack} className="p-2 -ml-2">
              <View className={`at-icon at-icon-chevron-left  text-2xl`}></View>
            </View>
          )}
          <Text className="text-lg font-semibold absolute left-1/2 -translate-x-1/2">
            {title}
          </Text>
          <View className="ml-auto">{rightElement}</View>
        </View>
      </View>
      {
        readProgress ? (
        <View className="h-1 bg-gray-100 z-10">
          <View
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${readProgress}%` }}
          />
        </View>
      ) : null}
      </View>
    // ) 
  );
}
