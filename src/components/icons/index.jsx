import { View, Text } from "@tarojs/components";

export function GraduationCap(props) {
  const { className = "" } = props;

  return (
    <View className={`icon-wrapper ${className}`}>
      <Text className="iconfont icon-graduation-cap" />
    </View>
  );
}

export function HomeIcon(props) {
  const { className = "" } = props;

  return (
    <View className={`icon-wrapper ${className}`}>
      <Text className="iconfont icon-home" />
    </View>
  );
}

export function ProfileIcon(props) {
  const { className = "" } = props;

  return (
    <View className={`icon-wrapper ${className}`}>
      <Text className="iconfont icon-user" />
    </View>
  );
}
