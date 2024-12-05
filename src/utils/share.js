import { Toast } from '@/components/ui/Toast';

export async function shareContent(data) {
  // 检查是否支持原生分享API
  if (navigator.share && navigator.canShare?.(data)) {
    try {
      await navigator.share(data);
    } catch (error) {
      if (error.name !== 'AbortError') {
        await fallbackShare(data);
      }
    }
  } else {
    await fallbackShare(data);
  }
}

async function fallbackShare(data) {
  try {
    await navigator.clipboard.writeText(
      `${data.title}\n\n${data.text}\n\n阅读原文：${data.url}`
    );
    Toast.show({
      type: 'success',
      message: '链接已复制到剪贴板',
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      message: '分享失败，请稍后重试',
    });
  }
}