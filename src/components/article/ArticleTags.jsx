import { View, Text } from "@tarojs/components";
import { cn } from "@/lib/utils";
import "taro-ui/dist/style/components/icon.scss";

const tagConfig = {
  innovation: {
    icon: "sketch",
    colors: "bg-purple-50 text-purple-700 border-purple-200",
    iconColor: "text-purple-500",
  },
  timeliness: {
    icon: "sketch",
    colors: "bg-blue-50 text-blue-700 border-blue-200",
    iconColor: "text-blue-500",
  },
  relevance: {
    icon: "sketch",
    colors: "bg-green-50 text-green-700 border-green-200",
    iconColor: "text-green-500",
  },
  authority: {
    icon: "sketch",
    colors: "bg-orange-50 text-orange-700 border-orange-200",
    iconColor: "text-orange-500",
  },
};

export function ArticleTags({ tags, className }) {
  return (
    <View className={cn("flex flex-wrap gap-2", className)}>
      {Object.entries(tags).map(([key, value]) => {
        const config = tagConfig[key];
        if (!config || !value) return null;

        return (
          <View
            key={key}
            className={cn(
              "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border",
              "transition-colors duration-200",
              config.colors
            )}
          >
            <View className={cn(config.iconColor)}>
              <Text className={`at-icon at-icon-${config.icon} `} />
            </View>
            <Text>{value}</Text>
          </View>
        );
      })}
    </View>
  );
}
