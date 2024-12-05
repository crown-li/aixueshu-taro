import { View } from "@tarojs/components";
import { cn } from "@/lib/utils";

export function Container({ children, className = "" }) {
  return (
    <View className={cn("max-w-md mx-auto px-4", className)}>{children}</View>
  );
}
