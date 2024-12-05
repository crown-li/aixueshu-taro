import { View, Text, Image } from "@tarojs/components";
import { useState } from "react";
import Taro from "@tarojs/taro";
import { AtButton, AtIcon, AtTag } from "taro-ui";
import "./index.scss";

export default function Article() {
  const [favorite, setFavorite] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  // 模拟文章数据
  const article = {
    id: "1",
    title: "深度学习在自然语言处理中的最新进展",
    tags: ["深度学习", "NLP", "人工智能"],
    keyFindings: [
      "Transformer架构在各类NLP任务中表现优异",
      "预训练模型显著提升了下游任务性能",
      "多模态融合成为新的研究热点",
    ],
    content: "文章详细内容...",
    publishDate: "2024-03-15",
  };

  const handleShare = () => {
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
    Taro.showToast({
      title: favorite ? "已取消收藏" : "已收藏",
      icon: "success",
      duration: 2000,
    });
  };

  // 监听页面滚动更新阅读进度
  Taro.usePageScroll(({ scrollTop }) => {
    const progress = Math.min(
      (scrollTop / (Taro.getSystemInfoSync().windowHeight * 1.5)) * 100,
      100
    );
    setReadProgress(progress);
  });

  return (
    <View className="article-container">
      <View className="article-header">
        <View className="header-actions">
          <AtButton
            size="small"
            circle
            onClick={handleFavorite}
            className={favorite ? "favorite-active" : ""}
          >
            <AtIcon value={favorite ? "star-2" : "star"} size="20" />
          </AtButton>
          <AtButton size="small" circle onClick={handleShare}>
            <AtIcon value="share-2" size="20" />
          </AtButton>
        </View>
      </View>

      <View className="progress-bar">
        <View
          className="progress-inner"
          style={{ width: `${readProgress}%` }}
        />
      </View>

      <View className="article-content">
        <Text className="article-title">{article.title}</Text>

        <View className="article-tags">
          {article.tags.map((tag) => (
            <AtTag
              key={tag}
              size="small"
              customStyle={{ marginRight: "8px", marginBottom: "8px" }}
            >
              {tag}
            </AtTag>
          ))}
        </View>

        <View className="key-findings">
          <Text className="section-title">核心发现</Text>
          <View className="findings-list">
            {article.keyFindings.map((finding, index) => (
              <Text key={index} className="finding-item">
                • {finding}
              </Text>
            ))}
          </View>
        </View>

        <View className="article-body">
          <Text className="article-text">{article.content}</Text>
        </View>
      </View>
    </View>
  );
}
