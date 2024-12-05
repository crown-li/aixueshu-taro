import { View, Text } from "@tarojs/components";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

export function AlertDialog({
  open,
  title,
  description,
  confirmText = "确认",
  cancelText = "取消",
  onConfirm,
  onCancel,
  icon,
  confirmButtonProps,
}) {
  if (!open) return null;

  return (
    <>
      <View className="fixed inset-0 bg-black/50 z-50" onClick={onCancel} />
      <View className="fixed left-4 right-4 top-1/2 -translate-y-1/2 bg-white rounded-lg p-6 z-50 max-w-sm mx-auto">
        <View className="flex items-start gap-4">
          {icon && <View>{icon}</View>}
          <View className="flex-1">
            <Text className="text-lg font-semibold mb-2">{title}</Text>
            <Text className="text-gray-600 text-sm mb-6">{description}</Text>
            <View className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={onCancel}>
                {cancelText}
              </Button>
              <Button
                className="flex-1"
                {...confirmButtonProps}
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
