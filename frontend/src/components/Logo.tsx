import { UtensilsCrossed } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "default" | "light"
  showText?: boolean
}

export const Logo = ({
  className,
  variant = "default",
  showText = true,
}: LogoProps) => {
  const isLight = variant === "light"

  return (
    <div className={cn("flex items-center gap-2 select-none", className)}>
      {/* Icon */}
      <div
        className={cn(
          "relative flex items-center justify-center w-10 h-10 rounded-xl",
          isLight ? "bg-primary-foreground/10" : "bg-primary"
        )}
      >
        <UtensilsCrossed
          className={cn(
            "w-5 h-5",
            isLight ? "text-primary-foreground" : "text-primary-foreground"
          )}
        />

        {/* Accent dot */}
        <span
          className={cn(
            "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2",
            isLight
              ? "bg-accent border-secondary"
              : "bg-accent border-background"
          )}
        />
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span
            className={cn(
              "font-display font-bold text-lg tracking-tight",
              isLight ? "text-primary-foreground" : "text-foreground"
            )}
          >
            SRM FoodZone
          </span>
          <span
            className={cn(
              "text-[10px] font-medium uppercase tracking-widest",
              isLight
                ? "text-primary-foreground/70"
                : "text-muted-foreground"
            )}
          >
            KTR Campus
          </span>
        </div>
      )}
    </div>
  )
}
