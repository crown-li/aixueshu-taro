import { View, Text } from "@tarojs/components";
import { cn } from "@/lib/utils";

export function Tabs({ tabs, selectedTab, onChange, className }) {
  return (
    <View className={cn("border-b border-gray-200", className)}>
      <View className="grid auto-cols-fr grid-flow-col">
        {tabs.map((tab) => (
          <View
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "py-4 text-sm font-medium text-center whitespace-nowrap",
              "transition-colors relative",
              selectedTab === tab.id
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <Text>{tab.label}</Text>
            <View
              className={cn(
                "absolute bottom-[0] left-[0] right-[0] h-0.5 transition-colors",
                selectedTab === tab.id ? "bg-blue-600" : "bg-transparent"
              )}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
