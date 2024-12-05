import { View, Text } from "@tarojs/components";
import { cn } from "@/lib/utils";

export function Tag({ children, onDelete, className }) {
  return (
    <View
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full",
        "bg-blue-50 text-blue-700 text-sm",
        className
      )}
    >
      <Text>{children}</Text>
      {onDelete && (
        <View
          onClick={onDelete}
          className="p-0.5 hover:bg-blue-100 rounded-full"
        >
          <Text className="iconfont icon-close" />
        </View>
      )}
    </View>
  );
}
