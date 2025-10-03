import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
    titleColor: "text-green-900",
    messageColor: "text-green-700",
  },
  error: {
    icon: AlertCircle,
    bgColor: "bg-red-50 border-red-200",
    iconColor: "text-red-600",
    titleColor: "text-red-900",
    messageColor: "text-red-700",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-yellow-50 border-yellow-200",
    iconColor: "text-yellow-600",
    titleColor: "text-yellow-900",
    messageColor: "text-yellow-700",
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    titleColor: "text-blue-900",
    messageColor: "text-blue-700",
  },
};

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}) => {
  const config = toastConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border shadow-lg min-w-[320px] max-w-[420px]",
        config.bgColor
      )}
    >
      <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", config.iconColor)} />
      
      <div className="flex-1 min-w-0">
        <h3 className={cn("font-semibold text-sm", config.titleColor)}>
          {title}
        </h3>
        {message && (
          <p className={cn("text-sm mt-1", config.messageColor)}>{message}</p>
        )}
      </div>

      <button
        onClick={() => onClose(id)}
        className={cn(
          "flex-shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors",
          config.iconColor
        )}
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export const ToastContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {React.Children.map(children, (child) => (
          <div className="pointer-events-auto">{child}</div>
        ))}
      </AnimatePresence>
    </div>
  );
};

