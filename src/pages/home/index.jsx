import { View, Text, Image, Button } from "@tarojs/components";
import { useState,useEffect } from "react";
import { AtIcon } from "taro-ui";
import { Container } from "@/components/layout/Container";
import { PeriodSelector } from "@/components/article/PeriodSelector";
import { ArticleNavigation } from "@/components/article/ArticleNavigation";
import { ResearchTermTag } from "@/components/article/ResearchTermTag";
import { getPeriods, getResearchDirections,getArticleDetailInfo, getArticleDetail, addFavorites, deleteFavorites } from "@/api/index";
import { useUserStore } from "@/store/user";
import { ArticleTags } from "@/components/article/ArticleTags";
import { InteractionBar } from "@/components/article/InteractionBar";
// import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { shareContent } from "@/utils/share";
import { getDirectionsByField } from "@/data/research-directions";
import { cn } from "@/lib/utils";
import Taro from "@tarojs/taro";
import { useReadProgress } from '@/hooks/useReadProgress';
import towxmlFunc from '@/towxml/index'

const researchTerms = {
  "cs-ai-llm": ["大语言模型", "多模态理解", "Transformer架构", "注意力机制"],
  "cs-ai-ml": ["机器学习", "深度学习", "神经网络", "强化学习"],
  "cs-systems-distributed": ["分布式系统", "云计算", "微服务架构"],
  "cs-security-crypto": ["密码学", "量子密码", "区块链技术"],
  "physics-quantum-computing": ["量子计算", "量子比特", "量子纠缠"],
  "biology-molecular-crispr": ["CRISPR", "基因编辑", "基因组学"],
};

export default function Home() {
  const [article,setArticle] = useState(null)
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState();
  const [activeSection, setActiveSection] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  // const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100));
  // const [commentCount] = useState(Math.floor(Math.random() * 20));
  // const { fields } = useUserStore();
  // const [categories, setCategories] = useState([]);
  // const [dataTowxml, setDataTowxml] = useState({})
  // const [articleDetailInfo, setArticleDetailInfo] = useState([])

  const router = Taro.getCurrentInstance().router;
  const recordId = router?.params?.recordId;

  Taro.useShareAppMessage(() => { 
    const promise = new Promise(resolve => {
      const subjectInterpretations = article?.subjectInterpretations?.find(v => v?.tag?.id === activeSection)
      setTimeout(() => {
        resolve({
          title: subjectInterpretations.aggregatedInterpretation?.title || '爱学术',
          path:`/pages/home/index?recordId=${article?.id}`
        })
      }, 2000)
    })
    return {
      title: '爱学术',
      path: `/pages/home/index`,
      promise,
    }
  })

  useEffect(() => {
    if (recordId) {
      fetchArticleDetail(recordId)
      return
    }
    const fetchArticleDetailInfo = async () => {
      const res = await getArticleDetailInfo()
      const data = res.data.items
      // setArticleDetailInfo(data)
      fetchArticleDetail(data[0].id)
      setPeriods(data)
      setSelectedPeriod(data[0].id)
    }
    fetchArticleDetailInfo()
  },[])

  const fetchArticleDetail = async (recordId) => {
    Toast.showLoading('加载中')
    const res = await getArticleDetail(recordId)
    const data = res.data
    const currentSection = data.subjectInterpretations[0]
    setArticle(data)
    setIsFavorite(currentSection?.isFavorited || false)
    setActiveSection(currentSection?.tag?.id);
    Toast.hideLoading()
  }

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    const currentSection = article.subjectInterpretations.find(v => v?.tag?.id === sectionId)
    setIsFavorite(currentSection?.isFavorited || false)
  };

  const handleFavorite = async () => {
    const subjectInterpretation = article.subjectInterpretations.find(v => v?.tag?.id === activeSection)
    if (!subjectInterpretation) return

    try {
      if (isFavorite) {
        await deleteFavorites(subjectInterpretation.favoriteId)
      } else {
        const res = await addFavorites({
          pushRecordId: selectedPeriod,
          subjectInterpretationId: subjectInterpretation?.id,
          subjectInterpretationTitle: subjectInterpretation?.aggregatedInterpretation?.title,
        })
        
        // 更新当前 section 的 favoriteId
        const updatedSubjectInterpretations = article.subjectInterpretations.map(item => {
          if (item?.tag?.id === activeSection) {
            return {
              ...item,
              favoriteId: res.data.id
            }
          }
          return item
        })

        setArticle({
          ...article,
          subjectInterpretations: updatedSubjectInterpretations
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
    if (article) {
      shareContent({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      });
    }
  };

  // const handleProgressChange = (progress) => {
  //   // 找到当前激活的解释内容
  //   const currentInterpretation = article?.subjectInterpretations.find(
  //     v => v?.subject?.id === activeSection
  //   );
    
  //   if (currentInterpretation) {
  //     updateArticleDetailReadProgress({
  //       id: currentInterpretation.id,
  //       progress
  //     });
  //   }
  // };

  const readProgress = useReadProgress({
    target:'.home-container',
    article:article?.subjectInterpretations?.find(v => v?.tag?.id === activeSection),
  });

  const renderContent = (text) => {
    let result = [];
    let lastIndex = 0;

    Object.entries(researchTerms).forEach(([directionId, terms]) => {
      terms.forEach((term) => {
        const regex = new RegExp(`(${term})`, "g");
        let match;

        while ((match = regex.exec(text)) !== null) {
          if (match.index > lastIndex) {
            result.push(text.slice(lastIndex, match.index));
          }

          result.push(
            <ResearchTermTag
              key={`${directionId}-${match.index}`}
              term={match[0]}
              directionId={directionId}
            />
          );

          lastIndex = match.index + match[0].length;
        }
      });
    });

    if (lastIndex < text.length) {
      result.push(text.slice(lastIndex));
    }

    return result;
  };

  const convertText = (text) => {
    // 使用正则表达式匹配$[...]$格式的内容
    const pattern = /\$\[(.*?)\]\$/g;
    const parts = [];
    let lastIndex = 0;
    let match;
  
    while ((match = pattern.exec(text)) !== null) {
      // 添加普通文本
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      // 添加需要渲染的内容
      parts.push(renderContent(match[1]));
      
      lastIndex = match.index + match[0].length;
    }
  
    // 添加剩余的文本
    if (lastIndex < text?.length) {
      parts.push(text.slice(lastIndex));
    }
    console.log('parts:',parts)
    return parts;
  };

  return (
    <View className='home-container'>
      <Container className='pt-safe-top pb-[calc(4rem+env(safe-area-inset-bottom))]'>
        {
            periods?.length ?
            <PeriodSelector
              periods={periods}
              selectedPeriod={selectedPeriod}
              onSelect={setSelectedPeriod}
            /> : null
        }

        <View className='flex items-center justify-end gap-2 mb-4'>
          <View
            variant='outline'
            size='sm'
            onClick={handleFavorite}
            className={cn("bg-white w-6 h-6 flex items-center justify-center rounded", isFavorite && "text-blue-600")}
          >
            <AtIcon 
              value={isFavorite ? "star-2" : "star"} 
              size='16' 
              color={isFavorite ? "#2563eb" : "#666666"}
            />
          </View>
          {/* <View
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="bg-white w-6 h-6 flex items-center justify-center rounded"
          >
            <AtIcon value="share" size="16" color="#666666" />
          </View> */}
          <Button 
            className='flex flex-col p-0 m-0 border-0 leading-none flex justify-center items-center bg-white after:border-none w-6 h-6 rounded' 
            openType='share' 
          >
            <AtIcon value='share' size='16' color='#999' />
          </Button>
        </View>

        {
          article?.subjectInterpretations?.length ? <ArticleNavigation
            sections={article?.subjectInterpretations?.map((category) => ({
                id: category?.tag?.id,
                title: category?.tag?.name,
                isActive: activeSection === category?.tag?.id,
              })) || []}
            onSectionClick={handleSectionClick}
          /> : null
        }
        {
          article?.subjectInterpretations?.map(v => { 
            
            if (activeSection === v?.tag?.id) {
              return (
                <View className='prose prose-sm max-w-none pt-4' key={v?.tag?.id}>

                  {/* <View className='text-2xl font-bold mb-4'>
                    <towxml nodes={towxmlFunc('# ' + v?.aggregatedInterpretation?.title, 'markdown')} />
                  </View> */}
                  {/* <ArticleTags tags={article?.tags || {}} className="mb-6" /> */}

                  {/* <View className="space-y-6 mb-8">{convertText(v?.aggregatedInterpretation?.content)}</View>
                  <View className="space-y-6 mb-8">{convertText(v?.aggregatedInterpretation?.recommendations)}</View> */}
                  <View className='space-y-6 mb-8'>
                    <towxml nodes={towxmlFunc(v?.aggregatedInterpretation?.content, 'markdown')} />
                  </View>
                  <View className='space-y-6 mb-8'>
                    <towxml nodes={towxmlFunc(v?.aggregatedInterpretation?.recommendations, 'markdown')} />
                  </View>

                  <View
                    className='border-slide border-gray-400 pt-6 mb-8'
                    style={{ borderTop: "1px solid #e5e7eb" }}
                  >
                    <View className='text-lg font-medium mb-4'>参考文献</View>
                    <View className='space-y-4'>
                      {v?.articles?.map((ref, index) => (
                        <View key={index} className='text-sm text-gray-600'>
                          <View className='font-medium mb-1'>{ref.title}</View>
                          
                          <View className='text-gray-500'>
                            {ref?.authors?.join(", ")} ({ref?.source?.publishDate})
                          </View>
                          {/* <Text className="text-gray-600">{ref.journal}</Text> */}
                          {ref?.source?.url && (
                            <View
                              className='inline-flex items-center text-blue-600 hover:text-blue-700 mt-1'
                              onClick={() =>
                                Taro.setClipboardData({
                                  data: `${ref?.source?.website}`,
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
                              DOI: {ref?.source?.website}
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
                </View>
              )
            }
          })
        }
      </Container>
      {
        article?.subjectInterpretations ? <InteractionBar
          article={article?.subjectInterpretations?.find(v => v?.tag?.id === activeSection)}
        /> : null
      }
      
    </View>
  );
}
