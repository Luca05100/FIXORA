import * as React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-800 disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-blue-800 text-white shadow hover:bg-blue-800/90",
      secondary: "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-100/80",
      outline: "border border-gray-200 bg-white shadow-sm hover:bg-gray-100 hover:text-gray-900",
      ghost: "hover:bg-gray-100 hover:text-gray-900",
      danger: "bg-red-600 text-white shadow-sm hover:bg-red-600/90",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-9 px-4 py-2",
      lg: "h-10 px-8",
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
    
    const content = (
      <>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </>
    );

    if (asChild && React.isValidElement(children)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const childElement = children as React.ReactElement<any>;
      return React.cloneElement(childElement, {
        className: `${classes} ${childElement.props.className || ""}`,
        ref,
        disabled: disabled || loading,
        ...props,
        children: loading ? content : childElement.props.children,
      });
    }

    return (
      <button
        className={classes}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </button>
    );
  }
);
Button.displayName = "Button";
