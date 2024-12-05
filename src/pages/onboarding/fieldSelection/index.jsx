import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState,useEffect } from "react";
import { useUserStore } from "@/store/user";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { getAcademicFields } from "@/api/index";
import { FieldSelector } from "@/components/field/FieldSelector";

export default function FieldSelection() {
  const [selectedDirections, setSelectedDirections] = useState([]);
  const { setFields, setDirections, setFirstVisit } = useUserStore();

  const [academicFields, setAcademicFields] = useState([]);
  const [selectedField, setSelectedField] = useState('');
  
  // 添加数据获取effect
  useEffect(() => {
    const fetchAcademicFields = async () => {
      try {
        const res = await getAcademicFields();
        const data = res.data
        setAcademicFields(data);
        setSelectedField(data[0].id)
        console.log('ssssssssssss1:',data)
        console.log('ssssssssssss2:',data[0].id)
      } catch (error) {
        console.log(error);
      }
    };

    fetchAcademicFields();
  }, []);

  const handleDirectionSelect = (directionId) => {
    setSelectedDirections((prev) => {
      if (prev.includes(directionId)) {
        return prev.filter((id) => id !== directionId);
      }
      if (prev.length >= 5) {
        return prev;
      }
      return [...prev, directionId];
    });
  };

  const handleComplete = () => {
    setFields([selectedField]);
    setDirections(selectedDirections);
    setFirstVisit(false);

    Taro.switchTab({
      url: "/pages/home/index",
    });
  };

  return (
    <View>
      <Header title="选择关注方向" />
      <Container className="pt-[calc(3.5rem+env(safe-area-inset-top))] pb-8">
        <View className="mb-6">
          <Text className="text-gray-500">
            请选择1-5个具体研究方向，我们将为您推送相关领域的最新进展
          </Text>
        </View>

        <FieldSelector
          selectedField={selectedField}
          selectedDirections={selectedDirections}
          onFieldChange={setSelectedField}
          onDirectionSelect={handleDirectionSelect}
          maxSelections={5}
        />

        <View className="mt-8">
          <Button
            className="w-full"
            size="lg"
            onClick={handleComplete}
            disabled={selectedDirections.length === 0}
          >
            完成设置
          </Button>
        </View>
      </Container>
    </View>
  );
}
