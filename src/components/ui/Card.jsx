import { View } from "@tarojs/components";
import { cn } from "@/lib/utils";
export function Card({ children, className, selected, onClick }) {
  return (
    <View
      className={cn(
        "p-4 rounded-lg border transition-colors",
        selected
          ? "border-blue-600 bg-blue-50"
          : "border-gray-200 bg-white hover:bg-gray-50",
        className
      )}
      onClick={onClick}
    >
      {children}
    </View>
  );
}
