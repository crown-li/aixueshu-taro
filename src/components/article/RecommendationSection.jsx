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
    <View className="mb-8">
      <View className="text-lg font-medium mb-4">
        {recommendation.type === "similar" && "相关推荐"}
        {recommendation.type === "popular" && "热门文章"}
        {recommendation.type === "latest" && "最新发布"}
      </View>

      <View className="text-sm text-gray-500 mb-4">{recommendation.reason}</View>

      <View className="space-y-4">
        {recommendation.articles.map((article) => (
          <View key={article.id} onClick={() => handleArticleClick(article.id)}>
            <Card className="p-4">
              <View className="font-medium line-clamp-2 mb-2">{article.title}</View>
              <Text className="text-sm text-gray-500 line-clamp-2">{article.summary}</Text>
              <View className="flex items-center justify-between mt-2 text-xs text-gray-400">
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
