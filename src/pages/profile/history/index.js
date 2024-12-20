import { useState,useEffect,useCallback  } from 'react';
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtButton, AtIcon } from "taro-ui";
import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/Header';
import { getArticleDetailReadHistoryList } from '@/api/index'
import { formatDistanceToNow } from '@/utils/date';
import { Button } from "@/components/ui/Button";
import { Toast } from '@/components/ui/Toast';
import "taro-ui/dist/style/components/icon.scss";
import { Loading } from "@/components/ui/Loading";
import { throttle } from '@/utils/dt';


export default function History() {
  const [params, setParams] = useState({
    page: 1,
    pageSize:10
  })
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchList = async () => {
    try {
      setLoading(true); // 开始加载
      // Toast.showLoading(); // 显示加载提示
      const res = await getArticleDetailReadHistoryList(params);
      const data = res.data
      const list = data.data
      setHistory(list)
      setTotal(data?.pagination?.total)
    }  finally {
      setLoading(false);
      // Toast.hideLoading(); // 隐藏加载提示
    }
  }

  useEffect(()=>{
    fetchList()
  }, [params])
  
  const handleLoadMore = useCallback(
    throttle((scrollTop) => {
      if (loading || history?.length >= total) return;
      const { windowHeight } = Taro.getWindowInfo();
      const query = Taro.createSelectorQuery();
      query.select('.read-history-container').boundingClientRect(rect => {
        if (rect && scrollTop + windowHeight + 100 >= rect.height) {
          setParams(prev => ({
            ...prev,
            page: prev.page + 1
          }));
        }
      }).exec();
    }, 200), 
    [loading, history?.length, total]
  );

  Taro.usePageScroll(({ scrollTop }) => {
    handleLoadMore(scrollTop);
  });
  

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

  if (!loading && history.length === 0) {
    return (
      <View className="bg-gray-50 min-h-screen">
        <Header title="阅读历史" />
        <Container className="mt-6 pt-[calc(3.5rem+env(safe-area-inset-top))] pb-[calc(4rem+env(safe-area-inset-bottom))]">
          <View className="flex flex-col items-center justify-center h-[60vh]">
            <View className='at-icon at-icon-clock text-4xl text-gray-500 mb-4'></View>
            <View className="text-gray-500 mb-4">暂无阅读历史</View>
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
    <View className="bg-gray-50 min-h-screen read-history-container">
      <Header 
        title="阅读历史"
        // rightElement={
        //   <AtButton
        //     size="small"
        //     onClick={handleClearHistory}
        //     className="text-red-600 border-red-600"
        //   >
        //     <View className="flex items-center">
        //       <AtIcon value="trash" size="16" color="#dc2626" />
        //       <Text className="ml-1">清空3</Text>
        //     </View>
        //   </AtButton>
        // }
      />
      <Container className="mt-4 pt-[calc(3.5rem+env(safe-area-inset-top))] pb-[calc(4rem+env(safe-area-inset-bottom))]">
        <View className="space-y-4">
          {history?.map((item) => (
            <View
              key={item.f_id}
              className="bg-white rounded-lg shadow-sm p-4 space-y-3"
              onClick={() => handleArticleClick(item.f_subject_interpretation_id)}
            >
              <Text className="text-lg font-medium line-clamp-2">
                {item.f_subject_interpretation_title}
              </Text>
              
              <View className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <View
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${item.f_read_progress}%` }}
                />
              </View>
              
              <View className="flex items-center justify-between text-sm text-gray-500">
                <Text>阅读进度 {Math.round(item.f_read_progress)}%</Text>
                <Text>{formatDistanceToNow(new Date(item.f_read_time))}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* 添加底部加载状态 */}
        {loading && (
          <View className="py-4 flex justify-center">
            <Loading />
          </View>
        )}
        
        {!loading && history.length >= total && total > 0 && (
          <View className="py-4 text-center text-gray-500 text-sm">
            没有更多内容了
          </View>
        )}
      </Container>
    </View>
  );
}