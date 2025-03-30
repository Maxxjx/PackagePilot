"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onClear: () => void
}

/**
 * Search bar component for filtering applications
 */
export function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search applications..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8 border-orange-600/30 focus-visible:ring-orange-500 transition-all duration-200"
        aria-label="Search applications"
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1 h-7 w-7 rounded-full p-0 text-muted-foreground transition-all duration-200"
          onClick={onClear}
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </div>
  )
}

