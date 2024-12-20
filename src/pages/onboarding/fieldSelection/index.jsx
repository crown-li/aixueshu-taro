import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState,useEffect } from "react";
import { useUserStore } from "@/store/user";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { getAcademicFields,saveSubscriptions,getUserSubscriptions } from "@/api/index";
import { FieldSelector } from "@/components/field/FieldSelector";

export default function FieldSelection() {
  const [selectedDirections, setSelectedDirections] = useState({});
  const { setFields, setDirections, setFirstVisit } = useUserStore();

  const [academicFields, setAcademicFields] = useState([]);
  const [selectedField, setSelectedField] = useState('');

  const isFromProfile = Taro?.getCurrentInstance?.()?.router?.params?.referrer === 'profile';
  console.log('isFromProfile:',isFromProfile)


  // 添加数据获取effect
  useEffect(() => {
    const fetchAcademicFields = async () => {
      try {
        const res = await getAcademicFields();
        const data = res.data
        setAcademicFields(data);
        setSelectedField(data[0].id)
      } catch (error) {
        console.log(error);
      }
    };

    fetchAcademicFields();
  }, []);

  // useEffect(() => {
  //   fetchUserSubscriptions();
  // }, [isFromProfile]);

  // const fetchUserSubscriptions = async () => {
  //   if (!isFromProfile) return;
    
  //   try {
  //     const res = await getUserSubscriptions();
  //     const subscriptions = res.data;
      
  //     // 将订阅数据转换为组件所需的格式
  //     const subscriptionMap = {};
  //     subscriptions.forEach(sub => {
  //       subscriptionMap[sub.subjectId] = sub.tagId;
  //     });
      
  //     setSelectedDirections(subscriptionMap);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    const fetchUserSubscriptions = async () => {
      if (!isFromProfile) return;
      
      try {
        const res = await getUserSubscriptions();
        const subscriptions = res.data;
        
        // 将订阅数据转换为组件所需的格式
        const subscriptionMap = {};
        subscriptions.forEach(sub => {
          if (!subscriptionMap[sub.subjectId]) {
            subscriptionMap[sub.subjectId] = [];
          }
          subscriptionMap[sub.subjectId].push(sub.tagId);
        });
        
        setSelectedDirections(subscriptionMap);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchUserSubscriptions();
  }, [isFromProfile]);

  const handleDirectionSelect = (directionId) => {
    setSelectedDirections((prev) => {
      const currentFieldSelections = prev[selectedField] || [];
      
      if (currentFieldSelections.includes(directionId)) {
        // 移除选择
        const newSelections = currentFieldSelections.filter(id => id !== directionId);
        return {
          ...prev,
          [selectedField]: newSelections
        };
      }
      
      // 添加选择（如果未超过限制）
      if (currentFieldSelections.length >= 5) return prev;
      
      return {
        ...prev,
        [selectedField]: [...currentFieldSelections, directionId]
      };
    });
  };

  const handleComplete = async() => {
    // 将数据转换为需要的格式
    const subscriptionData = Object.entries(selectedDirections).map(([subjectId, tagIds]) => ({
      subjectId: subjectId,
      tagId: tagIds
    })).filter(item => item.tagId.length > 0);
    const res = await saveSubscriptions({subscriptions:subscriptionData});
    
    if (res.code === 0) {
      // 保存所有选中的学科和方向
      const allSelectedFields = Object.keys(selectedDirections).filter(
        fieldId => selectedDirections[fieldId].length > 0
      );
      const allSelectedDirections = Object.values(selectedDirections).flat();

      setFields(allSelectedFields);
      setDirections(allSelectedDirections);
      
      if (!isFromProfile) {
        setFirstVisit(false);
      }

      if (isFromProfile) {
        Taro.navigateBack();
      } else {
        Taro.switchTab({
          url: "/pages/home/index",
        });
      }
    }
  };

  return (
    <View>
      <Header title="选择关注方向" />
      <Container className="pt-[calc(env(safe-area-inset-top))] pb-8">
        <View className="mb-6">
          <View className="text-gray-500">
            请选择1-5个具体研究方向，我们将为您推送相关领域的最新进展
          </View>
        </View>

        <FieldSelector
          academicFields={academicFields}
          selectedField={selectedField}
          selectedDirections={selectedDirections[selectedField] || []}
          onFieldChange={setSelectedField}
          onDirectionSelect={handleDirectionSelect}
          maxSelections={5}
          isFromProfile={isFromProfile}
        />

        <View className="mt-8">
          <Button
            className="w-full"
            size="lg"
            onClick={handleComplete}
            disabled={Object.values(selectedDirections).flat().length === 0}
          >
            完成设置
          </Button>
        </View>
      </Container>
    </View>
  );
}
