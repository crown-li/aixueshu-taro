import { useEffect } from "react";
import Taro from "@tarojs/taro";
import { useUserStore } from "@/store/user";

export default function Index() {
  const isFirstVisit = useUserStore((state) => state.isFirstVisit);

  useEffect(() => {
    if (isFirstVisit) {
      Taro.redirectTo({
        url: "/pages/onboarding/welcome/index",
      });
    } else {
      Taro.switchTab({
        url: "/pages/home/index",
      });
    }
  }, [isFirstVisit]);

  return null;
}
