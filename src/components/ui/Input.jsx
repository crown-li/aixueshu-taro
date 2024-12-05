import { Input as TaroInput } from "@tarojs/components";
import { cn } from "@/lib/utils";

export function Input({
  className,
  error,
  type = "text",
  value,
  placeholder,
  onChange,
}) {
  return (
    <TaroInput
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3",
        "text-sm placeholder:text-gray-500",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
        "disabled:cursor-not-allowed disabled:opacity-50",
        error && "border-red-500 focus:ring-red-500",
        className
      )}
      type={type}
      value={value}
      placeholder={placeholder}
      onInput={(e) => onChange?.(e.detail.value)}
    />
  );
}
