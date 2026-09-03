import * as React from "react"
import { cn } from "@/lib/utils"

export function Badge({ className, variant = "default", children, ...props }) {
  const variants = {
    default: "bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200",
    secondary: "bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-150",
    outline: "border-zinc-300 text-zinc-600 bg-transparent",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    glow: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-mono font-medium transition-colors select-none",
        variants[variant] || variants.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
