import * as React from "react";

type Variant = "default" | "outline" | "secondary";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

export function Badge({ variant = "default", className = "", ...props }: BadgeProps) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";

  const variants: Record<Variant, string> = {
    default: "bg-blue-600 text-white",
    outline: "border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300",
    secondary: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200",
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}