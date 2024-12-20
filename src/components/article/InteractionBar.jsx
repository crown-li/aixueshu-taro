import { useState,useEffect } from "react";
import { View, Text, Button } from "@tarojs/components";
import Taro from '@tarojs/taro';
import { AtIcon } from "taro-ui";
import { cn } from "@/lib/utils";
import { likesToggle } from "@/api/index";

export function InteractionBar({
  article,
}) {

  // 添加点赞处理函数
  const handleLike = async () => {
    try {
      const response = await likesToggle(article?.id);
      // 更新点赞状态和数量
      setIsLiked(!isLiked);
      setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    } catch (error) {
      console.error('点赞失败:', error);
    }
  };


  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  
  useEffect(() => {
    if (article) {
      setIsLiked(article.isLiked || false);
      setLikeCount(article.likeCount || 0);
    }
  }, [article]);

  return (
    <View className="fixed w-full bottom-[0] left-[0] right-[0] bg-white border-t border-gray-200 pb-safe-bottom">
      <View className="flex items-center justify-around px-4 py-2">
        {/* <View className="flex items-center gap-6"> */}
          <View className="flex flex-col items-center" onClick={handleLike}>
            <View
              className={cn(
                "p-2 rounded-full transition-colors",
                "hover-bg-gray-100"
              )}
            >
            {/* <AtIcon value="heart" size="20" color="#666" /> */}
            <AtIcon value={isLiked ? "heart-2" : "heart"} size="20" color={isLiked ? "#ff4d4f" : "#666"} />
            </View>
            <Text className="text-xs text-gray-500">{likeCount}</Text>
          </View>

          {/* <View className="flex flex-col items-center" onClick={onDislike}>
            <View
              className={cn(
                "p-2 rounded-full transition-colors",
                "hover-bg-gray-100"
              )}
            >
              <AtIcon prefixClass="aixueshu-mini" value="ziyuan174" size="20" color="#666" />
            </View>
            <Text className="text-xs text-gray-500">{unlikeCount}</Text>
          </View> */}

          <Button 
            className="flex flex-col p-0 m-0 border-0 leading-none items-center bg-white after:border-none" 
            openType="share" 
          >
            <View
              className={cn(
                "p-2 rounded-full transition-colors",
                "hover-bg-gray-100"
              )}
            >
              <AtIcon value="share" size="20" color="#666" />
            </View>
            <Text className="text-xs text-gray-500"></Text>
          </Button >
        {/* </View> */}

        {/* <View onClick={onShare}>
          <View
            className={cn(
              "p-2 rounded-full transition-colors",
              "hover-bg-gray-100"
            )}
          >
            <AtIcon value="share" size="20" color="#666" />
          </View>
        </View> */}
      </View>
    </View>
  );
}
