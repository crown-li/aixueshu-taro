import { View } from '@tarojs/components'

export function Loading() {
  return (
    <View className="flex items-center justify-center h-[40px] gap-1">
      <View className="w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin" />
      <View className="text-gray-500 text-[12px]">加载中...</View>
    </View>
  )
}