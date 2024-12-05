import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtButton, AtTag } from "taro-ui";
import { useUserStore } from "@/store/user";
import "./index.scss";

export default function Keywords() {
  const { setKeywords, setFirstVisit } = useUserStore();

  const handleFinish = (selectedKeywords) => {
    setKeywords(selectedKeywords);
    setFirstVisit(false);
    Taro.switchTab({
      url: "/pages/home/index",
    });
  };

  return (
    <View className="keywords-container">
      <View className="keywords-header">
        <Text className="keywords-title">选择关键词</Text>
        <Text className="keywords-subtitle">
          请选择您感兴趣的关键词，我们将为您推荐相关内容
        </Text>
      </View>

      <View className="keywords-list">
        {/* TODO: 添加关键词列表 */}
        <AtTag>深度学习</AtTag>
        <AtTag>机器学习</AtTag>
        <AtTag>神经网络</AtTag>
        <AtTag>计算机视觉</AtTag>
        <AtTag>自然语言处理</AtTag>
      </View>

      <View className="keywords-button">
        <AtButton
          type="primary"
          onClick={() =>
            handleFinish([
              "deep learning",
              "machine learning",
              "neural networks",
            ])
          }
        >
          完成
        </AtButton>
      </View>
    </View>
  );
}
