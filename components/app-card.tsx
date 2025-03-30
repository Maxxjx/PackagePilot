"use client"

import { memo } from "react"
import { Sparkles } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import type { Application } from "@/lib/data"

interface AppCardProps {
  app: Application
  isSelected: boolean
  onToggle: (id: string) => void
}

/**
 * Application card component for displaying application information
 */
function AppCardComponent({ app, isSelected, onToggle }: AppCardProps) {
  const AppIcon = app.icon

  return (
    <div
      className={`flex items-start space-x-3 border rounded-md p-4 transition-all duration-200 cursor-pointer ${
        isSelected
          ? "border-orange-500 bg-orange-600/10"
          : "border-orange-600/20 hover:bg-muted/50 hover:border-orange-600/40"
      }`}
      onClick={() => onToggle(app.id)}
      role="checkbox"
      tabIndex={0}
      aria-checked={isSelected}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onToggle(app.id)
        }
      }}
    >
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          isSelected ? "bg-orange-600 text-white" : "bg-muted text-muted-foreground"
        } transition-colors duration-200`}
      >
        <AppIcon className="h-5 w-5" />
      </div>
      <div className="grid gap-1 flex-1">
        <div className="flex items-center justify-between">
          <Label
            htmlFor={app.id}
            className={`font-medium cursor-pointer ${
              isSelected ? "text-orange-500" : ""
            } transition-colors duration-200`}
            onClick={(e) => e.preventDefault()}
          >
            {app.name}
          </Label>
          <div className="flex items-center">
            {app.recommended && (
              <Badge variant="outline" className="mr-2 border-orange-500 text-orange-500 text-[10px] py-0">
                <Sparkles className="h-3 w-3 mr-0.5" />
                <span className="sr-only">Recommended</span>
              </Badge>
            )}
            <Checkbox
              id={app.id}
              checked={isSelected}
              onCheckedChange={() => onToggle(app.id)}
              onClick={(e) => e.stopPropagation()}
              className="border-orange-600/50 data-[state=checked]:bg-orange-600 data-[state=checked]:text-white transition-all duration-200"
            />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{app.description}</p>
        <Badge variant="outline" className="w-fit text-xs mt-1 border-orange-600/30">
          {app.category}
        </Badge>
      </div>
    </div>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const AppCard = memo(AppCardComponent)

