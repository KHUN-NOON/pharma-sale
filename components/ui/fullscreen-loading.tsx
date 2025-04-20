import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function FullscreenLoading({ 
  isLoading,
  text = "Loading...",
  className
}: {
  isLoading: boolean
  text?: string
  className?: string
}) {
  if (!isLoading) return null

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
      className
    )}>
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg font-medium text-foreground">{text}</p>
      </div>
    </div>
  )
}
