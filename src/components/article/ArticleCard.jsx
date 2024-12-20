import { View, Text } from "@tarojs/components";
import { useState, useRef } from "react";
import { AtIcon } from "taro-ui";
import Taro from "@tarojs/taro";
import { cn } from "@/lib/utils";
import { ArticleTags } from "./ArticleTags";
import { deleteFavorites } from "@/api/index";
import { formatDate } from "@/utils/date";

export function ArticleCard({ article, onDelete }) {
  const longPressTimer = useRef();
  const [touchStarted, setTouchStarted] = useState(false);

 
  const createdAtFn = (date) => {
    if(!date) return '';
    const res = formatDate(date);
    if (res) {
      return `${res.year}-${res.month}-${res.day}`;
    }
    return '';
  };

  const handleDelFavorite = async (e) => {
    e.stopPropagation();
    await deleteFavorites(article.id);
    onDelete?.(article.id);
  };

  const handleNotInterested = async (e) => {
    e.stopPropagation();
    await deleteFavorites(article.id);
    onNotInterested?.(article.id);
  };

  const toggleActions = (e) => {
    e.stopPropagation();
    Taro.showActionSheet({
      itemList: [
        // article.favorite ? '取消收藏' : '收藏文章', 
        '取消收藏',
        // '不感兴趣'
      ],
      itemColor: '#000000',
    }).then(res => {
      // res.tapIndex 表示点击的按钮序号,从0开始
      switch(res.tapIndex) {
        case 0:
          handleDelFavorite(e);
          break;
        // case 1: 
        //   handleNotInterested(e);
        //   break;
      }
    })
  };


  // const handleTouchStart = () => {
  //   setTouchStarted(true);
  //   longPressTimer.current = setTimeout(() => {
  //     setShowActions(true);
  //     setTouchStarted(false);
  //   }, 500);
  // };

  // const handleTouchEnd = () => {
  //   if (longPressTimer.current) {
  //     clearTimeout(longPressTimer.current);
  //   }
  //   setTouchStarted(false);
  // };

  // const handleTouchMove = () => {
  //   if (longPressTimer.current) {
  //     clearTimeout(longPressTimer.current);
  //   }
  //   setTouchStarted(false);
  // };

  const handleClick = () => {
    Taro.navigateTo({
      url: `/pages/article/index?id=${article.subjectInterpretationId}`,
    });
  };

  return (
    <View
      onClick={handleClick}
      className={cn(
        "relative bg-white rounded-lg shadow-sm transition-all duration-200",
        touchStarted ? "scale-[0.98]" : "hover-shadow-md"
      )}
      // onTouchStart={handleTouchStart}
      // onTouchEnd={handleTouchEnd}
      // onTouchMove={handleTouchMove}
    >
      <View className="p-4 space-y-3">
        <View className="flex items-start justify-between gap-2">
          <Text className="text-lg font-medium line-clamp-2 flex-1">
            {article?.subjectInterpretation?.aggregatedInterpretation?.title}
          </Text>
          <View onClick={toggleActions} className="p-1 -mr-1 text-gray-400">
            <AtIcon value="menu" size="20" color="#999" />
          </View>
        </View>

        <View className="text-gray-600 text-sm line-clamp-3">
          {article?.subjectInterpretation?.aggregatedInterpretation?.recommendations}
        </View>

        {/* {article.tags && <ArticleTags tags={article.tags} />} */}

        <View className="flex items-center justify-between text-sm text-gray-500">
          <View className="flex items-center gap-1">
            <AtIcon value="clock" size="16" color="#999" />
            <Text>{createdAtFn(article.createdAt)}</Text>
          </View>
          {/* <View
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
          </View> */}
        </View>
      </View>
    </View>
  );
}
