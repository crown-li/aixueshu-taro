import { useRef, useState, useEffect } from "react";
import { View, Text } from "@tarojs/components";
import { Tabs } from "@/components/ui/Tabs";
import Taro from "@tarojs/taro";
import { SubcategorySection } from "@/components/field/SubcategorySection";
// import { Check } from "lucide-react";
import { AtIcon } from "taro-ui";
import { getAcademicFields,getResearchDirections,getUserSubscriptions } from "@/api/index";
import { cn } from "@/lib/utils";
import { Toast } from "@/components/ui/Toast";


export function FieldSelector({
  academicFields,
  selectedField,
  selectedDirections,
  onFieldChange,
  onDirectionSelect,
  disabled = false,
  maxSelections = 5,
  isFromProfile = false, 
}) {
  const containerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!selectedField) return;
        Toast.showLoading();
        
        // 只保留获取研究方向的逻辑
        const res = await getResearchDirections(selectedField);
        const researchDirections = res.data;
        const _categories = researchDirections.filter(v => v.subjectId === selectedField);
        setCategories(_categories);
        
      } finally {
        Toast.hideLoading();
      }
    };
  
    fetchData();
  }, [selectedField]);

  const getCurrentFieldIndex = () => {
    return academicFields.findIndex((field) => field.id === selectedField);
  };

  const switchField = (direction) => {
    const currentIndex = getCurrentFieldIndex();
    let nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex < 0) {
      nextIndex = academicFields.length - 1;
    } else if (nextIndex >= academicFields.length) {
      nextIndex = 0;
    }

    onFieldChange(academicFields[nextIndex].id);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsScrolling(false);
  };

  const handleTouchMove = (e) => {
    if (!touchStartX.current || !touchStartY.current) return;

    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;

    // Determine if the user is scrolling vertically
    if (!isScrolling) {
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        setIsScrolling(true);
        return;
      }
    }

    // Prevent default only for horizontal swipes
    if (!isScrolling && Math.abs(deltaX) > 10) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current || isScrolling) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) >= minSwipeDistance) {
      if (deltaX > 0) {
        switchField("prev");
      } else {
        switchField("next");
      }
    }

    touchStartX.current = 0;
    touchStartY.current = 0;
  };

  // Handle scroll-based field switching
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollY = container.scrollTop;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = container.scrollTop;
          const isScrollingUp = currentScrollY < lastScrollY;

          // Switch field when scrolling at the edges
          if (currentScrollY === 0 && isScrollingUp) {
            switchField("prev");
          } else if (
            currentScrollY + container.clientHeight >=
              container.scrollHeight - 10 &&
            !isScrollingUp
          ) {
            switchField("next");
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [selectedField]);

  return (
    <View
      className="flex flex-col h-[calc(100vh-13rem)]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Tabs
        tabs={academicFields.map((field) => ({
          id: field.id,
          label: field.name,
        }))}
        selectedTab={selectedField}
        onChange={onFieldChange}
        className="mb-6"
      />

      <View
        ref={containerRef}
        className="flex-1 overflow-y-auto space-y-2 overscroll-contain"
      >
        {categories.map((category) => (
          <SubcategorySection
            key={category.id}
            title={category.name}
            isHot={category.isHot}
          >
            {category.children.map((direction) => (
              <View
                    key={direction.id}
                    onClick={() => onDirectionSelect(direction.id)}
                    disabled={
                        disabled ||
                        (!selectedDirections.includes(direction.id) &&
                            selectedDirections.length >= maxSelections)
                    }
                    className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs",
                        "transition-colors rounded-3xl ",
                        selectedDirections.includes(direction.id)
                            ? "bg-blue-50 text-blue-600 border-blue-200"
                            : disabled || selectedDirections.length >= maxSelections
                                ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                                : "bg-white hover:bg-gray-50 text-gray-600 border-gray-200"
                    )}
                    style={{ border: '1px solid #e5e7eb' }}
              >
                <Text>{direction.name}</Text>
                {direction.isHot &&
                  !selectedDirections.includes(direction.id) && (
                    <View className="inline-block w-1 h-1 bg-orange-500 rounded-3xl" />
                  )}
                {selectedDirections.includes(direction.id) && (
                  //   <Check className="w-3 h-3" />
                  <View className="at-icon at-icon-check w-3 h-3"></View>
                )}
              </View>
            ))}
          </SubcategorySection>
        ))}
      </View>
    </View>
  );
}
