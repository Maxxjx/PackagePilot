"use client"

import { memo } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CategoryFilterProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

/**
 * Category filter component for filtering applications by category
 */
function CategoryFilterComponent({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className={`${
            activeCategory === category
              ? "bg-orange-600 hover:bg-orange-700 text-white"
              : "border-orange-600/30 hover:bg-orange-600/10 hover:text-orange-500"
          } transition-all duration-200 whitespace-nowrap`}
          aria-pressed={activeCategory === category}
        >
          {category === "Recommended" && <Sparkles className="h-3.5 w-3.5 mr-1" />}
          {category}
        </Button>
      ))}
    </div>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const CategoryFilter = memo(CategoryFilterComponent)

