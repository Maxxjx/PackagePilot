"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { OperatingSystem } from "@/lib/data"

interface OSSelectorProps {
  value: OperatingSystem
  onChange: (os: OperatingSystem) => void
}

/**
 * OS Selector component for choosing the operating system
 */
export function OSSelector({ value, onChange }: OSSelectorProps) {
  const handleValueChange = (newValue: string) => {
    onChange(newValue as OperatingSystem)
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-3 text-orange-400">1. Select your operating system</h3>
      <Tabs value={value} onValueChange={handleValueChange} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4 bg-background border border-orange-600/30">
          <TabsTrigger
            value="windows"
            className="data-[state=active]:bg-orange-600/20 data-[state=active]:text-orange-500 transition-all duration-200"
          >
            Windows
          </TabsTrigger>
          <TabsTrigger
            value="macos"
            className="data-[state=active]:bg-orange-600/20 data-[state=active]:text-orange-500 transition-all duration-200"
          >
            macOS
          </TabsTrigger>
          <TabsTrigger
            value="linux"
            className="data-[state=active]:bg-orange-600/20 data-[state=active]:text-orange-500 transition-all duration-200"
          >
            Linux
          </TabsTrigger>
        </TabsList>

        <TabsContent value="windows" className="mt-0">
          <div className="text-sm text-muted-foreground mb-4">Uses Chocolatey package manager for Windows</div>
        </TabsContent>
        <TabsContent value="macos" className="mt-0">
          <div className="text-sm text-muted-foreground mb-4">Uses Homebrew package manager for macOS</div>
        </TabsContent>
        <TabsContent value="linux" className="mt-0">
          <div className="text-sm text-muted-foreground mb-4">Uses apt package manager for Debian/Ubuntu Linux</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

