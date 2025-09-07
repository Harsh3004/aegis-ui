import { Loader2 } from "lucide-react"

export function LoadingOverlay() {
  return (
    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center z-50">
      <Loader2 className="h-8 w-8 animate-spin text-white" />
    </div>
  )
}
