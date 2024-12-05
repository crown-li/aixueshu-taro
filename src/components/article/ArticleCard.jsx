import { View, Text } from "@tarojs/components";
import { useState, useRef } from "react";
import { AtIcon } from "taro-ui";
import Taro from "@tarojs/taro";
import { cn } from "@/lib/utils";
import { ArticleTags } from "./ArticleTags";

export function ArticleCard({ article, onFavorite, onNotInterested }) {
  const [showActions, setShowActions] = useState(false);
  const longPressTimer = useRef();
  const [touchStarted, setTouchStarted] = useState(false);

  const handleFavorite = (e) => {
    e.stopPropagation();
    onFavorite(article.id);
    setShowActions(false);
  };

  const handleNotInterested = (e) => {
    e.stopPropagation();
    onNotInterested?.(article.id);
    setShowActions(false);
  };

  const toggleActions = (e) => {
    e.stopPropagation();
    setShowActions(!showActions);
  };

  const handleTouchStart = () => {
    setTouchStarted(true);
    longPressTimer.current = setTimeout(() => {
      setShowActions(true);
      setTouchStarted(false);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    setTouchStarted(false);
  };

  const handleTouchMove = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    setTouchStarted(false);
  };

  const handleClick = () => {
    Taro.navigateTo({
      url: `/pages/article/index?id=${article.id}`,
    });
  };

  return (
    <View
      onClick={handleClick}
      className={cn(
        "relative bg-white rounded-lg shadow-sm transition-all duration-200",
        touchStarted ? "scale-[0.98]" : "hover-shadow-md"
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <View className="p-4 space-y-3">
        <View className="flex items-start justify-between gap-2">
          <Text className="text-lg font-medium line-clamp-2 flex-1">
            {article.title}
          </Text>
          <View onClick={toggleActions} className="p-1 -mr-1 text-gray-400">
            <AtIcon value="menu" size="20" color="#999" />
          </View>
        </View>

        <Text className="text-gray-600 text-sm line-clamp-3">
          {article.summary}
        </Text>

        <ArticleTags tags={article.tags} />

        <View className="flex items-center justify-between text-sm text-gray-500">
          <View className="flex items-center gap-1">
            <AtIcon value="clock" size="16" color="#999" />
            <Text>{article.publishedAt}</Text>
          </View>
          <View
            onClick={handleFavorite}
            className={cn(
              "p-1.5 rounded-full transition-colors",
              article.favorite ? "text-blue-600" : "text-gray-400"
            )}
          >
            <AtIcon
              value={article.favorite ? "star-2" : "star"}
              size="20"
              color={article.favorite ? "#2563eb" : "#999"}
            />
          </View>
        </View>
      </View>

      {/* Action Menu */}
      {showActions && (
        <>
          <View
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setShowActions(false)}
          />
          <View
            className="absolute right-2 top-12 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 min-w-[140px]"
            onClick={(e) => e.stopPropagation()}
          >
            <View
              onClick={handleFavorite}
              className="flex items-center gap-2 px-4 py-2.5 text-sm hover-bg-gray-50 w-full"
            >
              <AtIcon
                value={article.favorite ? "star-2" : "star"}
                size="16"
                color={article.favorite ? "#2563eb" : "#999"}
              />
              <Text>{article.favorite ? "取消收藏" : "收藏文章"}</Text>
            </View>
            <View
              onClick={handleNotInterested}
              className="flex items-center gap-2 px-4 py-2.5 text-sm hover-bg-gray-50 w-full text-red-600"
            >
              <AtIcon value="thumb-down" size="16" color="#dc2626" />
              <Text>不感兴趣</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}
