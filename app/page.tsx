"use client"

import { useRef } from "react"
import { Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OSSelector } from "@/components/os-selector"
import { SearchBar } from "@/components/search-bar"
import { CategoryFilter } from "@/components/category-filter"
import { AppList } from "@/components/app-list"
import { CommandDisplay } from "@/components/command-display"
import { SetupInfo } from "@/components/setup-info"
import { useAppInstaller } from "@/hooks/use-app-installer"

/**
 * Main page component for the App Installer Generator
 */
export default function Home() {
  const {
    os,
    setOs,
    selectedApps,
    copied,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    quickInstallClicked,
    categories,
    filteredApps,
    selectedCount,
    setupCommand,
    generateCommand,
    copyToClipboard,
    toggleApp,
    clearSearch,
    handleQuickInstall,
  } = useAppInstaller()

  // Ref for scrolling to command section
  const commandSectionRef = useRef<HTMLDivElement>(null)

  // Scroll to command section when quick install is clicked
  const handleQuickInstallWithScroll = () => {
    handleQuickInstall()

    // Scroll to command section
    setTimeout(() => {
      if (commandSectionRef.current) {
        commandSectionRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  return (
    <div className="min-h-screen bg-background dark flex flex-col">
      <div className="container mx-auto py-8 px-4 flex-1">
        <Card className="mx-auto border-orange-600/20 shadow-lg">
          <CardHeader className="border-b border-orange-600/20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl text-orange-500">App Installer Generator</CardTitle>
                <CardDescription>
                  Select your operating system and applications to generate an installation command
                </CardDescription>
              </div>
              <Button
                onClick={handleQuickInstallWithScroll}
                className="bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                <Zap className="h-4 w-4" />
                Quick Install
                <span className="sr-only">Select recommended applications and generate command</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8">
              {/* OS Selector Component */}
              <OSSelector value={os} onChange={setOs} />

              {/* Application Selection Section */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <h3 className="text-lg font-medium text-orange-400 flex items-center">
                    2. Select applications to install
                    {selectedCount > 0 && (
                      <Badge className="ml-2 bg-orange-600 hover:bg-orange-700">{selectedCount} selected</Badge>
                    )}
                  </h3>

                  {activeCategory === "Recommended" && (
                    <Button
                      onClick={handleQuickInstall}
                      className="bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-1 transition-all duration-200 hover:shadow-md"
                      size="sm"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Select All Recommended
                    </Button>
                  )}
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  {/* Search Bar Component */}
                  <SearchBar value={searchTerm} onChange={setSearchTerm} onClear={clearSearch} />

                  {/* Category Filter Component */}
                  <CategoryFilter
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                  />
                </div>

                {/* App List Component */}
                <AppList apps={filteredApps} selectedApps={selectedApps} onToggle={toggleApp} />
              </div>

              {/* Command Display Component */}
              <CommandDisplay
                ref={commandSectionRef}
                command={generateCommand()}
                copied={copied}
                onCopy={copyToClipboard}
                isHighlighted={quickInstallClicked}
              />

              {/* Setup Info Component */}
              <SetupInfo os={os} setupCommand={setupCommand} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2 border-t border-orange-600/20 bg-muted/30">
            <p className="text-sm text-muted-foreground">
              This tool generates commands for common package managers. Some applications may require additional
              configuration.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

