import { useState,useEffect } from 'react';
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtButton, AtIcon } from "taro-ui";
import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/Header';
import { getMockHistorys } from '@/api/index'
import { formatDistanceToNow } from '@/utils/date';

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(()=>{
    const fetchMockArticles = async () => {
      try {
        const res = await getMockHistorys();
        const mockHistory = res.data
        setHistory(mockHistory)
      } catch (error) {
        console.log(error);
      }
    }
    fetchMockArticles()
  },[])
  

  const handleClearHistory = () => {
    Taro.showModal({
      title: '确认清空',
      content: '确定要清空阅读历史吗？',
      success: (res) => {
        if (res.confirm) {
          setHistory([]);
          Taro.showToast({
            title: '已清空阅读历史',
            icon: 'success',
            duration: 2000
          });
        }
      }
    });
  };

  const handleArticleClick = (id) => {
    Taro.navigateTo({
      url: `/pages/article/index?id=${id}`
    });
  };

  if (history.length === 0) {
    return (
      <View className="bg-gray-50 min-h-screen">
        <Header title="阅读历史" />
        <Container className="pt-[calc(3.5rem+env(safe-area-inset-top))] pb-[calc(4rem+env(safe-area-inset-bottom))]">
          <View className="flex flex-col items-center justify-center h-[60vh]">
            <AtIcon value="clock" size="48" color="#ccc" />
            <Text className="text-gray-500 mb-4">暂无阅读历史</Text>
            <AtButton
              type="primary"
              size="small"
              onClick={() => Taro.switchTab({ url: '/pages/home/index' })}
            >
              去浏览文章
            </AtButton>
          </View>
        </Container>
      </View>
    );
  }

  return (
    <View className="bg-gray-50 min-h-screen">
      <Header 
        title="阅读历史"
        rightElement={
          <AtButton
            size="small"
            onClick={handleClearHistory}
            className="text-red-600 border-red-600"
          >
            <View className="flex items-center">
              <AtIcon value="trash" size="16" color="#dc2626" />
              <Text className="ml-1">清空3</Text>
            </View>
          </AtButton>
        }
      />
      <Container className="mt-4 pt-[calc(3.5rem+env(safe-area-inset-top))] pb-[calc(4rem+env(safe-area-inset-bottom))]">
        <View className="space-y-4">
          {history.map((item) => (
            <View
              key={item.id}
              className="bg-white rounded-lg shadow-sm p-4 space-y-3"
              onClick={() => handleArticleClick(item.id)}
            >
              <Text className="text-lg font-medium line-clamp-2">
                {item.title}
              </Text>
              
              <View className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <View
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${item.progress}%` }}
                />
              </View>
              
              <View className="flex items-center justify-between text-sm text-gray-500">
                <Text>阅读进度 {Math.round(item.progress)}%</Text>
                <Text>{formatDistanceToNow(new Date(item.readAt))}</Text>
              </View>
            </View>
          ))}
        </View>
      </Container>
    </View>
  );
}