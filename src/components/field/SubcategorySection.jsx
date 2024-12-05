import { cn } from "@/lib/utils";
// import { Flame } from 'lucide-react';
import { View, Text } from "@tarojs/components";

export function SubcategorySection({ title, isHot, children }) {
  return (
    <view className="mb-4">
      <view className="flex items-center gap-1.5 mb-2">
        <text className="text-xs font-normal text-gray-400">{title}</text>
        {isHot && (
          <text className="inline-flex items-center text-[10px] text-orange-400">
            {/* <Flame className="w-2.5 h-2.5 mr-0.5" /> */}
            热门
          </text>
        )}
      </view>
      <view className="flex flex-wrap gap-1.5 mb-4">{children}</view>
    </view>
  );
}
