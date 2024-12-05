import { View } from "@tarojs/components";
import { cn } from "@/lib/utils";
export function Progress({ steps, currentStep, className }) {
  return (
    <View className={cn("flex gap-2", className)}>
      {Array.from({ length: steps }).map((_, index) => (
        <View
          key={index}
          className={cn(
            "h-1 rounded-full flex-1 transition-colors",
            index < currentStep ? "bg-blue-600" : "bg-gray-200"
          )}
        />
      ))}
    </View>
  );
}
