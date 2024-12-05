import { View, Text } from "@tarojs/components";
import { cn } from "@/lib/utils";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled,
  onClick,
}) {
  return (
    <View
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors box-border",
        {
          "bg-blue-600 text-white hover:bg-blue-700": variant === "primary",
          "bg-gray-100 text-gray-900 hover:bg-gray-200":
            variant === "secondary",
          "border border-gray-300 bg-white hover:bg-gray-50":
            variant === "outline",
          "h-8 px-3 text-sm": size === "sm",
          "h-10 px-4 text-base": size === "md",
          "h-12 px-6 text-lg": size === "lg",
          "opacity-50": disabled,
        },
        className
      )}
      onClick={disabled ? undefined : onClick}
    >
      <Text>{children}</Text>
    </View>
  );
}
