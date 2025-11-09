interface LoaderProps {
  size?: "sm" | "md" | "lg"
  fullScreen?: boolean
  text?: string
}

export function Loader({ size = "md", fullScreen = false, text }: LoaderProps) {
  const sizeClasses = {
    sm: "w-8 h-8 border-2",
    md: "w-12 h-12 border-4",
    lg: "w-16 h-16 border-4",
  }

  const loader = (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Simple spinning circle */}
      <div
        className={`${sizeClasses[size]} rounded-full border-primary/20 border-t-primary animate-spin`}
      />
      {text && <p className="text-sm text-muted-foreground animate-pulse">{text}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        {loader}
      </div>
    )
  }

  return loader
}
