import { View, Text } from "@tarojs/components";
import { cn } from "@/lib/utils";

let currentToast = null;

export const Toast = {
  show: ({ type = "info", message, duration = 2000 }) => {
    if (currentToast) {
      clearTimeout(currentToast);
    }

    const toastView = document.createElement("div");
    toastView.className = cn(
      "fixed left-1/2 top-20 -translate-x-1/2 z-50",
      "px-4 py-2 rounded-lg shadow-lg",
      "animate-in fade-in slide-in-from-top-4 duration-200",
      {
        "bg-green-500": type === "success",
        "bg-red-500": type === "error",
        "bg-blue-500": type === "info",
      }
    );

    const textElement = document.createElement("span");
    textElement.className = "text-white text-sm";
    textElement.textContent = message;

    toastView.appendChild(textElement);
    document.body.appendChild(toastView);

    currentToast = window.setTimeout(() => {
      toastView.classList.add("animate-out", "fade-out", "duration-200");
      setTimeout(() => {
        document.body.removeChild(toastView);
      }, 200);
    }, duration);
  },
};
