import { View, Text } from "@tarojs/components";
import { useState } from "react";
import Taro from "@tarojs/taro";
import { AtSearchBar, AtTag } from "taro-ui";
import { ArticleList } from "@/components/article/ArticleList";
import { mockArticles } from "@/data/mock-articles";
import "./index.scss";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState(mockArticles);

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBack = () => {
    Taro.navigateBack();
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleTagClick = (keyword) => {
    setSearchQuery(keyword);
  };

  const hotKeywords = ["深度学习", "量子计算", "基因编辑", "人工智能"];

  return (
    <View className="search-container">
      <View className="search-header">
        <View className="search-bar-wrapper">
          <AtSearchBar
            value={searchQuery}
            onChange={handleSearch}
            placeholder="搜索感兴趣的研究方向..."
            focus
          />
        </View>
      </View>

      <View className="search-content">
        {searchQuery ? (
          filteredArticles.length > 0 ? (
            <ArticleList articles={filteredArticles} />
          ) : (
            <View className="empty-result">
              <Text>未找到相关内容</Text>
            </View>
          )
        ) : (
          <View className="hot-search">
            <Text className="section-title">热门搜索</Text>
            <View className="tag-list">
              {hotKeywords.map((keyword) => (
                <AtTag
                  key={keyword}
                  name={keyword}
                  onClick={() => handleTagClick(keyword)}
                  customStyle={{
                    marginRight: "12px",
                    marginBottom: "12px",
                  }}
                >
                  {keyword}
                </AtTag>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
