import { useState, useEffect, useCallback } from 'react';
import Taro, { usePageScroll, getWindowInfo } from '@tarojs/taro';
import { updateArticleDetailReadProgress } from '@/api';
import { throttle } from '@/utils/dt';

export function useReadProgress({ 
    article, 
    target,
  onProgressChange 
}) {
    const initialProgress = article?.readingProgress ? article.readingProgress : 0
    const [readProgress, setReadProgress] = useState(initialProgress);
    const [pageHeight, setPageHeight] = useState(0);

    // 获取页面高度
    useEffect(() => {
        const query = Taro.createSelectorQuery();
        query.select(target).boundingClientRect(rect => {
            if (rect) {
            setPageHeight(rect.height);
        }
        }).exec();
    }, [article]); // 当文章内容变化时重新计算高度
    
    useEffect(() => {
        if (readProgress > initialProgress) {
        updateArticleDetailReadProgress({
            subjectInterpretationId: article.id,
            subjectInterpretationTitle: article?.aggregatedInterpretation?.title,
            readProgress
        });
        }
    }, [readProgress, article, initialProgress]);
    
    const throttledScrollHandler = useCallback(
        throttle((scrollTop) => {
            if (!article || !pageHeight) return;
            
            const { windowHeight } = getWindowInfo();
            const progress = Math.round((scrollTop / (pageHeight - windowHeight)) * 100);
            
            if (progress > readProgress) {
                const newProgress = Math.min(progress, 100);
                setReadProgress(newProgress);
                
                if (onProgressChange) {
                onProgressChange(newProgress);
                }
            }
        }, 800),
        [article,pageHeight,readProgress, onProgressChange]  // 清空依赖数组
    );
    
    const handleScroll = useCallback((scrollTop) => {
        throttledScrollHandler(scrollTop);
    }, [throttledScrollHandler]);

    usePageScroll(({ scrollTop }) => {
        handleScroll(scrollTop)
    });

  return readProgress;
}