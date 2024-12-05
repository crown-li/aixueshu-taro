import { View, Text } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { cn } from "@/lib/utils";

export function ArticleNavigation({ sections, onSectionClick }) {
  return (
    <>
      {/* 移动端导航 */}
      <View className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <View className="flex overflow-x-auto hide-scrollbar py-2 box-border">
          {sections.map((section) => (
            <View
              key={section.id}
              onClick={() => onSectionClick(section.id)}
              className={cn(
                "flex-none px-4 py-1.5 text-sm whitespace-nowrap rounded-3xl mx-1",
                "transition-colors",
                section.isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover-bg-gray-50"
              )}
            >
              <Text>{section.title}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 桌面端导航 - 在Taro中隐藏,因为主要面向移动端 */}
      <View className="hidden">
        <View className="fixed left-4 top-1/2 -translate-y-1/2 space-y-2">
          {sections.map((section) => (
            <View
              key={section.id}
              onClick={() => onSectionClick(section.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap",
                "transition-colors hover-bg-gray-100",
                section.isActive
                  ? "text-blue-600 bg-blue-50 hover-bg-blue-50"
                  : "text-gray-600"
              )}
            >
              <AtIcon
                value="chevron-right"
                size="16"
                className={cn(
                  "transition-transform",
                  section.isActive && "rotate-90"
                )}
              />
              <Text>{section.title}</Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}
