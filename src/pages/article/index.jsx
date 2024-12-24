import { useState, useEffect } from 'react';
import { View, Text, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtIcon, AtButton } from "taro-ui";
import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/Header';
import { ArticleTags } from '@/components/article/ArticleTags';
import { RecommendationSection } from '@/components/article/RecommendationSection';
import { InteractionBar } from '@/components/article/InteractionBar';
import { Toast } from "@/components/ui/Toast";
import { getFavoritesDetail, deleteFavorites, addFavorites } from '@/api/index';
import { cn } from '@/lib/utils';
import { shareContent } from '@/utils/share';
import { useReadProgress } from '@/hooks/useReadProgress';
// import towxmlFunc from '@/towxml/index'

export default function Article() {
  const router = Taro.getCurrentInstance().router;
  const { id } = router?.params;
  
  const [recommendations, setRecommendations] = useState({
    type: 'similar',
    reason: '基于您的阅读兴趣推荐',
    articles: []
  });
  const [article, setArticle] = useState(null);
  const [isFavorite, setIsFavorite] = useState();
  const [readProgress, setReadProgress] = useState(0);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100));
  const [commentCount, setCommentCount] = useState(Math.floor(Math.random() * 20));

  Taro.useShareAppMessage(() => { 
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: article?.aggregatedInterpretation?.title || '爱学术',
          path:`/pages/article/index?id=${article?.id}`
        })
      }, 2000)
    })
    return {
      title: '爱学术',
      path: `/pages/home/index`,
      promise,
    }
  })


  const fetchArticleDetail = async (recordId) => {
    Toast.showLoading('加载中')
    const res = await getFavoritesDetail(recordId)
    const data = res.data
    setArticle(data)
    setIsFavorite(data.isFavorited)
    setReadProgress(data.readingProgress)
    Toast.hideLoading()
    // setDataTowxml(content)
  }

  useEffect(() => {
    fetchArticleDetail(id)
  }, [id])

  useReadProgress({
    target:'.article-container',
    article:article,
  });

  const handleDelFavorite = async () => {
    try{
      if (isFavorite) {
        await deleteFavorites(article.favoriteId)
      } else {
        const res = await addFavorites({
          subjectInterpretationId: article?.id,
          subjectInterpretationTitle: article?.aggregatedInterpretation?.title,
        })

        setArticle({
          ...article,
          isFavorite:true
        })
      }
      
      setIsFavorite(!isFavorite)
      Toast.show({
        message: isFavorite ? '取消收藏成功' : '收藏成功'
      })
    } catch (error) {
      Toast.show({
        message: '操作失败'
      })
    }
    
  };


  const handleShare = () => {
    shareContent({
      title: article.title,
      text: article.summary,
      url: window.location.href,
    });
  };

  return article && (
    <View className='article-container'>
      <Header
        title='文章详情'
        readProgress={readProgress}
        rightElement={
          <View className='flex items-center gap-2'>
            <AtButton
              size='small'
              onClick={handleDelFavorite}
              className={cn(isFavorite && 'text-blue-600')}
            >
              <AtIcon 
                value={isFavorite ? "star-2" : "star"} 
                size='16' 
                color={isFavorite ? "#2563eb" : "#999"}
              />
            </AtButton>
            <Button 
              className='flex flex-col p-0 m-0 border-0 leading-none items-center bg-white after:border-none' 
              openType='share' 
            >
              <AtIcon value='share' size='16' color='#999' />
            </Button>
          </View>
        }
      />
      
      {/* <View className="fixed top-14 left-0 right-0 h-1 bg-gray-100 z-10">
        <View
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${readProgress}%` }}
        />
      </View> */}
      

      <Container className='pt-[calc(4rem+env(safe-area-inset-top))] pb-32'>
        <View className='prose prose-sm max-w-none'>
          {/* <View className="text-2xl font-bold mb-4">
            <towxml nodes={towxmlFunc('# ' + article?.aggregatedInterpretation?.title, 'markdown')} />
          </View> */}
          
          {/* <ArticleTags tags={article.tags} className="mb-6" /> */}

          {/* <View className="bg-blue-50 rounded-lg p-4 mb-6">
            <View className="text-lg font-medium mb-2">核心发现</View>
            <View className="list-disc list-inside space-y-1">
              {article?.keyFindings?.map((finding, index) => (
                <Text key={index} className="text-sm text-gray-700">
                  {finding}
                </Text>
              ))}
            </View>
          </View> */}

          <View className='mb-8 whitespace-pre-line'>
            {/* <towxml nodes={towxmlFunc(article?.aggregatedInterpretation?.content, 'markdown')} /> */}
          </View>
          <View className='mb-8 space-y-6 whitespace-pre-line'>
            {/* <towxml nodes={towxmlFunc(article?.aggregatedInterpretation?.recommendations, 'markdown')} /> */}
          </View>

          {
            article?.references && (
              <View
                className='border-slide border-gray-400 pt-6 mb-8'
                style={{ borderTop: "1px solid #e5e7eb" }}
              >
                <View className='text-lg font-medium mb-4'>参考文献</View>
                <View className='space-y-4'>
                  {article?.references?.map((ref, index) => (
                    <View key={index} className='text-sm text-gray-600'>
                      <View className='font-medium mb-1'>{ref.title}</View>
                      <View className='text-gray-500'>
                        {ref?.authors?.join(", ")} ({ref?.source?.publishDate})
                      </View>
                      {/* <Text className="text-gray-600">{ref.journal}</Text> */}
                      {ref?.source && (
                        <View
                          className='inline-flex items-center text-blue-600 hover:text-blue-700 mt-1'
                          onClick={() =>
                            Taro.setClipboardData({
                              data: `${ref?.source?.url}`,
                              success: () => {
                                Taro.getClipboardData({
                                  success: function (res) {
                                    Toast.show({
                                      message: "DOI已复制",
                                    });
                                  },
                                });
                              },
                            })
                          }
                        >
                          DOI: {ref?.source?.url}
                          <AtIcon
                            value='external-link'
                            size='12'
                            className='ml-1'
                          />
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            )
          }

            {/* {recommendations && <RecommendationSection recommendation={recommendations} />} */}
        </View>
      </Container>

      {
        article ? <InteractionBar
          article={article}
        /> : null
      }
    </View>
  );
} 