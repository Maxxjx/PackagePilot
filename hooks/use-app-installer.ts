"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { applications, setupCommands } from "@/lib/data"
import type { OperatingSystem } from "@/lib/data"

/**
 * Custom hook for managing the app installer state and logic
 */
export function useAppInstaller() {
  const [os, setOs] = useState<OperatingSystem>("windows")
  const [selectedApps, setSelectedApps] = useState<Record<string, boolean>>({})
  const [copied, setCopied] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [quickInstallClicked, setQuickInstallClicked] = useState(false)

  // Get all categories for the current OS
  const categories = useMemo(() => {
    const osApps = applications[os]
    const uniqueCategories = Array.from(new Set(osApps.map((app) => app.category)))
    return ["All", "Recommended", ...uniqueCategories]
  }, [os])

  // Get recommended apps for the current OS
  const recommendedApps = useMemo(() => {
    return applications[os].filter((app) => app.recommended)
  }, [os])

  // Filter applications based on search term and active category
  const filteredApps = useMemo(() => {
    const searchTermLower = searchTerm.toLowerCase()

    return applications[os].filter((app) => {
      const matchesSearch =
        searchTerm === "" ||
        app.name.toLowerCase().includes(searchTermLower) ||
        app.description.toLowerCase().includes(searchTermLower)

      // Handle the special "Recommended" category
      if (activeCategory === "Recommended") {
        return matchesSearch && app.recommended
      }

      const matchesCategory = activeCategory === "All" || app.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [os, searchTerm, activeCategory])

  // Generate the installation command based on selected OS and applications
  const generateCommand = useCallback(() => {
    const selectedAppIds = Object.entries(selectedApps)
      .filter(([_, isSelected]) => isSelected)
      .map(([id]) => id)

    if (selectedAppIds.length === 0) {
      return "# Please select at least one application"
    }

    const selectedAppCommands = applications[os]
      .filter((app) => selectedAppIds.includes(app.id))
      .map((app) => app.command)

    return selectedAppCommands.join(" && ")
  }, [os, selectedApps])

  // Copy command to clipboard
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(generateCommand())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [generateCommand])

  // Toggle application selection
  const toggleApp = useCallback((appId: string) => {
    setSelectedApps((prev) => ({
      ...prev,
      [appId]: !prev[appId],
    }))
  }, [])

  // Clear search term
  const clearSearch = useCallback(() => {
    setSearchTerm("")
  }, [])

  // Select all recommended apps
  const selectRecommended = useCallback(() => {
    const newSelectedApps = { ...selectedApps }
    recommendedApps.forEach((app) => {
      newSelectedApps[app.id] = true
    })

    setSelectedApps(newSelectedApps)
  }, [recommendedApps, selectedApps])

  // Quick Install - select recommended apps and set animation flag
  const handleQuickInstall = useCallback(() => {
    selectRecommended()
    setQuickInstallClicked(true)

    // Reset the animation trigger after a delay
    setTimeout(() => {
      setQuickInstallClicked(false)
    }, 2000)
  }, [selectRecommended])

  // Count selected apps
  const selectedCount = useMemo(() => Object.values(selectedApps).filter(Boolean).length, [selectedApps])

  // Reset selections when OS changes
  useEffect(() => {
    setSelectedApps({})
    setActiveCategory("All")
    setSearchTerm("")
  }, [os])

  return {
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
    recommendedApps,
    filteredApps,
    selectedCount,
    setupCommand: setupCommands[os],
    generateCommand,
    copyToClipboard,
    toggleApp,
    clearSearch,
    selectRecommended,
    handleQuickInstall,
  }
}

