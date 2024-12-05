import { View, Text } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { cn } from "@/lib/utils";

export function InteractionBar({
  onLike,
  onDislike,
  onComment,
  onShare,
  likeCount,
  commentCount,
}) {
  return (
    <View className="fixed w-full bottom-[0] left-[0] right-[0] bg-white border-t border-gray-200 pb-safe-bottom">
      <View className="flex items-center justify-between px-4 py-2">
        <View className="flex items-center gap-6">
          <View className="flex flex-col items-center" onClick={onLike}>
            <View
              className={cn(
                "p-2 rounded-full transition-colors",
                "hover-bg-gray-100"
              )}
            >
              <AtIcon value="heart" size="20" color="#666" />
            </View>
            <Text className="text-xs text-gray-500">{likeCount}</Text>
          </View>

          <View className="flex flex-col items-center" onClick={onDislike}>
            <View
              className={cn(
                "p-2 rounded-full transition-colors",
                "hover-bg-gray-100"
              )}
            >
              <AtIcon value="thumb-down" size="20" color="#666" />
            </View>
          </View>

          <View className="flex flex-col items-center" onClick={onComment}>
            <View
              className={cn(
                "p-2 rounded-full transition-colors",
                "hover-bg-gray-100"
              )}
            >
              <AtIcon value="message" size="20" color="#666" />
            </View>
            <Text className="text-xs text-gray-500">{commentCount}</Text>
          </View>
        </View>

        <View onClick={onShare}>
          <View
            className={cn(
              "p-2 rounded-full transition-colors",
              "hover-bg-gray-100"
            )}
          >
            <AtIcon value="share" size="20" color="#666" />
          </View>
        </View>
      </View>
    </View>
  );
}
