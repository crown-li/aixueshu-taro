import { useState, useEffect } from 'react';
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtIcon, AtButton } from "taro-ui";
import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/Header';
import { ArticleTags } from '@/components/article/ArticleTags';
import { RecommendationSection } from '@/components/article/RecommendationSection';
import { InteractionBar } from '@/components/article/InteractionBar';
import { getArticleDetail,getArticlesRecommend } from '@/api/index';
import { cn } from '@/lib/utils';
import { shareContent } from '@/utils/share';

export default function Article() {
  const router = Taro.getCurrentInstance().router;
  const id = router?.params?.id;
  
  const [recommendations, setRecommendations] = useState({
    type: 'similar',
    reason: '基于您的阅读兴趣推荐',
    articles: []
  });
  const [article, setArticle] = useState(null);
  const [favorite, setFavorite] = useState();
  const [readProgress, setReadProgress] = useState(0);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100));
  const [commentCount, setCommentCount] = useState(Math.floor(Math.random() * 20));

  useEffect(() => {
    const fetchArticle = async () => {
      try {
          const res = await getArticleDetail(id);
          const data = res.data;
          setArticle(data);
          setFavorite(data.favorite)
      } catch (error) {
        console.log(error);
      }
    };
    fetchArticle();
  }, []);

  useEffect(() => {
    const fetchArticlesRecommend = async () => {
      try {
          const res = await getArticlesRecommend(id);
          const data = res.data;
          setRecommendations({
            ...recommendations,
            articles: data
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchArticlesRecommend();
  }, []);

  useEffect(() => {
    // if (!article) {
    //   Taro.switchTab({
    //     url: '/pages/home/index'
    //   });
    //   return;
    // }

    // // 监听页面滚动
    // const handleScroll = (e) => {
    //   const { scrollTop, scrollHeight } = e.detail;
    //   const clientHeight = Taro.getSystemInfoSync().windowHeight;
    //   const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    //   setReadProgress(Math.min(progress, 100));
    // };

    // Taro.onPageScroll(handleScroll);
    // return () => {
    //   Taro.offPageScroll(handleScroll);
    // };
  }, [article]);

  if (!article) return null;

  const handleShare = () => {
    shareContent({
      title: article.title,
      text: article.summary,
      url: window.location.href,
    });
  };

  return (
    <View className="article-container">
      <Header
        title="文章详情"
        rightElement={
          <View className="flex items-center gap-2">
            <AtButton
              size="small"
              onClick={() => setFavorite(!favorite)}
              className={cn(favorite && 'text-blue-600')}
            >
              <AtIcon 
                value={favorite ? "star-2" : "star"} 
                size="16" 
                color={favorite ? "#2563eb" : "#999"}
              />
            </AtButton>
            <AtButton
              size="small"
              onClick={handleShare}
            >
              <AtIcon value="share" size="16" color="#999" />
            </AtButton>
          </View>
        }
      />
      
      <View className="fixed top-14 left-0 right-0 h-1 bg-gray-100 z-10">
        <View
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${readProgress}%` }}
        />
      </View>

      <Container className="pt-[calc(4rem+env(safe-area-inset-top))] pb-32">
        <View className="prose prose-sm max-w-none">
          <View className="text-2xl font-bold mb-4">{article?.title}</View>
          
          {/* <ArticleTags tags={article.tags} className="mb-6" /> */}

          <View className="bg-blue-50 rounded-lg p-4 mb-6">
            <View className="text-lg font-medium mb-2">核心发现</View>
            <View className="list-disc list-inside space-y-1">
              {article?.keyFindings?.map((finding, index) => (
                <Text key={index} className="text-sm text-gray-700">
                  {finding}
                </Text>
              ))}
            </View>
          </View>

          <View className="mb-8 whitespace-pre-line">
            {article?.content}
          </View>

          <View className="border-t pt-6 mb-8">
            <View className="text-lg font-medium mb-4">参考文献</View>
            <View className="space-y-4">
              {article?.references.map((ref, index) => (
                <View key={index} className="text-sm">
                  <Text className="font-medium mb-1">{ref.title}</Text>
                  <Text className="text-gray-600">
                    {ref.authors.join(', ')} ({ref.year})
                  </Text>
                  <Text className="text-gray-600">{ref.journal}</Text>
                  {ref.doi && (
                    <Text
                      className="inline-flex items-center text-blue-600 mt-1"
                      onClick={() => {
                        Taro.setClipboardData({
                          data: `https://doi.org/${ref.doi}`,
                          success: () => {
                            Taro.showToast({
                              title: 'DOI已复制',
                              icon: 'success'
                            });
                          }
                        });
                      }}
                    >
                      DOI: {ref.doi}
                      <AtIcon value="external-link" size="12" className="ml-1" />
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>

            {recommendations && <RecommendationSection recommendation={recommendations} />}
        </View>
      </Container>

      <InteractionBar
        onLike={() => setLikeCount((prev) => prev + 1)}
        onDislike={() => {}}
        onComment={() => {}}
        onShare={handleShare}
        likeCount={likeCount}
        commentCount={commentCount}
      />
    </View>
  );
} 