import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-xl font-semibold",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-ring",
    "focus-visible:ring-offset-2",
    "ring-offset-background",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "active:scale-[0.97]",
    "hover:-translate-y-0.5",
    "shadow-sm",
    "[&_svg]:pointer-events-none",
    "[&_svg]:size-4",
    "[&_svg]:shrink-0",
    "select-none"
  ),
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40",

        success:
          "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50",

        danger:
          "bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50",

        destructive:
          "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30 hover:brightness-110",

        secondary:
          "bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700",

        outline:
          "border border-white/10 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 hover:border-white/20",

        glass:
          "border border-white/10 bg-white/10 backdrop-blur-xl text-white hover:bg-white/15 hover:border-white/20",

        ghost:
          "text-foreground hover:bg-accent/70 hover:text-accent-foreground",

        subtle:
          "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",

        premium:
          "bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-black shadow-lg shadow-yellow-500/30 hover:shadow-yellow-400/50",

        link:
          "text-primary underline-offset-4 hover:underline shadow-none bg-transparent",
      },

      size: {
        xs: "h-8 px-3 text-xs",

        sm: "h-9 px-4 text-sm",

        default: "h-11 px-6 text-sm",

        lg: "h-12 px-8 text-base",

        xl: "h-14 px-10 text-lg",

        icon: "h-11 w-11",

        iconSm: "h-9 w-9",

        iconLg: "h-14 w-14",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }