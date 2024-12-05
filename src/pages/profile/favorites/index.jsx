import { useState } from 'react';
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { ArticleCard } from '@/components/article/ArticleCard';
import { mockArticles } from '@/data/mock-articles';
import "./index.scss";
import "taro-ui/dist/style/components/icon.scss";

export default function Favorites() {
  const [articles, setArticles] = useState(
    mockArticles.filter((article) => article.favorite)
  );

  const handleFavorite = (id) => {
    setArticles((prev) =>
      prev.filter((article) => article.id !== id)
    );
  };

  if (articles.length === 0) {
    return (
      <View className="bg-gray-50 h-full">
        <Header title="我的收藏" />
        <Container className="mt-6 pt-[calc(3.5rem+env(safe-area-inset-top))] pb-[calc(4rem+env(safe-area-inset-bottom))]">
          <View className="flex flex-col items-center justify-center h-[60vh]">
            <AtIcon value="bookmark" size="24" color="#ccc" />
            <Text className="text-gray-500 mb-4">暂无收藏的文章</Text>
            <Button
                className="p-2"
                size="small"
                onClick={() => Taro.switchTab({ url: '/pages/home/index' })}
            >
                去浏览文章
            </Button>
          </View>
        </Container>
      </View>
    );
  }

  return (
    <View className="bg-gray-50 h-full">
      <Header title="我的收藏" />
      <Container className="mt-6 pt-[calc(3.5rem+env(safe-area-inset-top))] pb-[calc(4rem+env(safe-area-inset-bottom))]">
        <View className="space-y-4">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onFavorite={handleFavorite}
            />
          ))}
        </View>
      </Container>
    </View>
  );
}