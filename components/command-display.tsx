"use client"

import { memo, forwardRef } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CommandDisplayProps {
  command: string
  copied: boolean
  onCopy: () => void
  isHighlighted: boolean
}

/**
 * Command display component for showing and copying installation commands
 */
const CommandDisplayComponent = forwardRef<HTMLDivElement, CommandDisplayProps>(function CommandDisplayComponent(
  { command, copied, onCopy, isHighlighted },
  ref,
) {
  return (
    <div ref={ref}>
      <h3 className="text-lg font-medium mb-3 text-orange-400">3. Installation command</h3>
      <div className={`relative ${isHighlighted ? "animate-pulse border-orange-500" : ""}`}>
        <div className="bg-muted rounded-md p-4 overflow-x-auto border border-orange-600/20">
          <pre className="text-sm font-mono whitespace-pre-wrap break-all">{command}</pre>
        </div>
        <TooltipProvider>
          <Tooltip open={copied}>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="absolute top-2 right-2 bg-orange-600 hover:bg-orange-700 text-white transition-all duration-200 hover:shadow-md"
                onClick={onCopy}
                aria-label="Copy to clipboard"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy to clipboard</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-orange-600 text-white">
              <p>Copied!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
})

// Memoize the component to prevent unnecessary re-renders
export const CommandDisplay = memo(CommandDisplayComponent)

