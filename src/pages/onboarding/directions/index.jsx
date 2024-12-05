import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtButton } from "taro-ui";
import { useUserStore } from "@/store/user";
import "./index.scss";

export default function Directions() {
  const { setDirections } = useUserStore();

  const handleSelectDirections = (selectedDirections) => {
    setDirections(selectedDirections);
    Taro.navigateTo({
      url: "/pages/onboarding/keywords/index",
    });
  };

  return (
    <View className="directions-container">
      <View className="directions-header">
        <Text className="directions-title">选择研究方向</Text>
        <Text className="directions-subtitle">
          请选择您感兴趣的研究方向，我们将为您推荐相关内容
        </Text>
      </View>

      <View className="directions-list">
        {/* TODO: 添加研究方向列表 */}
        <View className="direction-item">
          <Text className="direction-name">人工智能</Text>
        </View>
        <View className="direction-item">
          <Text className="direction-name">机器学习</Text>
        </View>
        <View className="direction-item">
          <Text className="direction-name">深度学习</Text>
        </View>
      </View>

      <View className="directions-button">
        <AtButton
          type="primary"
          onClick={() => handleSelectDirections(["ai", "ml", "dl"])}
        >
          下一步
        </AtButton>
      </View>
    </View>
  );
}
