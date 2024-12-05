import { useState } from "react";
import { View, Text } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { cn } from "@/lib/utils";
import { Toast } from "@/components/ui/Toast";
import { useUserStore } from "@/store/user";
import "taro-ui/dist/style/components/icon.scss";

export function ResearchTermTag({ term, directionId }) {
  const [isHovered, setIsHovered] = useState(false);
  const { directions, setDirections } = useUserStore();
  const isAdded = directions.includes(directionId);

  const handleClick = () => {
    if (isAdded) {
      Toast.show({
        type: "info",
        message: "该研究方向已在关注列表中",
      });
      return;
    }

    if (directions.length >= 5) {
      Toast.show({
        type: "error",
        message: "最多只能关注5个研究方向",
      });
      return;
    }

    setDirections([...directions, directionId]);
    Toast.show({
      type: "success",
      message: "已添加到关注的研究方向",
    });
  };

  return (
    <View
      onClick={handleClick}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      className={cn(
        "inline-flex items-center gap-1 px-1 py-0.5 rounded",
        "text-blue-600 bg-blue-50 hover:bg-blue-100",
        "transition-colors group"
      )}
    >
      <Text>{term}</Text>
      {isHovered && !isAdded && (
        // <AtIcon
        //   value="add"
        //   size="12"
        //   color="#2563eb"
        //   className="animate-in fade-in zoom-in"
        // />
        <View className='at-icon at-icon-add text-12 text-[#2563eb] animate-in fade-in zoom-in' ></View>
      )}
      {/* {isAdded && <AtIcon value="check" size="10" color="#2563eb" />} */}
      {isAdded && <View className='at-icon at-icon-check text-10 text-[#2563eb]' ></View> }
    </View>
  );
}
