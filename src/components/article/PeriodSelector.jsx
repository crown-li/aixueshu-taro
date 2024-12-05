import { View, Text } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { cn } from "@/lib/utils";

export function PeriodSelector({ periods, selectedPeriod, onSelect }) {
  const currentIndex = periods.findIndex((p) => p.id === selectedPeriod);

  const handlePrev = () => {
    if (currentIndex < periods.length - 1) {
      onSelect(periods[currentIndex + 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex > 0) {
      onSelect(periods[currentIndex - 1].id);
    }
  };

  return (
    <View className="flex items-center justify-between py-2">
      <View
        onClick={handlePrev}
        className={cn(
          "p-2 rounded-full",
          currentIndex === periods.length - 1
            ? "text-gray-300"
            : "text-gray-600 hover:bg-gray-100"
        )}
      >
        <AtIcon value="chevron-left" size="20" />
      </View>

      <View className="text-center">
        <Text className="text-lg font-medium">
          {periods[currentIndex].title}
        </Text>
        <View className="text-sm text-gray-500">学术动态</View>
      </View>

      <View
        onClick={handleNext}
        className={cn(
          "p-2 rounded-full",
          currentIndex === 0
            ? "text-gray-300"
            : "text-gray-600 hover:bg-gray-100"
        )}
      >
        <AtIcon value="chevron-right" size="20" />
      </View>
    </View>
  );
}
