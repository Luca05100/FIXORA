import * as React from "react";
import { Loader2 } from "lucide-react";

export interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  className?: string;
}

export const LoadingSpinner = ({ size = 24, className = "", ...props }: LoadingSpinnerProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`} {...props}>
      <Loader2 className="animate-spin text-blue-800" size={size} />
      <span className="sr-only">Se încarcă...</span>
    </div>
  );
};

export const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size={48} />
        <p className="text-sm font-medium text-gray-600">Vă rugăm să așteptați...</p>
      </div>
    </div>
  );
};
