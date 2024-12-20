import { useState, useEffect, useCallback  } from 'react';
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { Loading } from "@/components/ui/Loading";
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { ArticleCard } from '@/components/article/ArticleCard';
import { getFavorites } from '@/api/index';
import "taro-ui/dist/style/components/icon.scss";
import { throttle } from '@/utils/dt';


export default function Favorites() {
  const [articles, setArticles] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    fetchFavorites();
  }, [params]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      // Toast.showLoading(); // 显示加载提示
      const res = await getFavorites(params);
      if (params.page === 1) {
        setArticles(res.data.items);
      } else {
        setArticles(prev => [...prev, ...res.data.items]);
      }
      setTotal(res.data.total);
    } finally {
      setLoading(false);
      // Toast.hideLoading(); // 隐藏加载提示
    }
  };

  const handleLoadMore = useCallback(
    throttle((scrollTop) => {
      if (loading || articles.length >= total) return;
      const { windowHeight } = Taro.getWindowInfo();
      const query = Taro.createSelectorQuery();
      query.select('.favorites-container').boundingClientRect(rect => {
        if (rect && scrollTop + windowHeight + 100 >= rect.height) {
          setParams(prev => ({
            ...prev,
            page: prev.page + 1
          }));
        }
      }).exec();
    }, 200), 
    [loading, articles.length, total]
  );

  Taro.usePageScroll(({ scrollTop }) => {
    handleLoadMore(scrollTop);
  });

  const handleDelete = (id) => {
    setParams(prev => ({
      ...prev,
      page: 1
    }));
    fetchFavorites()
  };

  // const handleFavorite = (id) => {
  //   setArticles((prev) =>
  //     prev.filter((article) => article.id !== id)
  //   );
  // };

  if (!loading && articles.length === 0) {
    return (
      <View >
        <Header title="我的收藏" />
        <Container className="mt-6 pt-[calc(3.5rem+env(safe-area-inset-top))] pb-[calc(4rem+env(safe-area-inset-bottom))]">
          <View className="flex flex-col items-center justify-center h-[60vh]">
            <View className='at-icon at-icon-star text-4xl text-gray-500 mb-4'></View>
            <View className="text-gray-500 mb-4">暂无收藏的文章</View>
            <Button
                className="p-2 px-6"
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
    <View className="favorites-container">
      <Header title="我的收藏" />
      <Container className="mt-6 pt-[calc(3.5rem+env(safe-area-inset-top))] pb-[calc(4rem+env(safe-area-inset-bottom))]">
        <View className="space-y-4">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onDelete={handleDelete}
            />
          ))}
        </View>
        
        {/* 添加底部加载状态 */}
        {loading && (
          <View className="py-4 flex justify-center">
            <Loading />
          </View>
        )}
        
        {!loading && articles.length >= total && total > 0 && (
          <View className="py-4 text-center text-gray-500 text-sm">
            没有更多内容了
          </View>
        )}
      </Container>
    </View>
  );
}