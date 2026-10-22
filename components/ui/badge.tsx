import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-900 text-white border border-black",
        secondary:
          "bg-zinc-100 text-zinc-800 border border-zinc-200",
        success:
          "bg-emerald-50 text-emerald-800 border border-emerald-200/80",
        warning:
          "bg-amber-50 text-amber-800 border border-amber-200/80",
        destructive:
          "bg-rose-50 text-rose-800 border border-rose-200/80",
        info:
          "bg-zinc-100 text-zinc-800 border border-zinc-200",
        purple:
          "bg-zinc-100 text-zinc-900 border border-zinc-300",
        outline:
          "border border-zinc-300 text-zinc-900 bg-white",
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
