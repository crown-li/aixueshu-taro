import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState,useEffect } from "react";
import { useUserStore } from "@/store/user";
import { Card } from "@/components/ui/Card";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
// import { Check } from "@/components/icons";
import { AtIcon } from "taro-ui";
import { getAcademicFields } from "@/api/index";
import { cn } from "@/lib/utils";
import "./index.scss";

export default function Fields() {
  const [selectedField, setSelectedField] = useState("");
  const setFields = useUserStore((state) => state.setFields);

  const [academicFields, setAcademicFields] = useState([]);
  
  // 添加数据获取effect
  useEffect(() => {
    const fetchAcademicFields = async () => {
      try {
        const response = await getAcademicFields();
        setAcademicFields(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAcademicFields();
  }, []);

  const handleFieldSelect = (fieldId) => {
    setSelectedField(fieldId === selectedField ? "" : fieldId);
  };

  const handleNext = () => {
    if (selectedField) {
      setFields([selectedField]);
      Taro.navigateTo({
        url: "/pages/onboarding/directions/index",
      });
    }
  };

  const renderSubFields = (subFields) => {
    return subFields.map((field) => field.name).join(" · ");
  };

  const renderField = (field) => {
    return (
      <Card
        selected={selectedField === field.id}
        onClick={() => handleFieldSelect(field.id)}
        className={cn(
          "relative mb-3 transition-all duration-200",
          selectedField === field.id && "ring-2 ring-blue-600"
        )}
      >
        <View className="flex items-start gap-3">
          <View className="flex-1">
            <Text className="font-medium mb-1">{field.name}</Text>
            {field.subFields && (
              <View className="space-y-1">
                {field.subFields.map((subField) => (
                  <View key={subField.id} className="text-sm text-gray-500">
                    <Text>{subField.name}</Text>
                    {subField.subFields && (
                      <Text className="text-gray-400 text-xs ml-2">
                        {renderSubFields(subField.subFields)}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
          <View
            className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
              selectedField === field.id
                ? "bg-blue-600 border-blue-600"
                : "border-gray-300"
            )}
          >
            <View
              className={cn(
                "at-icon at-icon-check w-3 h-3 text-white transition-opacity",
                selectedField === field.id ? "opacity-100" : "opacity-0"
              )}
            ></View>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View className="fields-container">
      <Header title="选择学术领域" showBack={false} />

      <Container className="pt-[calc(3.5rem+env(safe-area-inset-top))] pb-8">
        <Progress steps={3} currentStep={1} className="mb-8" />

        <View className="mb-6">
          <Text className="text-xl font-semibold mb-2">
            选择您的主要研究领域
          </Text>
          <Text className="text-gray-500">
            请选择一个最主要的研究领域，我们将为您推荐相关研究方向
          </Text>
        </View>

        <View className="fields-list divide-y divide-gray-100">
          {academicFields.map((field) => (
            <View key={field.id} className="py-4 first:pt-0 last:pb-0">
              {renderField(field)}
            </View>
          ))}
        </View>

        <Button
          className="w-full"
          size="lg"
          onClick={handleNext}
          disabled={!selectedField}
        >
          下一步
        </Button>
      </Container>
    </View>
  );
}
