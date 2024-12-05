import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Card } from "@/components/ui/Card";

export function RecommendationSection({ recommendation }) {
  const handleArticleClick = (articleId) => {
    Taro.navigateTo({
      url: `/pages/article/index?id=${articleId}`,
    });
  };

  return (
    <View className="recommendation-section">
      <Text className="recommendation-title">
        {recommendation.type === "similar" && "相关推荐"}
        {recommendation.type === "popular" && "热门文章"}
        {recommendation.type === "latest" && "最新发布"}
      </Text>

      <Text className="recommendation-reason">{recommendation.reason}</Text>

      <View className="recommendation-list">
        {recommendation.articles.map((article) => (
          <View key={article.id} onClick={() => handleArticleClick(article.id)}>
            <Card>
              <Text className="article-title">{article.title}</Text>
              <Text className="article-summary">{article.summary}</Text>
              <View className="article-meta">
                <Text className="publish-date">{article.publishedAt}</Text>
                <Text className="read-count">{article.readCount} 次阅读</Text>
              </View>
            </Card>
          </View>
        ))}
      </View>
    </View>
  );
}
