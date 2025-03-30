"use client"

import { memo } from "react"
import { Terminal } from "lucide-react"
import type { OperatingSystem } from "@/lib/data"

interface SetupInfoProps {
  os: OperatingSystem
  setupCommand: string
}

/**
 * Setup information component for displaying package manager setup instructions
 */
function SetupInfoComponent({ os, setupCommand }: SetupInfoProps) {
  return (
    <div className="bg-muted/50 rounded-md p-4 border border-orange-600/20">
      <h4 className="flex items-center text-sm font-medium mb-2 text-orange-400">
        <Terminal className="h-4 w-4 mr-2" />
        Package Manager Setup
      </h4>
      <p className="text-sm text-muted-foreground mb-2">
        If you don't have the package manager installed, run this command first:
      </p>
      <div className="bg-background rounded-md p-3 overflow-x-auto border border-orange-600/10">
        <pre className="text-xs font-mono whitespace-pre-wrap break-all">{setupCommand}</pre>
      </div>
    </div>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const SetupInfo = memo(SetupInfoComponent)

