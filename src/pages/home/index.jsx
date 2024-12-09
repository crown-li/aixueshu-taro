import { View, Text, Image } from "@tarojs/components";
import { useState,useEffect } from "react";
import { AtIcon } from "taro-ui";
import { Container } from "@/components/layout/Container";
import { PeriodSelector } from "@/components/article/PeriodSelector";
import { ArticleNavigation } from "@/components/article/ArticleNavigation";
import { ResearchTermTag } from "@/components/article/ResearchTermTag";
import { getMockPeriods, getResearchDirections } from "@/api/index";
import { useUserStore } from "@/store/user";
import { ArticleTags } from "@/components/article/ArticleTags";
import { InteractionBar } from "@/components/article/InteractionBar";
import { Button } from "@/components/ui/Button";
import { shareContent } from "@/utils/share";
import { getDirectionsByField } from "@/data/research-directions";
import { cn } from "@/lib/utils";
import Taro from "@tarojs/taro";
// import towxml from '../../towxml'

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
  const [mockPeriods, setMockPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState();
  const [activeSection, setActiveSection] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100));
  const [commentCount] = useState(Math.floor(Math.random() * 20));
  const { fields } = useUserStore();
  const [categories, setCategories] = useState([]);
  const [dataTowxml, setDataTowxml] = useState({})

  useEffect(()=>{
    const fetchMockPeriods = async () => {
      try {
        const res = await getMockPeriods();
        const mockPeriods = res.data
        // const content = towxml(mockPeriods[0]?.articles[0]?.content,'markdown',{})
        const content = mockPeriods[0]?.articles[0]?.content

        setMockPeriods(mockPeriods)
        setSelectedPeriod(mockPeriods[0].id)
        setArticle(mockPeriods[0]?.articles[0])
        setDataTowxml(content)
        console.log('article:',mockPeriods[0]?.articles[0])
      } catch (error) {
        console.log(error);
      }
    }
    fetchMockPeriods()
  },[])

  useEffect(() => {
    const fetchResearchDirections = async () => {
      try {
        const res = await getResearchDirections();
        const researchDirections = res.data
        const _categories = researchDirections.filter(v => v.fieldId === fields[0]);
        setCategories(_categories)
      } catch (error) {
        console.log(error);
      }
    };

    fetchResearchDirections();
  }, []);

  // const article = mockPeriods.find((p) => p.id === selectedPeriod)?.articles[0];

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
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

      console.log('match:',match)
      
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
    <View className="home-container bg-gray-50">
      <Container className="pt-safe-top pb-[calc(4rem+env(safe-area-inset-bottom))]">
        {
            mockPeriods?.length &&
            <PeriodSelector
            periods={mockPeriods}
            selectedPeriod={selectedPeriod}
            onSelect={setSelectedPeriod}
            />
        }

        <View className="flex items-center justify-end gap-2 mb-4">
          <View
            variant="outline"
            size="sm"
            onClick={handleFavorite}
            className={cn("bg-white w-6 h-6 flex items-center justify-center rounded", isFavorite && "text-blue-600")}
          >
            <AtIcon
              value={"bookmark"}
              size="16"
              color={isFavorite ? "#2563eb" : "#666666"}
            />
          </View>
          <View
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="bg-white w-6 h-6 flex items-center justify-center rounded"
          >
            <AtIcon value="share" size="16" color="#666666" />
          </View>
        </View>

        <ArticleNavigation
          sections={categories.map((category) => ({
            id: category.id,
            title: category.name,
            isActive: activeSection === category.id,
          }))}
          onSectionClick={handleSectionClick}
        />

        <View className="prose prose-sm max-w-none pt-4">
          {/* <Image
            src="https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=2000"
            mode="aspectFill"
            className="w-full h-48 rounded-lg mb-6"
          /> */}

          

          <View className="text-2xl font-bold mb-4">
            {article?.title}
          </View>
          {/* <ArticleTags tags={article?.tags || {}} className="mb-6" /> */}

          {/* <View className="space-y-6 mb-8">
            <View>
              <View className="text-xl font-bold mb-4">研究背景</View>
              <View className="text-gray-800 leading-relaxed">
                随着人工智能技术的快速发展，{renderContent("大语言模型")}
                技术在自然语言处理领域取得了显著突破。研究人员通过创新的
                {renderContent("Transformer架构")}
                设计，实现了对文本、图像和音频的{renderContent("多模态理解")}
                能力。同时，{renderContent("量子计算")}
                技术的进步为AI模型的优化提供了新的可能。
              </View>
            </View>

            <View>
              <View className="text-xl font-bold mb-4">技术创新</View>
              <View className="text-gray-800 leading-relaxed">
                研究团队采用改进的{renderContent("注意力机制")}，结合
                {renderContent("深度学习")}和{renderContent("强化学习")}
                方法，显著提升了模型的性能。在{renderContent("量子比特")}
                的支持下，模型的计算效率得到了数量级的提升。特别是在处理复杂的多模态任务时，
                {renderContent("神经网络")}的优化变得更加高效。
              </View>
            </View>

            <View>
              <View className="text-xl font-bold mb-4">应用前景</View>
              <View className="text-gray-800 leading-relaxed">
                这项技术在多个领域展现出巨大潜力。在生物科学领域，结合
                {renderContent("CRISPR")}技术的{renderContent("基因编辑")}
                研究取得重要进展。在信息安全方面，{renderContent("量子密码")}和
                {renderContent("区块链技术")}
                的结合提供了更安全的数据保护方案。在云计算领域，
                {renderContent("分布式系统")}和{renderContent("微服务架构")}
                的优化也取得显著成效。
              </View>
            </View>
          </View> */}

          <View className="space-y-6 mb-8">{convertText(article?.content)}</View>
          <View>
            {/* <towxml nodes={dataTowxml} /> */}
          </View>

          <View
            className="border-slide border-gray-400 pt-6 mb-8"
            style={{ borderTop: "1px solid #e5e7eb" }}
          >
            <Text className="text-lg font-medium mb-4">参考文献</Text>
            <View className="space-y-4">
              {article?.references.map((ref, index) => (
                <View key={index} className="text-sm">
                  <Text className="font-medium mb-1">{ref.title}</Text>
                  <Text className="text-gray-600">
                    {ref.authors.join(", ")} ({ref.year})
                  </Text>
                  <Text className="text-gray-600">{ref.journal}</Text>
                  {ref.doi && (
                    <Text
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 mt-1"
                      onClick={() =>
                        Taro.setClipboardData({
                          data: `https://doi.org/${ref.doi}`,
                          success: () => {
                            Taro.getClipboardData({
                              success: function (res) {
                                Taro.showToast({
                                  title: "DOI已复制",
                                  icon: "success",
                                });
                              },
                            });
                          },
                        })
                      }
                    >
                      DOI: {ref.doi}
                      <AtIcon
                        value="external-link"
                        size="12"
                        className="ml-1"
                      />
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>
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
