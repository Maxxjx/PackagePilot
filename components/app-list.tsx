"use client"

import { memo } from "react"
import { AppCard } from "@/components/app-card"
import type { Application } from "@/lib/data"

interface AppListProps {
  apps: Application[]
  selectedApps: Record<string, boolean>
  onToggle: (id: string) => void
}

/**
 * Application list component for displaying a grid of application cards
 */
function AppListComponent({ apps, selectedApps, onToggle }: AppListProps) {
  if (apps.length === 0) {
    return (
      <div className="col-span-full text-center py-8 text-muted-foreground">
        No applications found matching your search criteria
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {apps.map((app) => (
        <AppCard key={app.id} app={app} isSelected={!!selectedApps[app.id]} onToggle={onToggle} />
      ))}
    </div>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const AppList = memo(AppListComponent)

