import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-indigo-50 text-indigo-700 border border-indigo-200/80",
        secondary:
          "bg-slate-100 text-slate-700 border border-slate-200",
        success:
          "bg-emerald-50 text-emerald-700 border border-emerald-200/80",
        warning:
          "bg-amber-50 text-amber-700 border border-amber-200/80",
        destructive:
          "bg-rose-50 text-rose-700 border border-rose-200/80",
        info:
          "bg-sky-50 text-sky-700 border border-sky-200/80",
        purple:
          "bg-purple-50 text-purple-700 border border-purple-200/80",
        outline:
          "border border-slate-200 text-slate-700 bg-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
